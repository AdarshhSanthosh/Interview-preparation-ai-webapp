import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

function formatSize(bytes: number) {
  const kb = Math.max(1, Math.round(bytes / 1024));
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Please upload a file under 10MB." },
        { status: 413 },
      );
    }

    const name = file.name.toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());

    let text = "";
    if (name.endsWith(".pdf")) {
      const parsed = await pdfParse(buffer);
      text = parsed.text;
    } else if (name.endsWith(".docx")) {
      const parsed = await mammoth.extractRawText({ buffer });
      text = parsed.value;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or DOCX." },
        { status: 400 },
      );
    }

    text = text.trim();
    if (!text) {
      return NextResponse.json(
        { error: "Could not extract any text from that file. Try a different file." },
        { status: 422 },
      );
    }

    return NextResponse.json({
      text,
      fileName: file.name,
      fileSizeLabel: formatSize(file.size),
    });
  } catch (err) {
    console.error("Resume parse error:", err);
    return NextResponse.json(
      { error: "Failed to parse the uploaded file." },
      { status: 500 },
    );
  }
}
