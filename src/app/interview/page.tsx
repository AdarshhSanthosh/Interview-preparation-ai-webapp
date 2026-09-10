"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppStateContext";
import { SparkIcon, MicIcon, SendIcon, XIcon } from "@/components/icons";
import { TranscriptMessage } from "@/lib/types";

const TARGET_QUESTIONS = 8;

export default function InterviewPage() {
  const router = useRouter();
  const { state, hydrated, setState } = useAppState();

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [ending, setEnding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const startedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (!state.resumeText) {
      router.replace("/upload");
      return;
    }
    if (!state.jobDetails || !state.prep) {
      router.replace("/job-details");
      return;
    }
    if (!startedRef.current && state.transcript.length === 0) {
      startedRef.current = true;
      sendTurn([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [state.transcript, streamingText, isThinking]);

  async function sendTurn(updatedTranscript: TranscriptMessage[]) {
    if (!state.resumeText || !state.jobDetails) return;
    setError(null);
    setIsThinking(true);
    setStreamingText("");

    try {
      const res = await fetch("/api/interview/turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: state.resumeText,
          jobDetails: state.jobDetails,
          transcript: updatedTranscript,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("The interviewer couldn't respond. Please try again.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      let receivedAny = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
          if (!receivedAny) {
            receivedAny = true;
            setIsThinking(false);
          }
          full += chunk;
          setStreamingText(full);
        }
      }

      setStreamingText("");
      setIsThinking(false);
      setState((prev) => ({
        ...prev,
        transcript: [...updatedTranscript, { role: "interviewer", text: full }],
      }));
    } catch (err) {
      setIsThinking(false);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text || isThinking || streamingText) return;
    const updated: TranscriptMessage[] = [
      ...state.transcript,
      { role: "candidate", text },
    ];
    setState((prev) => ({ ...prev, transcript: updated }));
    setInput("");
    sendTurn(updated);
  }

  async function endInterview() {
    if (!state.resumeText || !state.jobDetails) return;
    setEnding(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: state.resumeText,
          jobDetails: state.jobDetails,
          transcript: state.transcript,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to generate feedback.");
      setState((prev) => ({ ...prev, feedback: data }));
      router.push("/feedback");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setEnding(false);
    }
  }

  if (!state.jobDetails) return null;

  const questionCount = state.transcript.filter(
    (m) => m.role === "interviewer",
  ).length;
  const progress = Math.min(100, (questionCount / TARGET_QUESTIONS) * 100);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="mx-auto flex h-screen max-w-[1200px] flex-col">
      {/* TOP BAR */}
      <div className="flex items-center justify-between border-b border-border px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="grad-bg flex h-8 w-8 items-center justify-center rounded-[9px]">
            <SparkIcon size={16} color="white" />
          </div>
          <span className="font-display text-base font-bold">Live Interview</span>
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: "oklch(66% 0.19 25 / 0.14)" }}
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-danger" />
            <span className="text-[11.5px] font-semibold text-danger">
              {mm}:{ss}
            </span>
          </div>
        </div>
        <button
          onClick={endInterview}
          disabled={ending || state.transcript.length === 0}
          className="flex items-center gap-2 rounded-[10px] border border-border-strong px-[18px] py-2.5 text-[13px] font-semibold text-text-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <XIcon size={14} />
          {ending ? "Wrapping up..." : "End Interview"}
        </button>
      </div>

      {/* CONTEXT */}
      <div className="flex flex-col gap-3 border-b border-border px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-border-strong bg-surface-2">
            <SparkIcon size={17} color="var(--violet)" />
          </div>
          <div>
            <div className="text-[13.5px] font-semibold">
              InterviewIQ AI Interviewer
            </div>
            <div className="text-xs text-text-3">
              Interviewing for: {state.jobDetails.jobRole} @ {state.jobDetails.company}
            </div>
          </div>
          <span className="ml-auto text-xs text-text-3">
            Question {Math.max(1, questionCount)} of ~{TARGET_QUESTIONS}
          </span>
        </div>
        <div className="h-1 w-full rounded-full bg-surface-2">
          <div
            className="grad-bg h-full rounded-full transition-all"
            style={{ width: `${Math.max(6, progress)}%` }}
          />
        </div>
      </div>

      {/* TRANSCRIPT */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
        <div className="flex flex-col gap-5">
          {state.transcript.map((m, i) => (
            <Bubble key={i} role={m.role} text={m.text} />
          ))}

          {streamingText && <Bubble role="interviewer" text={streamingText} />}

          {isThinking && (
            <div className="flex max-w-[640px] gap-3">
              <AiAvatar />
              <div className="flex items-center gap-1.5 rounded-[4px_18px_18px_18px] border border-border bg-surface-2 px-5 py-4">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-text-3" />
                <span
                  className="pulse-dot h-1.5 w-1.5 rounded-full bg-text-3"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="pulse-dot h-1.5 w-1.5 rounded-full bg-text-3"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="px-6 pb-2 text-center text-sm font-medium text-danger md:px-10">
          {error}
        </div>
      )}

      {/* INPUT */}
      <div className="border-t border-border px-6 py-6 md:px-10">
        <div className="flex items-center gap-3 rounded-2xl border border-border-strong bg-surface p-2 pl-5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your answer..."
            disabled={isThinking || !!streamingText}
            className="flex-1 bg-transparent text-[14.5px] outline-none placeholder:text-text-3"
          />
          <button
            type="button"
            disabled
            title="Voice input coming soon"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-2 text-text-2 opacity-50"
          >
            <MicIcon size={18} />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking || !!streamingText}
            className="grad-bg flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl disabled:opacity-40"
          >
            <SendIcon size={17} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AiAvatar() {
  return (
    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-2">
      <SparkIcon size={15} color="var(--violet)" />
    </div>
  );
}

function Bubble({ role, text }: { role: "interviewer" | "candidate"; text: string }) {
  const isCandidate = role === "candidate";
  return (
    <div
      className={`flex max-w-[640px] gap-3 ${
        isCandidate ? "ml-auto flex-row-reverse" : ""
      }`}
    >
      {isCandidate ? (
        <div className="grad-bg flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-display text-[11px] font-bold text-white">
          YOU
        </div>
      ) : (
        <AiAvatar />
      )}
      <div
        className="px-5 py-4 text-[14.5px] leading-relaxed"
        style={
          isCandidate
            ? {
                background: "oklch(68% 0.19 258 / 0.14)",
                border: "1px solid oklch(68% 0.19 258 / 0.3)",
                borderRadius: "18px 4px 18px 18px",
              }
            : {
                background: "oklch(68% 0.19 306 / 0.10)",
                border: "1px solid oklch(68% 0.19 306 / 0.25)",
                borderRadius: "4px 18px 18px 18px",
              }
        }
      >
        {text}
      </div>
    </div>
  );
}
