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
    type: "info",
    question: "studies_prove",
    nextStep: 6,
  },
  {
    id: 6,
    type: "number-input",
    question: "What’s your height?",
    nextStep: 7,
  },
  {
    id: 7,
    type: "number-input",
    question: "What’s your height?",
    subtitle: "We use this to personalise your calorie and meal targets.",
    inputPlaceholder: "Enter your weight",
    inputUnit: "lbs",
    inputMin: 66,
    inputMax: 440,
    nextStep: 8,
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
    type: "info",
    question: "studies_prove",
    nextStep: 6,
  },
  {
    id: 6,
    type: "number-input",
    question: "What’s your height?",
    nextStep: 7,
  },
  {
    id: 7,
    type: "number-input",
    question: "What’s your current weight?",
    inputPlaceholder: "Enter your weight",
    inputUnit: "lbs",
    inputMin: 66,
    inputMax: 440,
    nextStep: 8,
  },
  {
    id: 8,
    type: "number-input",
    question: "What’s your target weight?",
    nextStep: 9,
  },
  {
    id: 9,
    type: "number-input",
    question: "What’s your age?",
    nextStep: 10,
  },
  {
    id: 10,
    type: "info",
    question: "weight_changes",
    nextStep: 11,
  },
  {
    id: 11,
    type: "single-select",
    question: "How do you usually spend your day?",
    subtitle: "Select what fits best",
    autoAdvance: true,
    nextStep: 12,
    answers: [
      { id: "sitting", label: "Sitting most of the day", emoji: "🪑" },
      { id: "on_my_feet", label: "On my feet a lot", emoji: "👣" },
      { id: "very_active", label: "Very active", emoji: "🚴" },
      {
        id: "minimal_activity",
        label: "At home with minimal activity",
        emoji: "🏡",
      },
    ],
  },
  {
    id: 12,
    type: "single-select",
    question: "When was the last time you felt good about your weight?",
    nextStep: 13,
    answers: [
      { id: "less_than_year_ago", label: "Less than a year ago" },
      { id: "one_three_years_ago", label: "1-3 years ago" },
      { id: "over_three_years_ago", label: "Over 3 years ago" },
      { id: "never", label: "Never" },
    ],
  },
  {
    id: 13,
    type: "single-select",
    question: "Define your diet",
    subtitle:
      "Knowing your diet type helps us customize a plan based on your dietary needs and preferences",
    autoAdvance: true,
    nextStep: 14,
    answers: [
      {
        id: "whole_eater",
        label: "I eat everything",
        imageSrc: "/images/pork_cooked_lean.95dc0c6b.png",
      },
      {
        id: "vegetarian",
        label: "Vegetarian",
        imageSrc: "/images/fried_egg.ddf02f6c.png",
      },
      { id: "vegan", label: "Vegan", emoji: "🥗" },
    ],
  },
  {
    id: 14,
    type: "single-select",
    question: "How many meals do you prefer per day?",
    subtitle: "You can always update this later",
    autoAdvance: true,
    nextStep: 15,
    answers: [
      { id: "3", label: "3 meals" },
      { id: "4", label: "4 meals" },
      { id: "5", label: "5 meals" },
    ],
  },
  {
    id: 15,
    type: "single-select",
    question: "Do you eat products with added sugar?",
    autoAdvance: true,
    nextStep: 16,
    answers: [
      {
        id: "every_day",
        label: "Every day",
        imageSrc: "/images/sun_emoji.157ff74c.png",
      },
      {
        id: "often",
        label: "Often",
        imageSrc: "/images/woman_hands_emoji.45e07fb0.png",
      },
      {
        id: "sometimes",
        label: "Sometimes",
        imageSrc: "/images/woman_shrug_emoji.f6b48334.png",
      },
      {
        id: "never",
        label: "Never",
        imageSrc: "/images/cant-emoji.00f661e2.png",
      },
    ],
  },
  {
    id: 16,
    type: "single-select",
    question: "Do you workout?",
    subtitle:
      "Exercise can speed up results. We’ll help you build a routine that works for you",
    nextStep: 17,
    answers: [
      {
        id: "not_active",
        label: "I don’t exercise",
        imageSrc: "/images/not-active-emoji.f67eb1c7.png",
      },
      {
        id: "walk_only",
        label: "I only walk",
        imageSrc: "/images/moderately-active-emoji.4abcc96c.png",
      },
      {
        id: "one_two_times_week",
        label: "1-2 times a week",
        imageSrc: "/images/woman_in_lotus.cd6a6432.png",
      },
      {
        id: "three_five_times_week",
        label: "3-5 times a week",
        imageSrc: "/images/very-active-emoji.b5c3526d.png",
      },
    ],
  },
  {
    id: 17,
    type: "info",
    question: "perfect_solution",
    nextStep: 18,
  },
  {
    id: 18,
    type: "single-select",
    question: "How much water do you drink daily?",
    subtitle: "We mean plain water - no coffee, tea, or juice",
    nextStep: 19,
    answers: [
      {
        id: "only_coffee_or_tea",
        label: "Only coffee or tea",
        imageSrc: "/images/hot_beverage_emoji.711469d7.png",
      },
      {
        id: "fewer_than_2_glasses",
        label: "Fewer than 2 glasses",
        imageSrc: "/images/droplet_emoji.2bde3a80.png",
      },
      {
        id: "2_6_glasses",
        label: "2-6 glasses",
        imageSrc: "/images/two_droplets_emoji.06ec23fa.png",
      },
      {
        id: "7_10_glasses",
        label: "7-10 glasses",
        imageSrc: "/images/three_droplets_emoji.3f42f815.png",
      },
      {
        id: "depends",
        label: "I don’t count - it depends",
        imageSrc: "/images/interested_emoji.96772adf.png",
      },
    ],
  },
  {
    id: 19,
    type: "single-select",
    question: "How much time can you spend on cooking?",
    autoAdvance: true,
    nextStep: 20,
    answers: [
      {
        id: "quick_and_easy",
        label: "Quick and easy",
        imageSrc: "/images/avocado_emoji.984a10f7.png",
      },
      {
        id: "depends_on_the_day",
        label: "Depends on the day",
        imageSrc: "/images/green_salad_emoji.6df08edf.png",
      },
      {
        id: "love_cooking_from_scratch",
        label: "Love cooking from scratch",
        imageSrc: "/images/spaghetti_emoji.cf89d162.png",
      },
    ],
  },
  {
    id: 20,
    type: "single-select",
    question: "How often do you eat out or order in?",
    subtitle: "Think restaurants, takeout, or delivery meals",
    autoAdvance: true,
    nextStep: 21,
    answers: [
      {
        id: "rarely",
        label: "Rarely",
        imageSrc: "/images/man_cook_emoji.f3f50740.png",
      },
      {
        id: "1_3_times_a_month",
        label: "1-3 times a month",
        imageSrc: "/images/takeout_box.b678c5bc.png",
      },
      {
        id: "1_3_times_a_week",
        label: "1-3 times a week",
        imageSrc: "/images/two_takeout_boxes.dce8a779.png",
      },
      {
        id: "more_than_4_times_a_week",
        label: "More than 4 times a week",
        imageSrc: "/images/three_takeout_boxes.2cacbf00.png",
      },
    ],
  },
  {
    id: 21,
    type: "single-select",
    question: "Any food allergies?",
    subtitle:
      "Sharing your food allergies allows us to tailor your nutrition plan accordingly",
    autoAdvance: true,
    nextStep: 22,
    answers: [
      {
        id: "yes",
        label: "Yes",
        imageSrc: "/images/sad_emoji.6b871970.png",
        nextStep: 22,
      },
      {
        id: "no",
        label: "No",
        imageSrc: "/images/smile_emoji.9d7eadf3.png",
        nextStep: 23,
      },
    ],
  },
  {
    id: 22,
    type: "multi-select",
    question: "Select your allergies",
    subtitle: "Your selection will not be included in your nutrition plan",
    nextStep: 23,
    answers: [
      { id: "none", label: "None" },
      {
        id: "lactose",
        label: "Lactose",
        imageSrc: "/images/lactose.9274e086.png",
      },
      { id: "eggs", label: "Eggs", imageSrc: "/images/eggs.0bb45dd1.png" },
      { id: "nuts", label: "Nuts", imageSrc: "/images/nuts.4ba16e9f.png" },
      {
        id: "gluten",
        label: "Gluten",
        imageSrc: "/images/gluten.af3607a5.png",
      },
      { id: "fish", label: "Fish", imageSrc: "/images/fish.e82aa9e0.png" },
      {
        id: "shellfish",
        label: "Shellfish",
        imageSrc: "/images/shellfish.d3ad168a.png",
      },
      { id: "soy", label: "Soy", imageSrc: "/images/soy.4c281d1b.png" },
      {
        id: "citrus_fruits",
        label: "Citrus fruits",
        imageSrc: "/images/citrus_fruits.507b78f4.png",
      },
      { id: "Other", label: "Other", imageSrc: "/images/other.56e5a8b2.png" },
    ],
  },
  {
    id: 23,
    type: "multi-select",
    question: "Select foods that you can't stand",
    subtitle:
      "Sharing your food preferences helps us create a nutrition plan you'll enjoy",
    nextStep: 24,
    answers: [
      { id: "none", label: "I eat them all" },
      {
        id: "bellpeppers",
        label: "Bell peppers",
        imageSrc: "/images/bellpepper.ff8c0ef2.png",
      },
      { id: "eggs", label: "Eggs", imageSrc: "/images/eggs.0bb45dd1.png" },
      {
        id: "mushrooms",
        label: "Mushrooms",
        imageSrc: "/images/mushrooms.1f46d5b1.png",
      },
      {
        id: "onions",
        label: "Onions",
        imageSrc: "/images/onions.9f32c2bb.png",
      },
      {
        id: "cauliflower",
        label: "Cauliflower",
        imageSrc: "/images/cauliflower.be87565a.png",
      },
      {
        id: "wheat",
        label: "Wheat and gluten",
        imageSrc: "/images/wheat.af3607a5.png",
      },
      {
        id: "dairy",
        label: "Dairy products",
        imageSrc: "/images/dairy.9274e086.png",
      },
      {
        id: "broccoli",
        label: "Broccoli",
        imageSrc: "/images/broccoli.606fcf04.png",
      },
      {
        id: "tomatoes",
        label: "Tomatoes",
        imageSrc: "/images/tomato.133fb8f3.png",
      },
      {
        id: "banana",
        label: "Banana",
        imageSrc: "/images/banana.23a4ef69.png",
      },
      {
        id: "apples",
        label: "Apples",
        imageSrc: "/images/apple.2a111ac5.png",
      },
      {
        id: "melons",
        label: "Melons",
        imageSrc: "/images/melon.a264cc67.png",
      },
      {
        id: "cucumber",
        label: "Cucumber",
        imageSrc: "/images/cucumber.dfc2a7c1.png",
      },
      {
        id: "potatoes",
        label: "Potatoes",
        imageSrc: "/images/potato.3b862592.png",
      },
      {
        id: "pasta",
        label: "Pasta",
        imageSrc: "/images/pasta.061e0756.png",
      },
      { id: "rice", label: "Rice", imageSrc: "/images/rice.183ae5a4.png" },
      {
        id: "oranges",
        label: "Oranges",
        imageSrc: "/images/orange.a2f9a04c.png",
      },
      {
        id: "zucchini",
        label: "Zucchini",
        imageSrc: "/images/zucchini.44f3ff36.png",
      },
      { id: "tofu", label: "Tofu", imageSrc: "/images/tofu.d2b8cfa8.png" },
      {
        id: "buckwheat",
        label: "Buckwheat",
        imageSrc: "/images/buckwheat.1ca12718.png",
      },
      {
        id: "quinoa",
        label: "Quinoa",
        imageSrc: "/images/quinoa.9dd9d264.png",
      },
      {
        id: "salmon",
        label: "Salmon",
        imageSrc: "/images/salmon.e82aa9e0.png",
      },
    ],
  },
  {
    id: 24,
    type: "info",
    question: "specialists",
    nextStep: 25,
  },
  {
    id: 25,
    type: "single-select",
    question: "Any other medical conditions?",
    subtitle: "Medical information may have an impact on your nutritional needs",
    autoAdvance: true,
    nextStep: 27,
    answers: [
      {
        id: "yes",
        label: "Yes",
        imageSrc: "/images/sad_emoji.6b871970.png",
        nextStep: 26,
      },
      {
        id: "no",
        label: "No",
        imageSrc: "/images/smile_emoji.9d7eadf3.png",
        nextStep: 27,
      },
    ],
  },
  {
    id: 26,
    type: "multi-select",
    question: "Select your medical conditions",
    subtitle:
      "Sharing your other medical conditions helps us create a personalized nutrition plan better",
    nextStep: 27,
    answers: [
      { id: "none", label: "None" },
      { id: "diabetes_type_2", label: "Type 2 Diabetes" },
      { id: "prediabetes", label: "Prediabetes" },
      { id: "diabetes_type_1", label: "Type 1 Diabetes" },
      { id: "high_blood_pressure", label: "High Blood Pressure" },
      { id: "heart_diseases", label: "Heart Diseases" },
      { id: "high_cholesterol", label: "High Cholesterol" },
      { id: "gastritis", label: "Gastritis" },
      { id: "irritable_bowel_syndrome", label: "Irritable Bowel Syndrome" },
      { id: "chronic_kidney_disease", label: "Chronic Kidney Disease" },
      {
        id: "gastroesophageal_reflux_disease",
        label: "Gastroesophegeal Reflux Disease",
      },
      { id: "anemia", label: "Anemia" },
      { id: "hypothyroidism", label: "Hypothyroidism" },
      { id: "hyperthyroidism", label: "Hyperthyroidism" },
    ],
  },
  {
    id: 27,
    type: "single-select",
    question: "Do you have a special event you’re getting ready for?",
    subtitle:
      "Having a goal in mind can help you stay motivated and on track",
    autoAdvance: true,
    nextStep: 28,
    answers: [
      {
        id: "vacation",
        label: "Vacation",
        imageSrc: "/images/world_map_emoji.f10d2f0b.png",
      },
      {
        id: "wedding",
        label: "Wedding",
        imageSrc: "/images/clinking_glasses_emoji.7ccc8ebc.png",
      },
      {
        id: "sports_event",
        label: "Sports event",
        imageSrc: "/images/man_running_emoji.ba4c64c9.png",
      },
      {
        id: "beach_trip",
        label: "Beach trip",
        imageSrc: "/images/beach_with_umbrella_emoji.eb5d7fd9.png",
      },
      {
        id: "reunion",
        label: "Reunion",
        imageSrc: "/images/party_popper_emoji.2d0a50c9.png",
      },
      {
        id: "family_gathering",
        label: "Family gathering",
        imageSrc: "/images/two_hearts_emoji.af8c3ed6.png",
      },
      {
        id: "other",
        label: "Other",
        imageSrc: "/images/interested_emoji.96772adf.png",
      },
      {
        id: "no",
        label: "No",
        imageSrc: "/images/cross_mark_emoji.adf7772d.png",
      },
    ],
  },
  {
    id: 28,
    type: "info",
    question: "event_date",
    nextStep: 29,
  },
  {
    id: 29,
    type: "info",
    question: "weight_loss_forecast",
    nextStep: 30,
  },
  {
    id: 30,
    type: "info",
    question: "wellness_summary",
    nextStep: 31,
  },
  {
    id: 31,
    type: "email-input",
    question: "Where should we send your personalised plan?",
    subtitle: "Join 2M+ people who improved their health with MyBody.",
    inputPlaceholder: "Enter your email address",
    nextStep: 32,
  },
];

