# InterviewIQ

Your AI-powered path to interview success.

A working prototype of an AI interview preparation app: upload a resume, describe the target role, and get a personalized set of interview questions with model answers, company research, an expected interview process, a live conversational AI interview, and a scored feedback report — all powered by the free tier of the Gemini API.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS** for styling, built on the same design tokens as the [design canvas](./design/)
- **Gemini API** (`gemini-3.5-flash-lite`, via `@google/genai`) for resume-aware question/answer generation, the live interview conversation, and feedback scoring — free of charge, with a much higher free-tier request rate than the flagship Flash models
- **pdf-parse** / **mammoth** for resume text extraction (PDF / DOCX)

This is a prototype: state lives in the browser (`sessionStorage`) rather than a database, and there are no user accounts. See "Scope" below.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your Gemini API key:

   ```bash
   cp .env.local.example .env.local
   # then edit .env.local and paste your key
   ```

   Get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## How it works

| Step | Page | What happens |
|---|---|---|
| 1 | `/upload` | Drag-and-drop a PDF/DOCX resume; `/api/resume/parse` extracts the raw text server-side. |
| 2 | `/job-details` | Enter job role, company, experience level, optional job description; `/api/prep/generate` asks Gemini for a structured prep package (resume highlights, company research, a 5-stage process overview, and 12–16 personalized questions with model answers) in one call. |
| 3 | `/dashboard` | Browse and filter the generated questions by difficulty/category, reveal answers, review company research and the expected process. |
| 4 | `/interview` | A live, streaming back-and-forth with Gemini playing the interviewer — it asks follow-ups based on what you actually say. `/api/interview/turn` streams each response. |
| 5 | `/feedback` | Ending the interview sends the full transcript to `/api/feedback/generate`, which scores you on 5 metrics and returns strengths, areas to improve, and topics to practice next. |

## Scope & known limitations (prototype)

- **No accounts, no database.** All app state (resume text, job details, generated prep, interview transcript, feedback) lives in the browser's `sessionStorage` for the current tab/session — closing the tab clears it.
- **No voice input.** The mic button in the live interview is a placeholder; answers are typed.
- **Model.** Every generation step calls `gemini-3.5-flash-lite`, which is free of charge and carries a much higher free-tier request-per-minute limit than the flagship `gemini-3.8-flash` (which we tried first and found capped at 5 requests/minute on the free tier — too low for the back-and-forth of a live interview). Swap the `MODEL` constant in `src/lib/gemini.ts` if you want higher-quality output at the cost of a lower free-tier rate limit.
- Company research is Gemini's best estimate from general knowledge — it's presented as such in the UI and should not be treated as an official or guaranteed process.

## Design

The `design/` folder holds the original visual design canvas (`.dc.html` artboards) this UI was built from.
