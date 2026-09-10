import { NextRequest, NextResponse } from "next/server";
import { generateStructured } from "@/lib/gemini";
import { FeedbackResponseSchema } from "@/lib/schemas";
import {
  buildFeedbackSystemPrompt,
  buildFeedbackUserPrompt,
} from "@/lib/prompts";
import { JobDetails, TranscriptMessage, FeedbackResult } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, jobDetails, transcript } = body as {
      resumeText?: string;
      jobDetails?: JobDetails;
      transcript?: TranscriptMessage[];
    };

    if (!resumeText || !jobDetails?.jobRole || !jobDetails?.company) {
      return NextResponse.json(
        { error: "Missing resume text or job details." },
        { status: 400 },
      );
    }

    if (!transcript || transcript.length === 0) {
      return NextResponse.json(
        { error: "No interview transcript to evaluate." },
        { status: 400 },
      );
    }

    const result: FeedbackResult = await generateStructured({
      systemInstruction: buildFeedbackSystemPrompt(),
      input: buildFeedbackUserPrompt(resumeText, jobDetails, transcript),
      schema: FeedbackResponseSchema,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Feedback generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate feedback." },
      { status: 500 },
    );
  }
}
