import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import type { TranscriptMessage } from "./types";

// Resolves the key from the GEMINI_API_KEY env var when apiKey is omitted,
// but we pass it explicitly so a missing key fails fast with a clear error.
export const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemini 2.5 Flash-Lite: free of charge on the standard Gemini API tier,
// with a materially higher free-tier RPM than the flagship Flash models.
// Swap here if you want a different model.
export const MODEL = "gemini-3.5-flash-lite";

export interface GeminiTextContent {
  type: "text";
  text: string;
}

export interface GeminiStep {
  type: "user_input" | "model_output";
  content: GeminiTextContent[];
}

/** Converts our plain transcript into the Interactions API's step shape. */
export function transcriptToInput(transcript: TranscriptMessage[]): GeminiStep[] {
  return transcript.map((m) => ({
    type: m.role === "interviewer" ? "model_output" : "user_input",
    content: [{ type: "text", text: m.text }],
  }));
}

/**
 * Requests a JSON response constrained to a Zod schema and returns the
 * parsed, validated result. Throws if the model returns no output or output
 * that fails schema validation.
 */
export async function generateStructured<T extends z.ZodType>(params: {
  systemInstruction: string;
  input: string;
  schema: T;
}): Promise<z.infer<T>> {
  const response = await genai.interactions.create({
    model: MODEL,
    system_instruction: params.systemInstruction,
    input: params.input,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: z.toJSONSchema(params.schema),
    },
  });

  if (!response.output_text) {
    throw new Error("The model did not return any output.");
  }

  return params.schema.parse(JSON.parse(response.output_text));
}
