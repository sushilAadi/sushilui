import { NextResponse } from "next/server";
import { queryRAG, RateLimitError } from "@/lib/rag-chain";

export async function POST(request) {
  try {
    // Check if API key is configured
    if (!process.env.GOOGLE_API_KEY) {
      console.error("GOOGLE_API_KEY is not set");
      return NextResponse.json(
        { error: "Google API key is not configured. Please add your API key to .env.local" },
        { status: 500 }
      );
    }

    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const result = await queryRAG(message);

    return NextResponse.json({
      answer: result.answer,
      sources: result.sources,
    });
  } catch (error) {
    console.error("Chat API Error:", error.message);

    // Handle rate limit errors
    if (error instanceof RateLimitError || error.name === "RateLimitError") {
      return NextResponse.json(
        {
          error: `Rate limit exceeded. Please wait ${error.retryAfter || 60} seconds before trying again.`,
          retryAfter: error.retryAfter || 60,
          isRateLimit: true,
        },
        { status: 429 }
      );
    }

    // Handle model not found errors
    if (error.message?.includes("404") || error.message?.includes("not found")) {
      return NextResponse.json(
        { error: "The AI model is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    // Handle quota exceeded
    if (error.message?.includes("quota") || error.message?.includes("exceeded")) {
      return NextResponse.json(
        {
          error: "API quota exceeded. Please wait a moment and try again.",
          isRateLimit: true,
          retryAfter: 60,
        },
        { status: 429 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
