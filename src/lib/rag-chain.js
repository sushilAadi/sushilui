import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { resumeData } from "./resume-data";
import { getCachedResponse, setCachedResponse } from "./cache";
import { getPrecachedAnswer } from "./precached-answers";

// Custom error class for rate limiting
export class RateLimitError extends Error {
  constructor(retryAfter = 60) {
    super(`Rate limit exceeded. Please try again in ${retryAfter} seconds.`);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

// Helper function to sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Request throttling - track last request time
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // 5 seconds between requests

async function throttleRequest() {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`Throttling: waiting ${waitTime}ms before next request`);
    await sleep(waitTime);
  }

  lastRequestTime = Date.now();
}

// Helper function to retry with exponential backoff
async function retryWithBackoff(fn, maxRetries = 2, initialDelay = 5000) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await throttleRequest();
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if it's a rate limit error (429)
      if (error.message?.includes("429") || error.message?.includes("Too Many Requests") || error.message?.includes("quota") || error.message?.includes("exceeded")) {
        const retryMatch = error.message.match(/retry in (\d+)/i);
        const retryAfter = retryMatch ? parseInt(retryMatch[1]) : 60;

        if (attempt < maxRetries - 1) {
          const delay = Math.max(initialDelay * Math.pow(2, attempt), retryAfter * 1000);
          console.log(`Rate limited. Waiting ${delay / 1000}s before retry ${attempt + 1}/${maxRetries}...`);
          await sleep(delay);
          continue;
        }
        throw new RateLimitError(retryAfter);
      }

      // Check if it's a model not found error (404)
      if (error.message?.includes("404") || error.message?.includes("not found")) {
        throw new Error("Model not available. Please check the model name configuration.");
      }

      // For other errors, retry with backoff
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.log(`Error occurred. Retrying in ${delay / 1000}s...`);
        await sleep(delay);
        continue;
      }

      throw error;
    }
  }

  throw lastError;
}

// Lazy initialization for LLM
let llmInstance = null;
function getLLM() {
  if (!llmInstance) {
    llmInstance = new ChatGoogleGenerativeAI({
      model: "models/gemini-2.0-flash",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.3,
      maxRetries: 0,
    });
  }
  return llmInstance;
}

// Initialize - no longer needs to do anything
export async function embedResume() {
  return { message: "Ready", count: 0 };
}

// Query with 3-tier caching: Pre-cached -> Runtime Cache -> API
export async function queryRAG(question) {
  // 1. Check pre-cached answers first (instant, no API call)
  const precached = getPrecachedAnswer(question);
  if (precached) {
    console.log("Returning pre-cached answer");
    return precached;
  }

  // 2. Check runtime cache (previous API responses)
  const cached = getCachedResponse(question);
  if (cached) {
    console.log("Returning cached response");
    return cached;
  }

  // 3. Make API call only if no cache hit
  console.log("Making API call for:", question);

  const prompt = `You are an AI assistant representing Sushil Sharma, a Front-end Developer.
Answer questions about Sushil based ONLY on the following resume information.
Be professional, formal, and helpful. If the information is not in the resume, politely say you don't have that information.
Always refer to Sushil in third person (he/his).
Keep answers concise (2-3 sentences max) but informative.

Resume:
${resumeData}

Question: ${question}

Provide a clear, professional answer:`;

  const response = await retryWithBackoff(async () => {
    return await getLLM().invoke(prompt);
  });

  const result = {
    answer: response.content,
    sources: ["Resume"],
  };

  // Cache the response for future use
  setCachedResponse(question, result);

  return result;
}
