"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  CheckIcon,
  ChatIcon,
  ClockIcon,
  CodeIcon,
  LayersIcon,
  ShieldIcon,
  TargetIcon,
  TrendingUpIcon,
} from "@/components/icons";
import { useAppState } from "@/context/AppStateContext";
import { FeedbackMetrics } from "@/lib/types";

const METRIC_META: {
  key: keyof FeedbackMetrics;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
}[] = [
  { key: "answerQuality", label: "Answer Quality", icon: TargetIcon, color: "var(--blue)" },
  { key: "technicalKnowledge", label: "Technical Knowledge", icon: CodeIcon, color: "var(--blue)" },
  { key: "communication", label: "Communication", icon: ChatIcon, color: "var(--violet)" },
  { key: "confidence", label: "Confidence", icon: ShieldIcon, color: "var(--violet)" },
  { key: "answerStructure", label: "Answer Structure", icon: LayersIcon, color: "var(--blue)" },
];

export default function FeedbackPage() {
  const router = useRouter();
  const { state, hydrated, setState } = useAppState();

  useEffect(() => {
    if (!hydrated) return;
    if (!state.resumeText) router.replace("/upload");
    else if (!state.jobDetails || !state.prep) router.replace("/job-details");
    else if (!state.feedback) router.replace("/interview");
  }, [hydrated, state.resumeText, state.jobDetails, state.prep, state.feedback, router]);

  function practiceAgain() {
    setState((prev) => ({ ...prev, transcript: [], feedback: null }));
    router.push("/interview");
  }

  if (!state.feedback || !state.jobDetails) return null;

  const { feedback, jobDetails } = state;
  const scoreDeg = Math.max(0, Math.min(360, (feedback.overallScore / 100) * 360));

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute -top-64 left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.15] blur-[70px]"
        style={{ background: "radial-gradient(circle, var(--blue) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex h-[88px] max-w-[1180px] items-center justify-between px-6 md:px-24">
        <Logo />
        <Link href="/dashboard" className="text-sm font-semibold text-text-2">
          ← Back to Dashboard
        </Link>
      </div>

      {/* HERO SCORE */}
      <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col items-center gap-4 px-6 pb-12 pt-6 text-center md:px-24">
        <span className="text-[13px] font-semibold tracking-[0.08em] text-blue">
          INTERVIEW COMPLETE
        </span>
        <h1 className="text-[28px] font-bold md:text-[34px]">
          {jobDetails.jobRole} · {jobDetails.company}
        </h1>

        <div
          className="relative mt-4 flex h-[168px] w-[168px] items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(var(--blue) 0deg, var(--violet) ${scoreDeg}deg, var(--surface-2) ${scoreDeg}deg)`,
          }}
        >
          <div className="flex h-[138px] w-[138px] flex-col items-center justify-center rounded-full bg-bg">
            <div className="font-display text-[44px] font-bold">
              {Math.round(feedback.overallScore)}
            </div>
            <div className="text-[11px] text-text-3">/ 100</div>
          </div>
        </div>
        <div className="font-display text-lg font-semibold text-success">
          {feedback.performanceLabel}
        </div>
      </div>

      {/* METRICS */}
      <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-2 gap-4 px-6 pb-12 md:grid-cols-5 md:px-24">
        {METRIC_META.map(({ key, label, icon: Icon, color }) => {
          const value = Math.round(feedback.metrics[key]);
          return (
            <div
              key={key}
              className="flex flex-col gap-3.5 rounded-[18px] border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <Icon size={18} color={color} />
                <span className="font-display text-lg font-bold">{value}%</span>
              </div>
              <div className="text-[12.5px] font-semibold text-text-2">{label}</div>
              <div className="h-[5px] rounded-full bg-surface-2">
                <div
                  className="grad-bg h-full rounded-full"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* STRENGTHS / IMPROVEMENTS */}
      <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 gap-6 px-6 pb-12 md:grid-cols-2 md:px-24">
        <div className="flex flex-col gap-[18px] rounded-[22px] border border-border bg-surface p-7">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[10px]"
              style={{ background: "oklch(74% 0.14 152 / 0.16)" }}
            >
              <CheckIcon size={18} color="var(--success)" />
            </div>
            <h3 className="text-[17px] font-semibold">Strengths</h3>
          </div>
          <div className="flex flex-col gap-3.5">
            {feedback.strengths.map((s, i) => (
              <div key={i} className="flex gap-2.5 text-sm leading-relaxed text-text-2">
                <CheckIcon
                  size={15}
                  color="var(--success)"
                  className="mt-0.5 flex-shrink-0"
                />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[18px] rounded-[22px] border border-border bg-surface p-7">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[10px]"
              style={{ background: "oklch(78% 0.13 78 / 0.16)" }}
            >
              <TrendingUpIcon size={18} color="var(--warning)" />
            </div>
            <h3 className="text-[17px] font-semibold">Areas for Improvement</h3>
          </div>
          <div className="flex flex-col gap-3.5">
            {feedback.improvements.map((s, i) => (
              <div key={i} className="flex gap-2.5 text-sm leading-relaxed text-text-2">
                <span className="mt-2 h-[5px] w-[5px] flex-shrink-0 rounded-full bg-warning" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECOMMENDED TOPICS */}
      <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col gap-5 px-6 pb-14 md:px-24">
        <h3 className="text-lg font-semibold">Recommended Topics to Practice</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {feedback.recommendedTopics.map((topic, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5"
            >
              <div
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px]"
                style={{
                  background:
                    i % 2 === 0
                      ? "oklch(68% 0.19 258 / 0.14)"
                      : "oklch(68% 0.19 306 / 0.14)",
                }}
              >
                <ClockIcon size={16} color={i % 2 === 0 ? "var(--blue)" : "var(--violet)"} />
              </div>
              <div className="text-sm font-semibold">{topic}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA ROW */}
      <div className="relative z-10 mx-auto flex max-w-[1180px] justify-center gap-4 px-6 pb-16 md:px-24">
        <button
          onClick={practiceAgain}
          className="rounded-2xl border border-border-strong px-7 py-[15px] text-[15px] font-semibold text-text"
        >
          Practice Again
        </button>
        <Link
          href="/dashboard"
          className="glow-blue grad-bg rounded-2xl px-7 py-[15px] text-[15px] font-semibold text-white"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
