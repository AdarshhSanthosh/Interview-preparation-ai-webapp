import { NextRequest } from "next/server";
import { genai, MODEL, transcriptToInput } from "@/lib/gemini";
import { buildInterviewerSystemPrompt } from "@/lib/prompts";
import { JobDetails, TranscriptMessage } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { resumeText, jobDetails, transcript } = body as {
    resumeText?: string;
    jobDetails?: JobDetails;
    transcript?: TranscriptMessage[];
  };

  if (!resumeText || !jobDetails?.jobRole || !jobDetails?.company) {
    return new Response("Missing resume text or job details.", { status: 400 });
  }

  const history = transcript ?? [];
  const input =
    history.length > 0
      ? transcriptToInput(history)
      : "Please begin the interview with your first question.";

  const stream = await genai.interactions.create({
    model: MODEL,
    system_instruction: buildInterviewerSystemPrompt(resumeText, jobDetails),
    input,
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.event_type === "step.delta" && event.delta.type === "text") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("Interview stream error:", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
