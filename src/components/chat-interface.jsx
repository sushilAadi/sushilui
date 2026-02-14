"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageBubble } from "@/components/message-bubble";
import { Send, Loader2, Bot, Clock, X, MessageCircle } from "lucide-react";
import { sendContactMessage } from "@/service/contactService";
import posthog from "posthog-js";

const INITIAL_MESSAGE = {
  id: "welcome",
  text: "Hello! I'm an AI assistant for Sushil Sharma. Feel free to ask me anything about his professional experience, skills, projects, or education. How can I help you today?",
  isUser: false,
};

const SUGGESTED_QUESTIONS = [
  "What are Sushil's main skills?",
  "Tell me about his work experience",
  "What projects has he worked on?",
  "What is his educational background?",
];

// Typing speed (ms per character)
const TYPING_SPEED = 15;

// Unique ID generator to avoid duplicate keys
let messageIdCounter = 0;
const generateMessageId = () => `msg-${Date.now()}-${++messageIdCounter}`;

// Contact form flow questions
const CONTACT_QUESTIONS = [
  { field: "name", question: "Great! Let's get you connected with Sushil. What's your name?" },
  { field: "email", question: "Nice to meet you, {name}! What's your email address?" },
  { field: "phone", question: "Got it! What's your phone number?" },
  { field: "best_time_to_call", question: "When's the best time to call you? Select an option or type your preferred time:", options: ["Morning (9-12)", "Afternoon (12-5)", "Evening (5-8)"] },
  { field: "subject", question: "What would you like to discuss with Sushil?" },
  { field: "message", question: "Please share more details about your inquiry:" },
];

