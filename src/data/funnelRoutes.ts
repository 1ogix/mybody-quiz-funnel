export const FUNNEL_SLUG = "uni-s-mb-pbp-sugar";
export const FUNNEL_CODE = "e9950628ffe65fe29a7060e6407a3b25";

export const STARTNOW_PATH = `/startnow/${FUNNEL_SLUG}`;
export const QUIZ_BASE_PATH = `/quiz/${FUNNEL_SLUG}`;
export const EMAIL_PATH = `/email/${FUNNEL_SLUG}`;
export const LOADER_PATH = `/loader/${FUNNEL_SLUG}`;
export const CHECKOUT_PATH = `/checkout/${FUNNEL_SLUG}`;
export const CHECKOUT_RESULT_PATH = "/checkout/result";

const STEP_QUESTION_BY_ID: Record<number, string | undefined> = {
  1: undefined,
  2: "trusted_by_many",
  3: "main_goal",
  4: "body_goals",
  5: "studies_prove",
  6: "height",
  7: "weight",
};

const QUESTION_STEP_MAP = new Map<string, number>([
  ["trusted_by_many", 2],
  ["main_goal", 3],
  ["body_goals", 4],
  ["studies_prove", 5],
  ["height", 6],
  ["weight", 7],
  ["target_weight", 8],
  ["age", 8],
  ["weight_changes", 8],
  ["day_spending", 8],
  ["last_time_felt_good_about_weight", 8],
  ["eating_preferences", 8],
  ["meals_per_day", 8],
  ["sugar_intake", 8],
  ["activity_level", 8],
  ["perfect_solution", 8],
  ["water_intake", 8],
  ["cooking_time", 8],
  ["eating_out", 8],
  ["have_allergies", 8],
  ["allergies", 8],
  ["omit_nonos", 8],
  ["specialists", 8],
  ["do_you_have_medical_conditions", 8],
  ["what_medical_conditions", 8],
  ["special_event", 8],
  ["weight_loss_forecast", 8],
  ["wellness_summary", 8],
]);

export function getStepIdFromQuestion(question?: string | null): number {
  if (!question) return 1;
  return QUESTION_STEP_MAP.get(question) ?? 1;
}

export function getQuestionFromStepId(stepId: number): string | undefined {
  return STEP_QUESTION_BY_ID[stepId];
}

export function getQuizPathForStep(stepId: number): string {
  if (stepId === 8) {
    return EMAIL_PATH;
  }

  if (stepId <= 1) {
    return QUIZ_BASE_PATH;
  }

  const question = getQuestionFromStepId(stepId);
  if (!question) {
    return QUIZ_BASE_PATH;
  }

  return `${QUIZ_BASE_PATH}?question=${question}`;
}

export function getLoaderPath(code: string = FUNNEL_CODE): string {
  return `${LOADER_PATH}?code=${code}`;
}

export function getCheckoutPath(code: string = FUNNEL_CODE): string {
  return `${CHECKOUT_PATH}?code=${code}`;
}
