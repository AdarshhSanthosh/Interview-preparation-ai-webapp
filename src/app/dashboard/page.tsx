"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  CodeIcon,
  LayersIcon,
  PhoneIcon,
  ShieldIcon,
  SparkIcon,
  TerminalIcon,
  UsersIcon,
} from "@/components/icons";
import { useAppState } from "@/context/AppStateContext";
import {
  EXPERIENCE_LEVELS,
  ExperienceLevel,
  QUESTION_CATEGORIES,
  QuestionCategory,
} from "@/lib/types";

const STEP_ICONS = [PhoneIcon, CodeIcon, TerminalIcon, LayersIcon, UsersIcon];

const CATEGORY_STYLE: Record<QuestionCategory, { bg: string; color: string }> = {
  Technical: { bg: "oklch(68% 0.19 258 / 0.16)", color: "var(--blue)" },
  Behavioral: { bg: "oklch(68% 0.19 306 / 0.16)", color: "var(--violet)" },
  "Resume Based": { bg: "oklch(74% 0.14 152 / 0.16)", color: "var(--success)" },
  "Project Based": { bg: "oklch(68% 0.19 258 / 0.16)", color: "var(--blue)" },
  "Company Based": { bg: "oklch(78% 0.13 78 / 0.18)", color: "var(--warning)" },
  HR: { bg: "oklch(68% 0.19 306 / 0.16)", color: "var(--violet)" },
  "Role Specific": { bg: "var(--surface-2)", color: "var(--text-2)" },
};

const DIFFICULTY_DOT: Record<ExperienceLevel, string> = {
  Beginner: "var(--success)",
  Intermediate: "var(--blue)",
  Expert: "var(--violet)",
};

