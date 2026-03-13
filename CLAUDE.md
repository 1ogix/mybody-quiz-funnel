# MyBody Quiz Funnel — CLAUDE.md

## Project Overview
Pixel-close replication of https://mybody.health/startnow/uni-s-mb-pbp-sugar.
App Router funnel with query-based quiz URLs and funnel-specific aliases.

**Stack**: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4  
**Location**: `/Users/alananthonyrubi/Documents/DEVELOPMENT/Projects/WebApp/mybody-quiz-funnel`  
**Dev**: `npm run dev` -> http://localhost:3000

---

## Routing (Current)

### Canonical pages
- `/startnow/uni-s-mb-pbp-sugar` -> landing page
- `/quiz/uni-s-mb-pbp-sugar` -> quiz entry (`gender`)
- `/quiz/uni-s-mb-pbp-sugar?question=...` -> question-based quiz routing
- `/email/uni-s-mb-pbp-sugar` -> email step
- `/loader/uni-s-mb-pbp-sugar?code=e9950628ffe65fe29a7060e6407a3b25` -> loader
- `/checkout/uni-s-mb-pbp-sugar?code=e9950628ffe65fe29a7060e6407a3b25` -> checkout/offer
- `/checkout/result` -> results alias page

### Backward compatibility / aliases
- `/quiz/uni-s-mb-pbp-sugar/[step]` redirects to canonical query route
- `/loading-screen` redirects to `/loader/uni-s-mb-pbp-sugar?code=...`

---

## Architecture

```
src/
  app/
    page.tsx                                   <- redirect -> /startnow/uni-s-mb-pbp-sugar
    startnow/uni-s-mb-pbp-sugar/page.tsx       <- landing + first selection
    quiz/uni-s-mb-pbp-sugar/page.tsx           <- resolves search param ?question=
    quiz/uni-s-mb-pbp-sugar/[step]/page.tsx    <- legacy step redirect
    email/uni-s-mb-pbp-sugar/page.tsx          <- email step route
    loader/uni-s-mb-pbp-sugar/page.tsx         <- animated loader -> checkout
    checkout/uni-s-mb-pbp-sugar/page.tsx       <- checkout/offer alias
    checkout/result/page.tsx                   <- result alias
    loading-screen/page.tsx                    <- redirect alias to /loader
    results/page.tsx                           <- results UI
    offer/page.tsx                             <- offer UI
    globals.css                                <- theme tokens + global utilities

  components/
    quiz/
      FunnelStepPage.tsx                       <- main quiz renderer + nav
      QuizOptionCard.tsx                       <- single-select option cards
      BodyGoalsQuestion.tsx                    <- custom body_goals layout
      StudiesProveQuestion.tsx                 <- studies_prove info step
      HeightQuestion.tsx                       <- custom height step (ft/cm)
      WeightQuestion.tsx                       <- custom current weight step (lb/kg + BMI callout)
      TargetWeightQuestion.tsx                 <- target weight step (kg)
      AgeQuestion.tsx                          <- age input step + explanatory card
      WeightChangesQuestion.tsx                <- chart info step using current/target weights
      MealsPerDayQuestion.tsx                  <- custom meals_per_day selections + callout
      ActivityLevelQuestion.tsx                <- custom activity_level options + dynamic message
      LastTimeFeltGoodQuestion.tsx             <- custom wellness milestone options
      PerfectSolutionQuestion.tsx              <- solution expectation options
      CookingTimeQuestion.tsx                  <- cooking time options + note card
      FoodPreferencesQuestion.tsx              <- shared multi-select UI for allergies/nonos
      SpecialistsQuestion.tsx                  <- specialists info card list
      MedicalConditionsQuestion.tsx            <- conditions multi-select + disclaimer
      EventDateQuestion.tsx                    <- event date input step
      WeightLossForecastQuestion.tsx           <- dynamic forecast info/chart step
      TrustedByMany.tsx                        <- trusted_by_many info step
      MultiSelect.tsx / NumberInput.tsx / EmailInput.tsx

  data/
    funnelRoutes.ts                            <- slug/code constants + route helpers
                                                + question order + progress calculation
    quizConfig.ts                              <- implemented funnel steps/questions
```

---

## Question URL Model

`src/data/funnelRoutes.ts` defines:
- `FUNNEL_QUESTION_ORDER` (currently aligned to ~28-question funnel ordering)
- `getStepIdFromQuestion(question)` (maps query key -> implemented renderer step)
- `getProgressPercentForQuestion(question)` (progress based on question index, not 8-step hardcode)
- route builders (`getQuizPathForStep`, `getLoaderPath`, `getCheckoutPath`)

This means progress and URL identity are driven by question keys, while rendering can still fallback to currently implemented step components.

---

## Implemented Funnel Screens (Current UI)

