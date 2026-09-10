"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CheckIcon, DocumentIcon, SparkIcon } from "@/components/icons";
import { useAppState } from "@/context/AppStateContext";
import { EXPERIENCE_LEVELS, ExperienceLevel } from "@/lib/types";

export default function JobDetailsPage() {
  const router = useRouter();
  const { state, hydrated, setState } = useAppState();

  const [jobRole, setJobRole] = useState("");
  const [company, setCompany] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("Intermediate");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && !state.resumeText) {
      router.replace("/upload");
    }
  }, [hydrated, state.resumeText, router]);

  async function handleSubmit() {
    if (!jobRole.trim() || !company.trim() || !state.resumeText) return;
    setError(null);
    setLoading(true);

    const jobDetails = {
      jobRole: jobRole.trim(),
      company: company.trim(),
      experienceLevel,
      jobDescription: jobDescription.trim() || undefined,
    };

    try {
      const res = await fetch("/api/prep/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: state.resumeText, jobDetails }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to generate prep.");

      setState((prev) => ({
        ...prev,
        jobDetails,
        prep: data,
        transcript: [],
        feedback: null,
      }));
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute -top-64 left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[70px]"
        style={{ background: "radial-gradient(circle, var(--violet) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex h-[88px] max-w-[1320px] items-center justify-between px-6 md:px-24">
        <Logo />
        <Link href="/" className="text-sm text-text-3">
          Exit
        </Link>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center gap-7 px-6 pb-16">
        <div className="flex w-[280px] flex-col items-center gap-2.5">
          <div className="flex w-full gap-2">
            <div className="grad-bg h-1 flex-1 rounded-full" />
            <div className="grad-bg h-1 flex-1 rounded-full" />
          </div>
          <span className="text-xs font-semibold tracking-[0.04em] text-text-3">
            STEP 2 OF 2 — JOB DETAILS
          </span>
        </div>

        {state.resumeFileName && (
          <div className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-surface-2">
                <DocumentIcon size={18} color="var(--blue)" />
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {state.resumeFileName}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-success">
                  <CheckIcon size={12} />
                  Uploaded{state.resumeFileSizeLabel ? ` · ${state.resumeFileSizeLabel}` : ""}
                </div>
              </div>
            </div>
            <Link href="/upload" className="text-[13px] font-semibold">
              Change
            </Link>
          </div>
        )}

        <div className="flex flex-col items-center gap-2.5 text-center">
          <h1 className="text-[32px] font-bold">Tell us about the role</h1>
          <p className="max-w-[480px] text-[15.5px] text-text-2">
            The more details you share, the more personalized your prep will
            be.
          </p>
        </div>

        <div className="flex w-full flex-col gap-5 rounded-3xl border border-border bg-surface p-8">
          <Field label="Job Role / Position">
            <input
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3.5 text-[14.5px] outline-none placeholder:text-text-3"
            />
          </Field>
          <Field label="Company Name">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Stripe, Google, or your target company"
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3.5 text-[14.5px] outline-none placeholder:text-text-3"
            />
          </Field>
          <Field label="Experience Level">
            <div className="flex gap-2.5">
              {EXPERIENCE_LEVELS.map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setExperienceLevel(level)}
                  className={`flex-1 rounded-xl py-3 text-sm font-semibold ${
                    experienceLevel === level
                      ? "grad-bg text-white"
                      : "border border-border bg-surface-2 text-text-2"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </Field>
          <Field label={<>Job Description <span className="font-normal text-text-3">(optional)</span></>}>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
              placeholder="Paste the job description for even more tailored questions..."
              className="w-full resize-none rounded-xl border border-border bg-surface-2 px-4 py-3.5 text-[14.5px] leading-relaxed outline-none placeholder:text-text-3"
            />
          </Field>
        </div>

        {error && (
          <div className="w-full text-center text-sm font-medium text-danger">
            {error}
          </div>
        )}

        <div className="flex w-full items-center justify-between">
          <Link href="/upload" className="text-sm font-semibold text-text-2">
            ← Back to upload
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading || !jobRole.trim() || !company.trim()}
            className="glow-blue grad-bg flex items-center gap-2.5 rounded-2xl px-7 py-4 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SparkIcon size={16} color="white" />
            {loading ? "Generating your prep..." : "Generate My Interview Prep"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-semibold text-text-2">{label}</label>
      {children}
    </div>
  );
}
