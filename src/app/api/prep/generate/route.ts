import { NextRequest, NextResponse } from "next/server";
import { generateStructured } from "@/lib/gemini";
import { PrepResponseSchema } from "@/lib/schemas";
import { buildPrepSystemPrompt, buildPrepUserPrompt } from "@/lib/prompts";
import { JobDetails, PrepResult, InterviewQuestion } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, jobDetails } = body as {
      resumeText?: string;
      jobDetails?: JobDetails;
    };

    if (!resumeText || !jobDetails?.jobRole || !jobDetails?.company) {
      return NextResponse.json(
        { error: "Missing resume text or job details." },
        { status: 400 },
      );
    }

    const parsed = await generateStructured({
      systemInstruction: buildPrepSystemPrompt(),
      input: buildPrepUserPrompt(resumeText, jobDetails),
      schema: PrepResponseSchema,
    });

    const questions: InterviewQuestion[] = parsed.questions.map((q, i) => ({
      id: `q-${i}`,
      ...q,
    }));

    const result: PrepResult = {
      resumeHighlights: parsed.resumeHighlights,
      companyResearch: parsed.companyResearch,
      processSteps: parsed.processSteps,
      questions,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Prep generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate interview prep." },
      { status: 500 },
    );
  }
}
