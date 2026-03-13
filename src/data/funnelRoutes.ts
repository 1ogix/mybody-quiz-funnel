export const FUNNEL_SLUG = "uni-s-mb-pbp-sugar";
export const FUNNEL_CODE = "e9950628ffe65fe29a7060e6407a3b25";

export const STARTNOW_PATH = `/startnow/${FUNNEL_SLUG}`;
export const QUIZ_BASE_PATH = `/quiz/${FUNNEL_SLUG}`;
export const EMAIL_PATH = `/email/${FUNNEL_SLUG}`;
export const LOADER_PATH = `/loader/${FUNNEL_SLUG}`;
export const CHECKOUT_PATH = `/checkout/${FUNNEL_SLUG}`;
export const CHECKOUT_RESULT_PATH = "/checkout/result";
export const DEFAULT_FUNNEL_QUESTION = "gender";

export const FUNNEL_QUESTION_ORDER: string[] = [
  "gender",
  "trusted_by_many",
  "main_goal",
  "body_goals",
  "studies_prove",
  "height",
  "weight",
  "target_weight",
  "age",
  "weight_changes",
  "day_spending",
  "last_time_felt_good_about_weight",
  "eating_preferences",
  "meals_per_day",
  "sugar_intake",
  "activity_level",
  "perfect_solution",
  "water_intake",
  "cooking_time",
  "eating_out",
  "have_allergies",
  "allergies",
  "omit_nonos",
  "specialists",
  "do_you_have_medical_conditions",
  "what_medical_conditions",
  "special_event",
  "event_date",
  "weight_loss_forecast",
  "wellness_summary",
];

const STEP_QUESTION_BY_ID: Record<number, string | undefined> = {
  1: "gender",
  2: "trusted_by_many",
  3: "main_goal",
  4: "body_goals",
  5: "studies_prove",
  6: "height",
  7: "weight",
  8: "target_weight",
  9: "age",
  10: "weight_changes",
  11: "day_spending",
  12: "last_time_felt_good_about_weight",
  13: "eating_preferences",
  14: "meals_per_day",
  15: "sugar_intake",
  16: "activity_level",
  17: "perfect_solution",
  18: "water_intake",
  19: "cooking_time",
  20: "eating_out",
  21: "have_allergies",
  22: "allergies",
  23: "omit_nonos",
  24: "specialists",
  25: "do_you_have_medical_conditions",
  26: "what_medical_conditions",
  27: "special_event",
  28: "event_date",
  29: "weight_loss_forecast",
  30: "wellness_summary",
};

const QUESTION_STEP_MAP = new Map<string, number>([
  ["gender", 1],
  ["trusted_by_many", 2],
  ["main_goal", 3],
  ["body_goals", 4],
  ["studies_prove", 5],
  ["height", 6],
  ["weight", 7],
  ["target_weight", 8],
  ["age", 9],
  ["weight_changes", 10],
  ["day_spending", 11],
  ["last_time_felt_good_about_weight", 12],
  ["eating_preferences", 13],
  ["meals_per_day", 14],
  ["sugar_intake", 15],
  ["activity_level", 16],
  ["perfect_solution", 17],
  ["water_intake", 18],
  ["cooking_time", 19],
  ["eating_out", 20],
  ["have_allergies", 21],
  ["allergies", 22],
  ["omit_nonos", 23],
  ["specialists", 24],
  ["do_you_have_medical_conditions", 25],
  ["what_medical_conditions", 26],
  ["special_event", 27],
  ["event_date", 28],
  ["weight_loss_forecast", 29],
  ["wellness_summary", 30],
]);

export function getStepIdFromQuestion(question?: string | null): number {
  if (!question) return 1;
  return QUESTION_STEP_MAP.get(question) ?? 1;
}

export function getQuestionFromStepId(stepId: number): string | undefined {
  return STEP_QUESTION_BY_ID[stepId];
}

export function getQuizPathForStep(stepId: number): string {
  if (stepId === 31) {
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

export function getProgressPercentForQuestion(question?: string | null): number {
  const key = question || DEFAULT_FUNNEL_QUESTION;
  const index = FUNNEL_QUESTION_ORDER.indexOf(key);
  if (index < 0) {
    return 5;
  }

  return ((index + 1) / FUNNEL_QUESTION_ORDER.length) * 100;
}