These are currently implemented with real UI:
1. `gender` (single select, auto-advance)
2. `trusted_by_many` (info screen)
3. `main_goal` (single select)
4. `body_goals` (custom multi-select + body image + connector SVGs)
5. `studies_prove` (image + proof/callout card + next)
6. `height` (FT/CM segmented numeric input)
7. `weight` (LB/KG segmented numeric input + dynamic BMI message)
8. `target_weight` (kg numeric input)
9. `age` (single numeric age input + explanatory card)
10. `weight_changes` (chart info step with dynamic labels from current/target weight)
11. `last_time_felt_good` (single-select)
12. `meals_per_day` (single-select with contextual success card)
13. `activity_level` (single-select with contextual activity card)
14. `perfect_solution` (single-select)
15. `cooking_time` (single-select with help card)
16. `have_allergies` (single-select branching)
17. `allergies` (custom multi-select; exclusive `None`, auto-advance)
18. `omit_nonos` (custom multi-select; exclusive `I eat them all`, auto-advance)
19. `specialists` (info screen with specialist cards)
20. `do_you_have_medical_conditions` (single-select branching)
21. `what_medical_conditions` (custom multi-select + disclaimer + sticky footer CTA)
22. `special_event` (single-select, auto-advance)
23. `event_date` (date input)
24. `weight_loss_forecast` (dynamic forecast values from prior answers)
25. email step (`/email/uni-s-mb-pbp-sugar`)

Additional question keys are registered in `FUNNEL_QUESTION_ORDER` and route mapping, but many still resolve to fallback implemented screens until dedicated UI is built.

---

## Body Goals Specific Notes

`?question=body_goals` is customized to match live DOM structure:
- container uses section-variable class pattern (inline Tailwind utility string in `FunnelStepPage.tsx`)
- option rows include connector SVGs
- connector color changes on selection
- body image switches by selected gender:
  - female -> `public/images/woman_body.png`
  - male -> `public/images/man_body.png`

Main files:
- `src/components/quiz/BodyGoalsQuestion.tsx`
- `src/components/quiz/FunnelStepPage.tsx`

---

## Weight + Forecast Notes

- `?question=weight` uses `WeightQuestion.tsx`:
  - segmented `LB/KG`
  - input typography set to `text-[3rem] font-semibold`
  - dynamic BMI callout appears after value entry, computed from saved height (`step 6`) + current weight
  - height parser accepts `cm`, `ft/in`, apostrophe format (`5'9`) and numeric-cm fallback for older stored values
- `?question=target_weight` uses `TargetWeightQuestion.tsx`:
  - kg-only numeric input
  - input typography set to `text-[3rem] font-semibold`
  - dynamic warning card appears when target BMI is outside healthy range (not hardcoded)
- `?question=weight_changes` uses `WeightChangesQuestion.tsx`:
  - info/chart step
  - badge values are derived from previously entered current and target weights
- `?question=weight_loss_forecast` uses `WeightLossForecastQuestion.tsx`:
  - dynamic month labels + weight labels from current weight, target weight, and event date
  - dynamic "goal by" date from `event_date`

---

## Styling / Tokens

- Tailwind v4 style: tokens live in `src/app/globals.css` under `@theme`
- Extended token set now includes additional banner colors, neutral aliases, font-weight vars, and border-radius vars
- Primary interactive color usage in components is currently based on `--color-primary-main` (`#027aff` in current theme)

---

## Persistence

`src/hooks/useQuizState.ts`:
- localStorage key: `mybody_quiz_state`
- step/session TTL: 3 minutes
- offer TTL: 12 hours
- stores answers by numeric step key

---

## Current Status

- [x] Query-based quiz routing (`?question=...`)
- [x] Legacy route redirects preserved
- [x] Email/loader/checkout funnel aliases added
- [x] Question-order-based progress calculation (no fixed 8-step progress map)
- [x] `main_goal` and `body_goals` DOM IDs/test IDs aligned with live structure
- [x] `body_goals` custom connectors + gender-specific body image
- [x] Mid-funnel custom screens added (`meals_per_day`, `activity_level`, `perfect_solution`, `cooking_time`)
- [x] Allergy/nonos flow implemented with exclusive multi-select behavior + auto-advance
- [x] Medical flow implemented (`specialists`, `do_you_have_medical_conditions`, `what_medical_conditions`, `special_event`, `event_date`)
- [x] `studies_prove`, `height`, `weight`, `target_weight`, `age`, `weight_changes`, `weight_loss_forecast` implemented with dedicated components
- [x] Dynamic BMI feedback on `weight` (not hardcoded)
- [x] Dynamic target-weight health-range warning on `target_weight` (not hardcoded)
- [x] Dynamic current/target labels wired into `weight_changes` chart
- [x] Dynamic forecast values wired into `weight_loss_forecast`
- [ ] Full ~28-question UI parity (many question keys still need dedicated screens)
- [ ] Complete visual parity QA for all breakpoints

---

## Next Session (Info Only)

- First task for tomorrow: set next route after `?question=weight_loss_forecast` to `?question=wellness_summary`.
- Note: documentation-only reminder; route behavior not changed in this update.
