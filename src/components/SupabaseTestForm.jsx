"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@supabase/supabase-js";
import { Send, Bot, User, Clock } from "lucide-react";

export default function SupabaseTestForm() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'll help you schedule a call. Let me collect some information from you.",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    description: "",
    mobile: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15;
    const hour = Math.floor(totalMinutes / 60) + 9;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  });

  const steps = [
    {
      id: "email",
      question: "What's your email address?",
      type: "input",
      inputType: "email",
      placeholder: "your.email@example.com",
    },
    {
      id: "mobile",
      question: "What's your mobile number?",
      type: "input",
      inputType: "tel",
      placeholder: "+1 (555) 000-0000",
    },
    {
      id: "description",
      question: "Please describe what you'd like to discuss.",
      type: "textarea",
      placeholder: "Tell me about your project or inquiry...",
    },
    {
      id: "time",
      question: "What's the best time for us to call you?",
      type: "time",
    },
  ];

  const addMessage = (role, text) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const handleInputSubmit = (value, stepId) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) return;

    addMessage("user", value);
    setFormData((prev) => ({ ...prev, [stepId]: value }));

    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        addMessage("bot", steps[currentStep + 1].question);
      }, 500);
    } else {
      handleSubmit({ ...formData, [stepId]: value });
    }
  };

  const handleTimeSelect = (time) => {
    addMessage("user", time);
    const finalData = { ...formData, time };
    setFormData(finalData);
    setCurrentStep(steps.length); // Move past all steps to hide input
    handleSubmit(finalData);
  };

  const handleSubmit = async (finalData) => {
    setLoading(true);

    setTimeout(() => {
      addMessage(
        "bot",
        `Perfect! I've received your information:

📧 Email: ${finalData.email}
📱 Mobile: ${finalData.mobile}
📝 Description: ${finalData.description}
🕐 Best time to call: ${finalData.time}

${supabase ? 'Attempting to save to Supabase...' : '⚠️ Supabase not configured - check your environment variables!'}`
      );

      if (supabase) {
        supabase
          .from("contact_requests")
          .insert([
            {
              email: finalData.email,
              mobile: finalData.mobile,
              description: finalData.description,
              preferred_time: finalData.time,
            },
          ])
          .then(({ data, error }) => {
            if (error) {
              addMessage("bot", `❌ Error saving to Supabase: ${error.message}`);
            } else {
              addMessage("bot", "✅ Successfully saved to Supabase!");
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }, 1000);
  };

  const renderCurrentInput = () => {
    const step = steps[currentStep];

    if (!step) return null;

    switch (step.type) {
      case "input":
        return (
          <div className="flex gap-2">
            <Input
              type={step.inputType}
              placeholder={step.placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleInputSubmit(e.target.value, step.id);
                  e.target.value = "";
                }
              }}
              className="flex-1"
              autoFocus
            />
            <Button
              size="icon"
              onClick={(e) => {
                const input = e.target.closest("div").querySelector("input");
                handleInputSubmit(input.value, step.id);
                input.value = "";
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        );

      case "textarea":
        return (
          <div className="flex flex-col gap-2">
            <Textarea
              placeholder={step.placeholder}
              rows={4}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleInputSubmit(e.target.value, step.id);
                  e.target.value = "";
                }
              }}
              autoFocus
            />
            <Button
              className="self-end"
              onClick={(e) => {
                const textarea = e.target.closest("div").querySelector("textarea");
                handleInputSubmit(textarea.value, step.id);
                textarea.value = "";
              }}
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        );

      case "time":
        return (
          <div className="w-full">
            <ScrollArea className="h-64 w-full rounded-lg border">
              <div className="grid grid-cols-3 gap-2 p-4">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    onClick={() => handleTimeSelect(time)}
                    className="w-full h-10"
                    type="button"
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    {time}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            Supabase Test Bot
          </CardTitle>
          <p className="text-sm text-white/80">Testing database connection</p>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-96 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "bot"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {message.role === "bot" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`flex-1 p-3 rounded-lg whitespace-pre-line ${
                      message.role === "bot"
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white">
                    <Bot className="h-4 w-4 animate-pulse" />
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {currentStep < steps.length && !loading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                {steps[currentStep].type === "time" && <Clock className="h-4 w-4" />}
                <span>Step {currentStep + 1} of {steps.length}</span>
              </div>
              {renderCurrentInput()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