export default function DashboardPage() {
  const router = useRouter();
  const { state, hydrated, setState } = useAppState();
  const [difficultyFilter, setDifficultyFilter] = useState<ExperienceLevel | null>(
    null,
  );
  const [categoryFilter, setCategoryFilter] = useState<QuestionCategory | null>(
    null,
  );
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!hydrated) return;
    if (!state.resumeText) router.replace("/upload");
    else if (!state.prep || !state.jobDetails) router.replace("/job-details");
  }, [hydrated, state.resumeText, state.prep, state.jobDetails, router]);

  const questions = state.prep?.questions ?? [];
  const filtered = useMemo(
    () =>
      questions.filter(
        (q) =>
          (!difficultyFilter || q.difficulty === difficultyFilter) &&
          (!categoryFilter || q.category === categoryFilter),
      ),
    [questions, difficultyFilter, categoryFilter],
  );

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function startInterview() {
    setState((prev) => ({ ...prev, transcript: [], feedback: null }));
    router.push("/interview");
  }

  if (!state.prep || !state.jobDetails) return null;

  const { jobDetails, prep } = state;

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <div className="flex h-[88px] items-center justify-between border-b border-border px-6 md:px-24">
        <Logo />
        <div className="hidden items-center gap-3 rounded-full border border-border bg-surface py-2 pl-4 pr-2 md:flex">
          <span className="text-[13.5px] font-semibold">{jobDetails.jobRole}</span>
          <span className="text-text-3">·</span>
          <span className="text-[13.5px] text-text-2">{jobDetails.company}</span>
          <span className="text-text-3">·</span>
          <span className="text-[13.5px] text-text-2">{jobDetails.experienceLevel}</span>
          <Link
            href="/job-details"
            className="rounded-full bg-surface-2 px-3 py-1.5 text-[12.5px] font-semibold"
          >
            Edit
          </Link>
        </div>
        <button
          onClick={startInterview}
          className="glow-blue grad-bg flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
        >
          <ChatIcon size={16} color="white" />
          Start Live Interview
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-10 md:px-24 lg:grid-cols-[1.65fr_1fr]">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-8">
          {/* PROCESS TIMELINE */}
          <div className="rounded-3xl border border-border bg-surface p-8">
            <h2 className="mb-7 text-lg font-semibold">
              Expected Interview Process
            </h2>
            <div className="relative flex flex-col gap-8 sm:flex-row sm:justify-between">
              <div className="absolute left-[10%] right-[10%] top-6 hidden h-0.5 bg-border sm:block" />
              {prep.processSteps.map((step, i) => {
                const Icon = STEP_ICONS[i % STEP_ICONS.length];
                return (
                  <div
                    key={step.name}
                    className="relative z-10 flex flex-1 flex-col items-center gap-3"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        i === 0
                          ? "grad-bg"
                          : "border-[1.5px] border-border-strong bg-surface-2"
                      }`}
                    >
                      <Icon size={20} color={i === 0 ? "white" : "var(--text-2)"} />
                    </div>
                    <div className="text-center text-[13px] font-semibold">
                      {step.name}
                    </div>
                    <p className="text-center text-[11.5px] leading-relaxed text-text-3">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QUESTIONS */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Interview Questions</h2>
              <span className="text-[13px] text-text-3">
                {questions.length} personalized questions
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_LEVELS.map((level) => (
                  <FilterChip
                    key={level}
                    active={difficultyFilter === level}
                    onClick={() =>
                      setDifficultyFilter((prev) => (prev === level ? null : level))
                    }
                  >
                    {level}
                  </FilterChip>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterChip active={!categoryFilter} onClick={() => setCategoryFilter(null)}>
                  All
                </FilterChip>
                {QUESTION_CATEGORIES.map((cat) => (
                  <FilterChip
                    key={cat}
                    active={categoryFilter === cat}
                    onClick={() =>
                      setCategoryFilter((prev) => (prev === cat ? null : cat))
                    }
                  >
                    {cat}
                  </FilterChip>
                ))}
              </div>
            </div>

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-text-3">
                No questions match these filters.
              </div>
            )}

            {filtered.map((q) => {
              const isOpen = expanded.has(q.id);
              const style = CATEGORY_STYLE[q.category];
              return (
                <div
                  key={q.id}
                  className={`flex flex-col gap-3.5 rounded-2xl border p-6 ${
                    isOpen ? "border-border-strong" : "border-border"
                  } bg-surface`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {q.category.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-text-3">
                      <span
                        className="h-[7px] w-[7px] rounded-full"
                        style={{ background: DIFFICULTY_DOT[q.difficulty] }}
                      />
                      {q.difficulty}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="text-base font-medium leading-normal">
                      {q.question}
                    </div>
                    {!isOpen && (
                      <button
                        onClick={() => toggleExpand(q.id)}
                        className="flex flex-shrink-0 items-center gap-1.5 rounded-[10px] border border-border-strong px-4 py-2.5 text-[13px] font-semibold"
                      >
                        Show Answer
                        <ChevronDownIcon size={14} />
                      </button>
                    )}
                  </div>

                  {isOpen && (
                    <>
                      <div className="h-px bg-border" />
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2 text-[12.5px] font-semibold text-blue">
                          <SparkIcon size={14} color="var(--blue)" />
                          Personalized based on your resume
                        </div>
                        <p className="text-[14.5px] leading-relaxed text-text-2">
                          {q.answer}
                        </p>
                        <button
                          onClick={() => toggleExpand(q.id)}
                          className="mt-1 self-start text-[13px] font-semibold text-text-3"
                        >
                          Hide answer
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 rounded-3xl border border-border bg-surface p-7">
            <div className="flex items-center gap-3.5">
              <div className="grad-bg flex h-12 w-12 items-center justify-center rounded-2xl font-display text-xl font-bold text-white">
                {jobDetails.company.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-display text-[17px] font-semibold">
                  {jobDetails.company}
                </div>
                <div className="text-[12.5px] text-text-3">
                  Target role: {jobDetails.jobRole}
                </div>
              </div>
            </div>

            <p className="text-[13.5px] leading-relaxed text-text-2">
              {prep.companyResearch.overview}
            </p>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-3">
              <div className="text-[13px] font-semibold">
                Expected Interview Rounds
              </div>
              <div className="flex flex-col gap-2.5">
                {prep.companyResearch.rounds.map((round) => (
                  <div
                    key={round}
                    className="flex items-center gap-2.5 text-[13px] text-text-2"
                  >
                    <CheckIcon size={15} color="var(--success)" />
                    {round}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-3">
              <div className="text-[13px] font-semibold">Common Topics</div>
              <div className="flex flex-wrap gap-2">
                {prep.companyResearch.commonTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-[12.5px] font-semibold text-text-2"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11.5px] leading-relaxed text-text-3">
              <ShieldIcon size={14} color="var(--text-3)" className="mt-0.5 flex-shrink-0" />
              Based on publicly available interview reports — actual process
              may vary.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-3.5 py-[7px] text-[12.5px] font-semibold ${
        active
          ? "grad-bg text-white"
          : "border border-border bg-surface-2 text-text-2"
      }`}
    >
      {children}
    </button>
  );
}
