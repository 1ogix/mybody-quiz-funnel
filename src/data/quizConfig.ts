import { QuizStep } from "@/types/quiz";

export const TOTAL_QUIZ_STEPS = 8; // steps 1–8 (loading + results + offer are separate pages)

export const quizSteps: QuizStep[] = [
  {
    id: 1,
    type: "single-select",
    question: "Select your A1C levels",
    bullets: [
      "Easy-to-follow A1C management plan",
      "See real changes in just 7 days",
      "Crush cravings with tasty meals",
      "Slim down with no extreme rules",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    autoAdvance: true,
    answers: [
      { id: "high", label: "> 6.4", nextStep: 2 },
      { id: "pre", label: "5.7 – 6.4", nextStep: 2 },
      { id: "normal", label: "< 5.6", nextStep: 2 },
      { id: "unknown", label: "I don't know", nextStep: 2 },
    ],
  },
  {
    id: 2,
    type: "single-select",
    question: "What is your main goal?",
    subtitle: "Choose the one that matters most to you right now.",
    autoAdvance: true,
    nextStep: 3,
    answers: [
      { id: "blood-sugar", label: "Reduce blood sugar", emoji: "🩸" },
      { id: "lose-weight", label: "Lose weight", emoji: "⚖️" },
      { id: "eat-healthy", label: "Eat healthier", emoji: "🥦" },
      { id: "more-energy", label: "More energy", emoji: "⚡" },
    ],
  },
  {
    id: 3,
    type: "single-select",
    question: "How old are you?",
    subtitle: "Your age helps us tailor the right plan for you.",
    autoAdvance: true,
    nextStep: 4,
    answers: [
      { id: "18-29", label: "18–29" },
      { id: "30-39", label: "30–39" },
      { id: "40-49", label: "40–49" },
      { id: "50+", label: "50+" },
    ],
  },
  {
    id: 4,
    type: "single-select",
    question: "What is your gender?",
    subtitle: "Biological differences affect how the body responds to diet.",
    autoAdvance: true,
    nextStep: 5,
    answers: [
      { id: "female", label: "Female", emoji: "👩" },
      { id: "male", label: "Male", emoji: "👨" },
    ],
  },
  {
    id: 5,
    type: "single-select",
    question: "How active are you?",
    subtitle: "Be honest — this helps us set realistic goals.",
    autoAdvance: true,
    nextStep: 6,
    answers: [
      { id: "sedentary", label: "Not active", emoji: "🛋️" },
      { id: "light", label: "Lightly active", emoji: "🚶" },
      { id: "moderate", label: "Moderately active", emoji: "🏃" },
      { id: "very", label: "Very active", emoji: "🏋️" },
    ],
  },
  {
    id: 6,
    type: "number-input",
    question: "How much do you weigh?",
    subtitle: "We use this to personalise your calorie and meal targets.",
    inputPlaceholder: "Enter your weight",
    inputUnit: "lbs",
    inputMin: 66,
    inputMax: 440,
    nextStep: 7,
  },
  {
    id: 7,
    type: "multi-select",
    question: "What is your biggest challenge?",
    subtitle: "Select all that apply.",
    nextStep: 8,
    answers: [
      { id: "cravings", label: "Sugar cravings", emoji: "🍭" },
      { id: "no-time", label: "No time to cook", emoji: "⏰" },
      { id: "lost", label: "Don't know where to start", emoji: "🤷" },
      { id: "motivation", label: "Lack of motivation", emoji: "😓" },
    ],
  },
  {
    id: 8,
    type: "email-input",
    question: "Where should we send your personalised plan?",
    subtitle: "Join 2M+ people who improved their health with MyBody.",
    inputPlaceholder: "Enter your email address",
    nextStep: 9, // loading screen
  },
];

export const PROGRESS_PERCENTS: Record<number, number> = {
  1: 10,
  2: 20,
  3: 32,
  4: 44,
  5: 56,
  6: 68,
  7: 80,
  8: 92,
};

// ─── uni-s-mb-pbp-sugar funnel ────────────────────────────────────────────────
// First step visible after the startnow landing page.
// Uses card-style layout (QuizOptionCard). Title/subtitle order is reversed
// visually (subtitle shown above title) to match the live site's flex-col-reverse.

export const funnelSteps: QuizStep[] = [
  {
    // Matches devtools HTML: data-testid="quiz__question-gender"
    id: 1,
    type: "single-select",
    question: "Your diet type",
    subtitle: "Your gender helps us determine calorie intake and weight goal",
    autoAdvance: true,
    nextStep: 2,
    answers: [
      { id: "female", label: "Diet for women", emoji: "👩" },
      { id: "male", label: "Diet for men", emoji: "👨" },
    ],
  },
  {
    // Matches devtools HTML: data-testid="quiz__question-trusted_by_many"
    id: 2,
    type: "info",
    question: "trusted_by_many",
    nextStep: 3,
  },
  {
    id: 3,
    type: "single-select",
    question: "What's your main goal?",
    autoAdvance: true,
    nextStep: 4,
    answers: [
      { id: "lose_weight", label: "Lose weight", emoji: "📉" },
      {
        id: "balance_blood_sugar",
        label: "Balance my blood sugar",
        emoji: "🍬",
      },
      {
        id: "boost_energy",
        label: "Boost energy and feel better",
        emoji: "🤸",
      },
    ],
  },
  {
    id: 4,
    type: "multi-select",
    question: "What are your body goals?",
    subtitle: "If you are happy with your appearance, then press next",
    nextStep: 5,
    answers: [
      { id: "lifted_chest", label: "Lifted chest" },
      { id: "flatter_belly", label: "Flatter belly" },
      { id: "firmer_butt", label: "Firmer butt" },
      { id: "leaner_legs", label: "Leaner legs" },
      { id: "full_body", label: "Full body transformation" },
    ],
  },
  {
    id: 5,
    type: "single-select",
    question: "How active are you?",
    subtitle: "Be honest — this helps us set realistic goals.",
    autoAdvance: true,
    nextStep: 6,
    answers: [
      { id: "sedentary", label: "Not active", emoji: "🛋️" },
      { id: "light", label: "Lightly active", emoji: "🚶" },
      { id: "moderate", label: "Moderately active", emoji: "🏃" },
      { id: "very", label: "Very active", emoji: "🏋️" },
    ],
  },
  {
    id: 6,
    type: "number-input",
    question: "How much do you weigh?",
    subtitle: "We use this to personalise your calorie and meal targets.",
    inputPlaceholder: "Enter your weight",
    inputUnit: "lbs",
    inputMin: 66,
    inputMax: 440,
    nextStep: 7,
  },
  {
    id: 7,
    type: "multi-select",
    question: "What is your biggest challenge?",
    subtitle: "Select all that apply.",
    nextStep: 8,
    answers: [
      { id: "cravings", label: "Sugar cravings", emoji: "🍭" },
      { id: "no-time", label: "No time to cook", emoji: "⏰" },
      { id: "lost", label: "Don't know where to start", emoji: "🤷" },
      { id: "motivation", label: "Lack of motivation", emoji: "😓" },
    ],
  },
  {
    id: 8,
    type: "email-input",
    question: "Where should we send your personalised plan?",
    subtitle: "Join 2M+ people who improved their health with MyBody.",
    inputPlaceholder: "Enter your email address",
    nextStep: 9,
  },
];

export const FUNNEL_PROGRESS: Record<number, number> = {
  1: 3.3333333333333335,
  2: 7,
  3: 11,
  4: 14,
  5: 18,
  6: 63,
  7: 78,
  8: 90,
};
