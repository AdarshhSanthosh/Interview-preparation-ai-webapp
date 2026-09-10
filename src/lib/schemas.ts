import { z } from "zod";

export const ExperienceLevelSchema = z.enum([
  "Beginner",
  "Intermediate",
  "Expert",
]);

export const QuestionCategorySchema = z.enum([
  "Technical",
  "Behavioral",
  "Resume Based",
  "Project Based",
  "Company Based",
  "HR",
  "Role Specific",
]);

export const PrepResponseSchema = z.object({
  resumeHighlights: z
    .object({
      skills: z.array(z.string()).describe("Key technical and soft skills found in the resume"),
      experience: z.array(z.string()).describe("Short one-line summaries of past roles"),
      projects: z.array(z.string()).describe("Short one-line summaries of notable projects"),
      education: z.array(z.string()),
      certifications: z.array(z.string()).describe("Certifications; empty array if none found"),
    })
    .describe("Structured extraction of the candidate's resume"),
  companyResearch: z
    .object({
      overview: z
        .string()
        .describe("2-3 sentence overview of the company and what its interview process emphasizes"),
      rounds: z
        .array(z.string())
        .describe("Short labels for the company's typical interview rounds, e.g. 'Recruiter Call'"),
      commonTopics: z
        .array(z.string())
        .describe("Short tags for topics commonly reported in this company's interviews"),
    })
    .describe("Researched/estimated interview information — always frame as estimated, never guaranteed"),
  processSteps: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().describe("One short sentence on what to expect in this stage"),
      }),
    )
    .describe(
      "Exactly 5 stages in order: Recruiter Screening, Technical Interview, Coding Round, System Design, Behavioral Round — tailor descriptions to the role/level",
    ),
  questions: z
    .array(
      z.object({
        category: QuestionCategorySchema,
        difficulty: ExperienceLevelSchema,
        question: z.string(),
        answer: z
          .string()
          .describe(
            "A personalized model answer written in first person, grounded in specific details from the candidate's resume where relevant",
          ),
      }),
    )
    .describe("12-16 interview questions spanning all categories and a spread of difficulties"),
});

export type PrepResponse = z.infer<typeof PrepResponseSchema>;

export const FeedbackResponseSchema = z.object({
  overallScore: z.number().min(0).max(100),
  performanceLabel: z
    .string()
    .describe("A short 2-3 word performance label, e.g. 'Strong Performance'"),
  metrics: z.object({
    answerQuality: z.number().min(0).max(100),
    technicalKnowledge: z.number().min(0).max(100),
    communication: z.number().min(0).max(100),
    confidence: z.number().min(0).max(100),
    answerStructure: z.number().min(0).max(100),
  }),
  strengths: z.array(z.string()).describe("3-5 specific strengths grounded in what the candidate actually said"),
  improvements: z.array(z.string()).describe("3-5 specific, actionable areas to improve"),
  recommendedTopics: z
    .array(z.string())
    .describe("3-5 short topic names the candidate should practice next"),
});

export type FeedbackResponse = z.infer<typeof FeedbackResponseSchema>;
