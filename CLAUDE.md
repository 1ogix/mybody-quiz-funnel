# MyBody Quiz Funnel — Handover Guide

This file is for the next developer taking ownership of the project.

## Overview

Pixel-close implementation of the MyBody funnel:
`https://mybody.health/startnow/uni-s-mb-pbp-sugar`

- Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, React 19
- Local dev: `npm run dev` -> `http://localhost:3000`
- Root path: `/Users/alananthonyrubi/Documents/DEVELOPMENT/Projects/WebApp/mybody-quiz-funnel`

## Quick Start

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run start
```

## Source of Truth (Read This First)

When updating flow logic, these files matter most:

1. `src/data/funnelRoutes.ts`
   - canonical route constants
   - `FUNNEL_QUESTION_ORDER`
   - question <-> step mapping
   - route helpers (`getQuizPathForStep`, `getLoaderPath`, `getCheckoutPath`)
   - progress calculation (`getProgressPercentForQuestion`)
2. `src/data/quizConfig.ts`
   - step configs (`funnelSteps`)
   - per-step branching with `nextStep`
3. `src/components/quiz/FunnelStepPage.tsx`
   - orchestration and renderer selection for standard/custom steps
4. `src/hooks/useQuizState.ts`
   - state persistence, TTLs, and storage key behavior

## Routing Model

### Canonical pages

- `/startnow/uni-s-mb-pbp-sugar`
- `/quiz/uni-s-mb-pbp-sugar`
- `/quiz/uni-s-mb-pbp-sugar?question=<question_key>`
- `/email/uni-s-mb-pbp-sugar`
- `/loader/uni-s-mb-pbp-sugar?code=e9950628ffe65fe29a7060e6407a3b25`
- `/checkout/uni-s-mb-pbp-sugar?code=e9950628ffe65fe29a7060e6407a3b25`
- `/checkout/result`

### Legacy aliases kept for compatibility

- `/quiz/uni-s-mb-pbp-sugar/[step]` -> redirects to query route
- `/loading-screen` -> redirects to loader route

## End-to-End User Workflow

1. Start on `/startnow/uni-s-mb-pbp-sugar`
2. Enter quiz at `/quiz/uni-s-mb-pbp-sugar` (defaults to `gender`)
3. Navigate each question via `?question=<question_key>`
4. Move to `/email/uni-s-mb-pbp-sugar`
5. Continue to loader route with funnel code
6. Auto-forward to checkout route with same code
7. Keep `/checkout/result` as result alias

## Project Structure

```text
src/
  app/
    page.tsx                                   # redirect -> /startnow/uni-s-mb-pbp-sugar
    startnow/uni-s-mb-pbp-sugar/page.tsx
    quiz/uni-s-mb-pbp-sugar/page.tsx
    quiz/uni-s-mb-pbp-sugar/[step]/page.tsx    # legacy redirect route
    email/uni-s-mb-pbp-sugar/page.tsx
    loader/uni-s-mb-pbp-sugar/page.tsx
    checkout/uni-s-mb-pbp-sugar/page.tsx
    checkout/result/page.tsx
    loading-screen/page.tsx                     # alias redirect
    globals.css                                 # theme tokens + utilities

  components/quiz/
    FunnelStepPage.tsx
    QuizOptionCard.tsx
    BodyGoalsQuestion.tsx
    StudiesProveQuestion.tsx
    HeightQuestion.tsx
    WeightQuestion.tsx
    TargetWeightQuestion.tsx
    AgeQuestion.tsx
    WeightChangesQuestion.tsx
    LastTimeFeltGoodQuestion.tsx
    MealsPerDayQuestion.tsx
    ActivityLevelQuestion.tsx
    PerfectSolutionQuestion.tsx
    CookingTimeQuestion.tsx
    FoodPreferencesQuestion.tsx
    SpecialistsQuestion.tsx
    MedicalConditionsQuestion.tsx
    EventDateQuestion.tsx
    WeightLossForecastQuestion.tsx
    TrustedByMany.tsx
    MultiSelect.tsx / NumberInput.tsx / EmailInput.tsx

  data/
    funnelRoutes.ts
    quizConfig.ts

  hooks/
    useQuizState.ts
```

## Implemented Custom Screens

These question keys currently have dedicated UI implementations:

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
- `wellness_summary`
- email step page

Other question keys can still resolve through shared/fallback rendering.

## Important Implementation Notes

### Progress and routing invariants

- Progress bar is based on question key index in `FUNNEL_QUESTION_ORDER`.
- If you add/reorder question keys, validate progress behavior across full flow.
- Keep question-key mapping and step mapping in sync.

### State persistence

In `useQuizState`:

- localStorage key: `mybody_quiz_state`
- step/session TTL: 3 minutes
- offer TTL: 12 hours
- answers are stored by numeric step ID

### Known step-specific behavior

- `body_goals`:
  - custom connector SVG visuals
  - gender-aware body image (`woman_body.png` / `man_body.png`)
- `weight`:
  - LB/KG segmented input
  - dynamic BMI callout based on saved height
  - height parser supports multiple formats (`cm`, `ft/in`, `5'9`)
- `target_weight`:
  - kg-only input
  - dynamic health-range warning (BMI based)
- `weight_changes` and `weight_loss_forecast`:
  - derive labels and chart values from prior answers

## Workflow for Adding or Modifying a Question

1. Add/update question key in `FUNNEL_QUESTION_ORDER` (`funnelRoutes.ts`)
2. Update step mappings in `STEP_QUESTION_BY_ID` and `QUESTION_STEP_MAP`
3. Ensure `funnelSteps` has correct `nextStep` and branching in `quizConfig.ts`
4. Build a custom component in `src/components/quiz/` when needed
5. Register rendering logic in `FunnelStepPage.tsx`
6. Verify manually:
   - direct URL entry via `?question=<key>`
   - back/forward behavior
   - progress %
   - localStorage persistence and expiration behavior
   - alias redirects

## Design/Styling Notes

- Theme tokens live in `src/app/globals.css` under `@theme`
- Primary interactive color token: `--color-primary-main` (`#027aff`)
- Funnel attempts to stay pixel-close to live reference DOM and spacing

## Current Status and Remaining Work

Completed:

- query-based routing and redirects
- loader/checkout/email route integration
- progress by question order (not legacy fixed map)
- major mid-funnel custom steps
- dynamic BMI + weight forecast logic
- `weight_loss_forecast` -> `wellness_summary` flow wiring

Remaining:

- full visual parity QA across breakpoints
- dedicated custom UI for all remaining fallback question keys
- regression test pass on full funnel (manual, since no test suite is configured)

## Ownership Transfer Notes

- This codebase is stable enough for continued iteration but not feature-complete for full UI parity.
- Prioritize preserving URL/question-key compatibility to avoid breaking in-flight campaigns.
- Treat `funnelRoutes.ts` as the primary contract file before making any funnel sequence changes.
