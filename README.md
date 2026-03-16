# MyBody Quiz Funnel

Pixel-close implementation of the MyBody funnel for `uni-s-mb-pbp-sugar` using Next.js App Router and query-based quiz URLs.

## Tech Stack

- `next@16` (App Router)
- `react@19`, `typescript@5`
- `tailwindcss@4`
- `framer-motion`

## Current Funnel Routes

### Canonical routes

- Landing: `/startnow/uni-s-mb-pbp-sugar`
- Quiz entry: `/quiz/uni-s-mb-pbp-sugar`
- Quiz question routing: `/quiz/uni-s-mb-pbp-sugar?question=<question_key>`
- Email step: `/email/uni-s-mb-pbp-sugar`
- Loader: `/loader/uni-s-mb-pbp-sugar?code=e9950628ffe65fe29a7060e6407a3b25`
- Checkout: `/checkout/uni-s-mb-pbp-sugar?code=e9950628ffe65fe29a7060e6407a3b25`
- Checkout alias: `/checkout/result`

### Backward-compatible aliases

- `/quiz/uni-s-mb-pbp-sugar/[step]` -> redirects to canonical query route
- `/loading-screen` -> redirects to loader route

## What Was Updated

The funnel now supports an expanded question flow with query-key routing, question-order-based progress, and dedicated UI components for most core screens.

### Routing and flow changes

- Added canonical funnel route helpers in `src/data/funnelRoutes.ts`
- Added ordered question model via `FUNNEL_QUESTION_ORDER`
- Progress is now derived from question key position (not fixed 8-step mapping)
- Added aliases/redirects for legacy route compatibility

### Implemented question screens (dedicated UI)

- `gender`
- `trusted_by_many`
- `main_goal`
- `body_goals`
- `studies_prove`
- `height`
- `weight`
- `target_weight`
- `age`
- `weight_changes`
- `last_time_felt_good_about_weight`
- `meals_per_day`
- `activity_level`
- `perfect_solution`
- `cooking_time`
- `have_allergies`
- `allergies`
- `omit_nonos`
- `specialists`
- `do_you_have_medical_conditions`
- `what_medical_conditions`
- `special_event`
- `event_date`
- `weight_loss_forecast`
- email page

## Workflow

## 1) User journey workflow

1. User lands on `/startnow/uni-s-mb-pbp-sugar`.
2. Funnel transitions to `/quiz/uni-s-mb-pbp-sugar` (default question: `gender`).
3. Each step navigates using `?question=<question_key>`.
4. After quiz completion, flow moves to `/email/uni-s-mb-pbp-sugar`.
5. Submission goes to loader: `/loader/...?...code=<funnel_code>`.
6. Loader transitions to checkout: `/checkout/...?...code=<funnel_code>`.
7. Checkout/result alias remains available at `/checkout/result`.

## 2) State and persistence workflow

- Hook: `src/hooks/useQuizState.ts`
- Local storage key: `mybody_quiz_state`
- Quiz/session TTL: 3 minutes
- Offer persistence TTL: 12 hours
- Answers are stored by numeric step ID

## 3) Development workflow

### Setup

```bash
npm install
```

### Run locally

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

### Production validation

```bash
npm run build
npm run start
```

## 4) Workflow for adding/updating a question

1. Add/update question key order in `FUNNEL_QUESTION_ORDER` in `src/data/funnelRoutes.ts`.
2. Map question key <-> step ID in `STEP_QUESTION_BY_ID` and `QUESTION_STEP_MAP`.
3. Ensure `funnelSteps` in `src/data/quizConfig.ts` has the expected flow (`nextStep`, branching).
4. Add/update dedicated component in `src/components/quiz/` if custom UI is needed.
5. Wire custom rendering logic in `src/components/quiz/FunnelStepPage.tsx`.
6. Validate progress, persistence behavior, and forward/backward navigation manually.

## Project Structure

```text
src/
  app/
    startnow/uni-s-mb-pbp-sugar/page.tsx
    quiz/uni-s-mb-pbp-sugar/page.tsx
    quiz/uni-s-mb-pbp-sugar/[step]/page.tsx
    email/uni-s-mb-pbp-sugar/page.tsx
    loader/uni-s-mb-pbp-sugar/page.tsx
    checkout/uni-s-mb-pbp-sugar/page.tsx
    checkout/result/page.tsx
    loading-screen/page.tsx
  components/quiz/
    FunnelStepPage.tsx
    QuizOptionCard.tsx
    BodyGoalsQuestion.tsx
    HeightQuestion.tsx
    WeightQuestion.tsx
    TargetWeightQuestion.tsx
    AgeQuestion.tsx
    WeightChangesQuestion.tsx
    MealsPerDayQuestion.tsx
    ActivityLevelQuestion.tsx
    FoodPreferencesQuestion.tsx
    MedicalConditionsQuestion.tsx
    EventDateQuestion.tsx
    WeightLossForecastQuestion.tsx
  data/
    funnelRoutes.ts
    quizConfig.ts
  hooks/
    useQuizState.ts
```

## Known Status

- Query-based routing is active and stable
- Legacy route aliases are preserved
- Dynamic BMI and target-range feedback are implemented
- Forecast and chart-style steps are wired to prior answers
- Full visual parity and all dedicated screens are still in progress for remaining question keys
