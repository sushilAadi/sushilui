import { NextResponse } from "next/server";
import { embedResume } from "@/lib/rag-chain";

export async function POST() {
  try {
    const result = await embedResume();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Embed API Error:", error);
    return NextResponse.json(
      { error: "Failed to embed resume. Please try again." },
      { status: 500 }
    );
  }
}
