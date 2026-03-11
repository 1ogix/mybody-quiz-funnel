export type StepType =
  | "single-select"
  | "multi-select"
  | "number-input"
  | "email-input"
  | "info";

export interface Answer {
  id: string;
  label: string;
  emoji?: string;
  nextStep?: number;
}

export interface QuizStep {
  id: number;
  type: StepType;
  question: string;
  subtitle?: string;
  bullets?: string[];
  answers?: Answer[];
  inputPlaceholder?: string;
  inputUnit?: string;
  inputMin?: number;
  inputMax?: number;
  /** If true, selecting an answer auto-advances immediately */
  autoAdvance?: boolean;
  /** Static next step (overridden by answer.nextStep if set) */
  nextStep?: number;
  /** Image src for hero area */
  heroImage?: string;
}

export interface QuizAnswers {
  [stepId: number]: string | string[];
}

export interface QuizState {
  currentStep: number;
  answers: QuizAnswers;
  completedAt?: number;
  offerSeenAt?: number;
}
