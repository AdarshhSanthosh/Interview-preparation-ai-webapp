import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  UploadCloudIcon,
  ShieldIcon,
  DocumentIcon,
  BuildingIcon,
  ChatIcon,
  TargetIcon,
  BriefcaseIcon,
  SparkIcon,
} from "@/components/icons";

export default function LandingPage() {
  return (
    <div>
      {/* NAV */}
      <div className="mx-auto flex h-[88px] max-w-[1320px] items-center justify-between px-6 md:px-24">
        <Logo />
        <div className="hidden items-center gap-10 md:flex">
          <a href="#features" className="text-[15px] text-text-2">
            Features
          </a>
          <a href="#how-it-works" className="text-[15px] text-text-2">
            How it works
          </a>
        </div>
        <Link
          href="/upload"
          className="grad-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white"
        >
          Get Started
        </Link>
      </div>

      {/* HERO */}
      <div className="relative overflow-hidden pb-16 pt-16 md:pt-24">
        <div
          className="pointer-events-none absolute -top-56 left-1/2 h-[560px] w-[760px] -translate-x-[60%] rounded-full opacity-20 blur-[60px]"
          style={{ background: "radial-gradient(circle, var(--blue) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[640px] translate-x-[10%] rounded-full opacity-20 blur-[60px]"
          style={{ background: "radial-gradient(circle, var(--violet) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 mx-auto flex max-w-[860px] flex-col items-center gap-7 px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 text-[13px] font-semibold text-text-2">
            <SparkIcon size={14} color="var(--blue)" />
            AI INTERVIEW COACH
          </div>

          <h1 className="max-w-[820px] text-4xl font-bold leading-[1.06] md:text-[64px]">
            Walk into every interview already prepared.
          </h1>

          <div className="grad-text font-display text-xl font-semibold md:text-2xl">
            Your AI-powered path to interview success.
          </div>

          <p className="max-w-[620px] text-[17px] leading-relaxed text-text-2">
            Upload your resume, tell us the role you&apos;re chasing, and
            InterviewIQ builds a personalized prep plan — real questions,
            tailored answers, company insight, and a live AI interview to
            practice against.
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/upload"
              className="glow-blue grad-bg flex items-center gap-2.5 rounded-2xl px-7 py-4 text-base font-semibold text-white"
            >
              <UploadCloudIcon size={18} color="white" />
              Upload Your CV
            </Link>
            <a
              href="#how-it-works"
              className="rounded-2xl border border-border-strong px-7 py-4 text-base font-semibold text-text"
            >
              See how it works
            </a>
          </div>

          <div className="mt-1 flex items-center gap-2 text-[13px] text-text-3">
            <ShieldIcon size={15} color="var(--text-3)" />
            Your resume stays private — analyzed securely, never shared.
          </div>
        </div>

        {/* product visual */}
        <div className="relative z-10 mx-auto mt-16 max-w-[1040px] px-6">
          <div
            className="grid grid-cols-1 gap-8 rounded-[28px] border border-border-strong p-6 shadow-[0_40px_100px_oklch(10%_0.02_260_/_0.5)] backdrop-blur-xl md:grid-cols-[1.5fr_1fr] md:p-10"
            style={{ background: "oklch(21% 0.024 262 / 0.7)" }}
          >
            <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2.5">
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-blue"
                  style={{ background: "oklch(68% 0.19 258 / 0.16)" }}
                >
                  TECHNICAL
                </span>
                <span className="text-xs text-text-3">Intermediate</span>
              </div>
              <div className="text-[15px] font-medium leading-normal">
                &quot;Walk me through how you optimized rendering performance
                in your React dashboard.&quot;
              </div>
              <div className="flex items-center gap-2 text-[13px] font-semibold text-blue">
                <SparkIcon size={14} color="var(--blue)" />
                Personalized answer ready
              </div>
              <div className="h-px bg-border" />
              <div className="flex flex-col gap-2">
                <div className="h-2 w-full rounded bg-surface-2" />
                <div className="h-2 w-[88%] rounded bg-surface-2" />
                <div className="h-2 w-[65%] rounded bg-surface-2" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3.5 rounded-2xl border border-border bg-surface p-6">
              <div
                className="flex h-[132px] w-[132px] items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(var(--blue) 0deg, var(--violet) 320deg, var(--surface-2) 320deg)",
                }}
              >
                <div className="flex h-[106px] w-[106px] flex-col items-center justify-center rounded-full bg-surface">
                  <div className="font-display text-3xl font-bold">92</div>
                  <div className="text-[10px] text-text-3">/ 100</div>
                </div>
              </div>
              <div className="text-[13px] font-semibold text-text-2">
                Interview Ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" className="bg-bg-deep py-24">
        <div className="mx-auto max-w-[1320px] px-6 md:px-24">
          <div className="mx-auto mb-16 flex max-w-[640px] flex-col items-center gap-4 text-center">
            <span className="text-[13px] font-semibold tracking-[0.08em] text-blue">
              FEATURES
            </span>
            <h2 className="text-3xl font-bold md:text-[38px]">
              Everything you need to walk in ready
            </h2>
            <p className="text-base leading-relaxed text-text-2">
              One platform that turns your resume and target role into a
              complete, personalized prep plan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<DocumentIcon size={22} color="var(--blue)" />}
              tint="oklch(68% 0.19 258 / 0.14)"
              title="Personalized Questions"
              body="Generated from your actual resume, skills and the exact role you're targeting — never generic."
            />
            <FeatureCard
              icon={<BuildingIcon size={22} color="var(--violet)" />}
              tint="oklch(68% 0.19 306 / 0.14)"
              title="Company Research"
              body="See how your target company typically interviews, common rounds, and topics that come up."
            />
            <FeatureCard
              icon={<ChatIcon size={22} color="var(--blue)" />}
              tint="oklch(68% 0.19 258 / 0.14)"
              title="Live AI Interview"
              body="Practice a real back-and-forth conversation with an AI interviewer that asks natural follow-ups."
            />
            <FeatureCard
              icon={<TargetIcon size={22} color="var(--violet)" />}
              tint="oklch(68% 0.19 306 / 0.14)"
              title="Actionable Feedback"
              body="Get scored on communication, technical depth and structure — plus exactly what to practice next."
            />
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how-it-works" className="py-24">
        <div className="mx-auto max-w-[1320px] px-6 md:px-24">
          <div className="mx-auto mb-16 flex max-w-[640px] flex-col items-center gap-4 text-center">
            <span className="text-[13px] font-semibold tracking-[0.08em] text-violet">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl font-bold md:text-[38px]">
              From resume to ready, in four steps
            </h2>
          </div>

          <div className="relative flex flex-col justify-between gap-10 sm:flex-row">
            <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-border sm:block" />
            <Step
              icon={<DocumentIcon size={22} color="var(--blue)" />}
              title="Upload your CV"
              body="We read your skills, projects and experience."
            />
            <Step
              icon={<BriefcaseIcon size={22} color="var(--blue)" />}
              title="Tell us the role"
              body="Job title, company and experience level."
            />
            <Step
              icon={<ChatIcon size={22} color="var(--violet)" />}
              title="Practice & review"
              body="Study personalized Q&As or go live with the AI."
            />
            <Step
              icon={<TargetIcon size={22} color="var(--violet)" />}
              title="Get feedback"
              body="See your scores and what to sharpen next."
            />
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="relative overflow-hidden bg-surface px-6 py-24 md:px-24">
        <div
          className="pointer-events-none absolute -top-44 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[60px]"
          style={{ background: "radial-gradient(circle, var(--blue) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-[600px] text-[28px] font-bold md:text-[34px]">
            Your next interview starts with better prep.
          </h2>
          <div className="grad-text font-display text-lg font-semibold">
            Your AI-powered path to interview success.
          </div>
          <Link
            href="/upload"
            className="glow-blue grad-bg mt-3 rounded-2xl px-9 py-[18px] text-base font-semibold text-white"
          >
            Start Preparing Now
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-8 md:px-24">
        <div className="flex items-center gap-2.5">
          <div className="grad-bg flex h-[26px] w-[26px] items-center justify-center rounded-lg">
            <SparkIcon size={13} color="white" />
          </div>
          <span className="text-[13px] text-text-3">© 2026 InterviewIQ</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-[13px] text-text-3">
            Privacy
          </a>
          <a href="#" className="text-[13px] text-text-3">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  tint,
  title,
  body,
}: {
  icon: React.ReactNode;
  tint: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: tint }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-text-2">{body}</p>
    </div>
  );
}

function Step({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-border-strong bg-surface">
        {icon}
      </div>
      <div className="font-display text-base font-semibold">{title}</div>
      <p className="max-w-[200px] text-center text-[13px] leading-relaxed text-text-3">
        {body}
      </p>
    </div>
  );
}
