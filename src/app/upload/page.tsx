"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ShieldIcon, UploadCloudIcon } from "@/components/icons";
import { useAppState } from "@/context/AppStateContext";

export default function UploadPage() {
  const router = useRouter();
  const { setState } = useAppState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/resume/parse", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to parse resume.");
      }
      setState((prev) => ({
        ...prev,
        resumeText: data.text,
        resumeFileName: data.fileName,
        resumeFileSizeLabel: data.fileSizeLabel,
        prep: null,
        transcript: [],
        feedback: null,
      }));
      router.push("/job-details");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute -top-64 left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[70px]"
        style={{ background: "radial-gradient(circle, var(--blue) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex h-[88px] max-w-[1320px] items-center justify-between px-6 md:px-24">
        <Logo />
        <Link href="/" className="text-sm text-text-3">
          Exit
        </Link>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[920px] flex-col items-center gap-9 px-6 pt-2">
        <div className="flex w-[280px] flex-col items-center gap-2.5">
          <div className="flex w-full gap-2">
            <div className="grad-bg h-1 flex-1 rounded-full" />
            <div className="h-1 flex-1 rounded-full bg-surface-2" />
          </div>
          <span className="text-xs font-semibold tracking-[0.04em] text-text-3">
            STEP 1 OF 2 — UPLOAD RESUME
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-[32px] font-bold md:text-4xl">
            Upload your resume
          </h1>
          <p className="max-w-[520px] text-base text-text-2">
            We&apos;ll analyze your skills, experience and projects to
            personalize your prep.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center gap-4 rounded-3xl border-2 border-dashed p-10 md:p-14 ${
              dragging ? "border-blue bg-surface-2" : "border-border-strong bg-surface"
            }`}
          >
            <div className="glow-blue grad-bg flex h-[72px] w-[72px] items-center justify-center rounded-[20px]">
              <UploadCloudIcon size={32} color="white" />
            </div>
            <div className="font-display text-lg font-semibold">
              {loading ? "Analyzing your resume..." : "Drag & drop your CV here"}
            </div>
            {!loading && (
              <>
                <div className="text-sm text-text-3">or</div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                  className="rounded-xl border border-border-strong px-6 py-3 text-sm font-semibold text-text"
                >
                  Browse files
                </button>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={onInputChange}
            />
            <div className="mt-1 text-xs text-text-3">
              PDF or DOCX, up to 10MB
            </div>
            {error && (
              <div className="mt-1 text-center text-xs font-medium text-danger">
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-7">
            <div className="font-display text-[15px] font-semibold">
              We&apos;ll identify:
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Skills",
                "Work Experience",
                "Projects",
                "Education",
                "Certifications",
                "Technologies",
                "Achievements",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-[12.5px] text-text-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="my-1 h-px bg-border" />
            <div className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-text-3">
              <ShieldIcon size={16} color="var(--text-3)" className="mt-0.5 flex-shrink-0" />
              Your resume stays private — analyzed securely, never shared.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
