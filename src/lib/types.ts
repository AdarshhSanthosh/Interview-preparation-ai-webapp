export type ExperienceLevel = "Beginner" | "Intermediate" | "Expert";

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  "Beginner",
  "Intermediate",
  "Expert",
];

export type QuestionCategory =
  | "Technical"
  | "Behavioral"
  | "Resume Based"
  | "Project Based"
  | "Company Based"
  | "HR"
  | "Role Specific";

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  "Technical",
  "Behavioral",
  "Resume Based",
  "Project Based",
  "Company Based",
  "HR",
  "Role Specific",
];

export interface JobDetails {
  jobRole: string;
  company: string;
  experienceLevel: ExperienceLevel;
  jobDescription?: string;
}

export interface ResumeHighlights {
  skills: string[];
  experience: string[];
  projects: string[];
  education: string[];
  certifications: string[];
}

export interface CompanyResearch {
  overview: string;
  rounds: string[];
  commonTopics: string[];
}

export interface ProcessStep {
  name: string;
  description: string;
}

export interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  difficulty: ExperienceLevel;
  question: string;
  answer: string;
}

export interface PrepResult {
  resumeHighlights: ResumeHighlights;
  companyResearch: CompanyResearch;
  processSteps: ProcessStep[];
  questions: InterviewQuestion[];
}

export interface TranscriptMessage {
  role: "interviewer" | "candidate";
  text: string;
}

export interface FeedbackMetrics {
  answerQuality: number;
  technicalKnowledge: number;
  communication: number;
  confidence: number;
  answerStructure: number;
}

export interface FeedbackResult {
  overallScore: number;
  performanceLabel: string;
  metrics: FeedbackMetrics;
  strengths: string[];
  improvements: string[];
  recommendedTopics: string[];
}

export interface AppState {
  resumeText: string | null;
  resumeFileName: string | null;
  resumeFileSizeLabel: string | null;
  jobDetails: JobDetails | null;
  prep: PrepResult | null;
  transcript: TranscriptMessage[];
  feedback: FeedbackResult | null;
}

export const EMPTY_STATE: AppState = {
  resumeText: null,
  resumeFileName: null,
  resumeFileSizeLabel: null,
  jobDetails: null,
  prep: null,
  transcript: [],
  feedback: null,
};
