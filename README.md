# InterviewIQ

Your AI-powered path to interview success.

A working prototype of an AI interview preparation app: upload a resume, describe the target role, and get a personalized set of interview questions with model answers, company research, an expected interview process, a live conversational AI interview, and a scored feedback report — all powered by the free tier of the Gemini API.

**🚀 [Try the live demo](https://interview-preparation-ai-webapp.vercel.app/)**

> The live demo runs on the maintainer's free-tier Gemini API key, shared by everyone who visits. If it's busy or you hit a rate-limit error, wait a minute and try again — or run it locally with your own free key (takes about 2 minutes, see below) for a dedicated, uninterrupted experience.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS** for styling, built on the same design tokens as the [design canvas](./design/)
- **Gemini API** (`gemini-3.5-flash-lite`, via `@google/genai`) for resume-aware question/answer generation, the live interview conversation, and feedback scoring — free of charge, with a much higher free-tier request rate than the flagship Flash models
- **pdf-parse** / **mammoth** for resume text extraction (PDF / DOCX)

This is a prototype: state lives in the browser (`sessionStorage`) rather than a database, and there are no user accounts. See "Scope" below.

## Run it locally with your own API key

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/AdarshhSanthosh/Interview-preparation-ai-webapp.git
   cd Interview-preparation-ai-webapp
   npm install
   ```

2. Get a **free** Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — sign in with any Google account, click "Create API key," and copy it. No credit card or billing setup needed for the free tier.

3. Add it to a local env file:

   ```bash
   cp .env.local.example .env.local
   ```

   Then open `.env.local` and paste your key:

   ```
   GEMINI_API_KEY=your-key-here
   ```

   `.env.local` is git-ignored, so your key never gets committed — keep it out of any commit or public conversation.

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). This copy is fully yours — no shared rate limit, no waiting on anyone else's usage.

### Deploying your own copy

The live demo above is deployed on [Vercel](https://vercel.com) directly from this repo. To deploy your own: import this repo at [vercel.com/new](https://vercel.com/new), leave the default Next.js build settings, and add one environment variable — `GEMINI_API_KEY` — with your own key from step 2 above.

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
