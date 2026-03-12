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
      TrustedByMany.tsx                        <- info step
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
5. `studies_prove`
6. `height`
7. `weight`
8. email step (`/email/uni-s-mb-pbp-sugar`)

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
- [ ] Full ~28-question UI parity (many question keys still need dedicated screens)
- [ ] Complete visual parity QA for all breakpoints