export function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [isEmbedding, setIsEmbedding] = useState(false);
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0);
  const scrollRef = useRef(null);
  const typingRef = useRef(null);

  // Contact mode state
  const [isContactMode, setIsContactMode] = useState(false);
  const [contactStep, setContactStep] = useState(0);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    best_time_to_call: "",
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Auto-scroll to bottom when new messages arrive or during typing
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Rate limit countdown timer
  useEffect(() => {
    if (rateLimitCountdown > 0) {
      const timer = setTimeout(() => {
        setRateLimitCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [rateLimitCountdown]);

  // Embed resume on first load
  useEffect(() => {
    const embedResume = async () => {
      setIsEmbedding(true);
      try {
        const response = await fetch("/api/embed", { method: "POST" });
        if (response.ok) {
          setIsEmbedded(true);
        }
      } catch (error) {
        console.error("Failed to embed resume:", error);
      } finally {
        setIsEmbedding(false);
      }
    };

    embedResume();
  }, []);

  // Typing animation function
  const typeMessage = useCallback((fullText, messageId) => {
    let currentIndex = 0;
    setIsTyping(true);

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        const charsToAdd = Math.min(3, fullText.length - currentIndex); // Type 3 chars at a time for speed
        currentIndex += charsToAdd;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, text: fullText.slice(0, currentIndex) }
              : msg
          )
        );

        typingRef.current = setTimeout(typeNextChar, TYPING_SPEED);
      } else {
        setIsTyping(false);
      }
    };

    typeNextChar();
  }, []);

  // Cleanup typing animation on unmount
  useEffect(() => {
    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, []);

  const handleSend = async (messageText) => {
    const text = messageText || input.trim();
    if (!text || isLoading || isTyping || isSubmittingContact || rateLimitCountdown > 0) return;

    // Clear any ongoing typing animation
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    // Check for @contact command
    if (text.toLowerCase() === "@contact") {
      posthog.capture("contact_mode_entered");
      const userMessage = {
        id: generateMessageId(),
        text,
        isUser: true,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      startContactMode();
      return;
    }

    // Check for @chat command
    if (text.toLowerCase() === "@chat") {
      posthog.capture("chat_mode_entered");
      const userMessage = {
        id: generateMessageId(),
        text,
        isUser: true,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      if (isContactMode) {
        exitContactMode();
      } else {
        const alreadyInChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "You're already in chat mode! Ask me anything about Sushil.",
          isUser: false,
        };
        setMessages((prev) => [...prev, alreadyInChatMessage]);
      }
      return;
    }

    // Add user message
    const userMessage = {
      id: generateMessageId(),
      text,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    posthog.capture("message_sent", {
      message: text,
      is_suggested_question: !!messageText,
    });


    // If in contact mode, handle as contact response
    if (isContactMode) {
      await handleContactResponse(text);
      return;
    }

    // Normal chat mode
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessageId = (Date.now() + 1).toString();
        const botMessage = {
          id: botMessageId,
          text: "", // Start empty for typing animation
          isUser: false,
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);

        posthog.capture("bot_message_displayed", {
          message: data.answer,
        });


        // Start typing animation
        typeMessage(data.answer, botMessageId);
      } else {
        // Handle rate limit with countdown
        if (data.isRateLimit && data.retryAfter) {
          setRateLimitCountdown(data.retryAfter);
        }

        posthog.capture("error_message_displayed", {
          error: data.error || "Sorry, I encountered an error. Please try again.",
        });

        const errorMessage = {
          id: (Date.now() + 1).toString(),
          text: data.error || "Sorry, I encountered an error. Please try again.",
          isUser: false,
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
      }
    } catch (error) {
      posthog.capture("error_message_displayed", {
        error: "Sorry, I couldn't connect to the server. Please try again.",
      });
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't connect to the server. Please try again.",
        isUser: false,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Validate contact field
  const validateContactField = (field, value) => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Please enter your name.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return null;
      case "email":
        if (!value.trim()) return "Please enter your email.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address.";
        return null;
      case "phone":
        if (!value.trim()) return "Please enter your phone number.";
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ""))) return "Please enter a valid phone number.";
        return null;
      case "subject":
        if (!value.trim()) return "Please enter a subject.";
        return null;
      case "message":
        if (!value.trim()) return "Please enter your message.";
        if (value.trim().length < 10) return "Message must be at least 10 characters.";
        return null;
      case "best_time_to_call":
        if (!value.trim()) return "Please select an option or type your preferred time.";
        return null;
      default:
        return null;
    }
  };

  // Start contact mode
  const startContactMode = () => {
    setIsContactMode(true);
    setContactStep(0);
    setContactData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      best_time_to_call: "",
    });
    // Add first question
    const firstQuestion = CONTACT_QUESTIONS[0];
    const botMessage = {
      id: generateMessageId(),
      text: firstQuestion.question,
      isUser: false,
      isContactQuestion: true,
      options: firstQuestion.options || null,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  // Exit contact mode
  const exitContactMode = () => {
    setIsContactMode(false);
    setContactStep(0);
    setContactData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      best_time_to_call: "",
    });
    const exitMessage = {
      id: generateMessageId(),
      text: "No problem! You're back in chat mode. Feel free to ask me anything about Sushil.",
      isUser: false,
    };
    setMessages((prev) => [...prev, exitMessage]);
  };

  // Handle contact flow response
  const handleContactResponse = async (responseText) => {
    const currentQuestion = CONTACT_QUESTIONS[contactStep];
    const field = currentQuestion.field;

    // Validate the response
    const error = validateContactField(field, responseText);
    if (error) {
      const errorMessage = {
        id: generateMessageId(),
        text: error,
        isUser: false,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Save the response
    const newContactData = { ...contactData, [field]: responseText.trim() };
    setContactData(newContactData);

    posthog.capture("contact_form_field_filled", {
      field: field,
      value: responseText.trim(),
    });


    // Check if this is the last question
    if (contactStep >= CONTACT_QUESTIONS.length - 1) {
      // Submit the contact form
      setIsSubmittingContact(true);

      const submittingMessage = {
        id: generateMessageId(),
        text: "Sending your message...",
        isUser: false,
      };
      setMessages((prev) => [...prev, submittingMessage]);

      try {
        const result = await sendContactMessage({
          ...newContactData,
          source: "chatbot",
        });

        if (result.success) {
          posthog.capture("contact_form_submitted", {
            ...newContactData,
          });
          const successMessage = {
            id: (Date.now() + 1).toString(),
            text: `Thanks ${newContactData.name}! Your message has been sent successfully. Sushil will get back to you soon at ${newContactData.email}.`,
            isUser: false,
          };
          setMessages((prev) => [...prev, successMessage]);
          // Reset contact state and switch back to chat mode
          setContactStep(0);
          setContactData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            best_time_to_call: "",
          });
          setIsContactMode(false);
        } else {
          const errorMessage = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, there was an error sending your message. Please try again or type @chat to go back.",
            isUser: false,
            isError: true,
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
      } catch (error) {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, there was an error sending your message. Please try again or type @chat to go back.",
          isUser: false,
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsSubmittingContact(false);
      }
    } else {
      // Move to next question
      const nextStep = contactStep + 1;
      setContactStep(nextStep);
      const nextQuestion = CONTACT_QUESTIONS[nextStep];

      // Replace {name} placeholder if present
      let questionText = nextQuestion.question.replace("{name}", newContactData.name);

      const botMessage = {
        id: generateMessageId(),
        text: questionText,
        isUser: false,
        isContactQuestion: true,
        options: nextQuestion.options || null,
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const isDisabled = isLoading || isTyping || isEmbedding || rateLimitCountdown > 0;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" style={{ top: 'auto', left: 'auto', width: 'auto', height: 'auto', bottom: '1rem', right: '1rem' }}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            posthog.capture("chat_window_opened");
          }}
          className="pointer-events-auto w-14 h-14 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-[320px] md:w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden absolute bottom-0 right-0">
          {/* Header */}
          <header className="shrink-0 border-b border-gray-200 bg-white px-4 py-3 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-black text-sm">Sushil Sharma</h1>
                  <p className="text-xs text-gray-500">
                    {isContactMode
                      ? "Contact Mode"
                      : isEmbedding
                      ? "Initializing..."
                      : isTyping
                      ? "Typing..."
                      : "Front-end Developer Assistant"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  posthog.capture("chat_window_closed");
                }}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3" ref={scrollRef} data-lenis-prevent>
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id}>
                  <MessageBubble
                    message={message.text}
                    isUser={message.isUser}
                    isError={message.isError}
                  />
                  {/* Show options for contact questions with options */}
                  {message.options && !message.isUser && (
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                      {message.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSend(option)}
                          disabled={isDisabled || isSubmittingContact}
                          className="px-2.5 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-black rounded-full border border-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {(isLoading || isSubmittingContact) && (
                <div className="flex gap-2 justify-start">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-black flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 py-2 border border-gray-200">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  </div>
                </div>
              )}

              {/* Suggested Questions - show only at start */}
              {messages.length === 1 && !isLoading && !isTyping && (
                <div className="pt-2">
                  <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleSend(question);
                          posthog.capture("suggested_question_clicked", {
                            question: question,
                          });
                        }}
                        disabled={isDisabled}
                        className="px-2.5 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-black rounded-full border border-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rate Limit Banner */}
          {rateLimitCountdown > 0 && (
            <div className="bg-gray-100 border-t border-gray-200 px-3 py-1.5">
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>Rate limited. Wait {rateLimitCountdown}s</span>
              </div>
            </div>
          )}

          {/* Input Area */}
          <footer className="shrink-0 border-t border-gray-200 bg-white p-3 rounded-b-2xl">
            {/* Mode badges */}
            <div className="flex gap-1.5 mb-2">
              <button
                onClick={() => !isContactMode && handleSend("@contact")}
                className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                  isContactMode
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                @contact
              </button>
              <button
                onClick={() => isContactMode && handleSend("@chat")}
                className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                  !isContactMode
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                @chat
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (isContactMode) {
                    const field = CONTACT_QUESTIONS[contactStep].field;
                    posthog.capture("contact_form_field_typing", {
                      field: field,
                      value: e.target.value,
                    });
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder={
                  rateLimitCountdown > 0
                    ? `Wait ${rateLimitCountdown}s...`
                    : isTyping
                    ? "Please wait..."
                    : isContactMode
                    ? "Type your answer..."
                    : "Ask about Sushil..."
                }
                className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 text-sm h-9 outline-none focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isDisabled || isSubmittingContact}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isDisabled || isSubmittingContact}
                className="bg-black hover:bg-gray-800 text-white px-3 h-9 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading || isSubmittingContact ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : rateLimitCountdown > 0 ? (
                  <span className="text-xs">{rateLimitCountdown}</span>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-1.5">
              {isContactMode ? "Type @chat to return to chat mode" : ""}
            </p>
            {!isContactMode && (
              <p className="text-[10px] text-amber-500 text-center mt-0.5">
                Responses are AI-generated and may not always be accurate.
              </p>
            )}
          </footer>
        </div>
      )}
    </div>
  );
}
