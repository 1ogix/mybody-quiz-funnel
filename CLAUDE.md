# MyBody Quiz Funnel — CLAUDE.md

## Project Overview
Pixel-close replication of https://mybody.health/startnow/uni-s-mb-pbp-sugar
A multi-step health quiz funnel for A1C/blood sugar management.

**Stack**: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion

**Location**: `/Users/alananthonyrubi/Documents/DEVELOPMENT/Projects/WebApp/mybody-quiz-funnel`

**Dev**: `npm run dev` → http://localhost:3000

---

## Design Tokens (extracted from live site)

### Font
- Family: **Poppins** (400, 500, 600, 700) via `next/font/google`
- Loaded in `src/app/layout.tsx`

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `primary-main` | `#087295` | Buttons, progress bar, links |
| `primary-600` | `#6baabf` | Button hover |
| `primary-200` | `#cee3ea` | Selected answer bg |
| `primary-100` | `#e6f1f4` | Light tint, hero bg |
| `secondary-main` | `#1c3035` | Headings, dark text |
| `success-main` | `#448d3e` | Checkmarks, positive states |
| `text-primary` | `#333333` | Body text |
| `text-muted` | `#6b7280` | Subtitles, captions |

All tokens defined as CSS custom properties in `src/app/globals.css` under `@theme {}`.

### Button spec
- Height: 48px (`h-12`)
- Border radius: 12px
- Border: 1.5px solid
- Default: `#087295` bg, white text
- Hover: `#6baabf` bg
- Active: scale 0.98

---

## Architecture

```
src/
  app/
    layout.tsx              ← Poppins font, theme-color meta (#087295)
    page.tsx                ← redirect → /quiz/1
    quiz/[step]/page.tsx    ← dynamic quiz step renderer
    loading-screen/page.tsx ← animated "analyzing" screen (4s → /results)
    results/page.tsx        ← plan summary + CTA to /offer
    offer/page.tsx          ← 3 pricing cards + order CTA
    globals.css             ← Tailwind v4 @theme tokens + fade-in animation

  components/
    layout/
      Header.tsx            ← logo + optional back arrow (sticky)
    quiz/
      QuizStep.tsx          ← orchestrator: routes to correct input type
      SingleSelect.tsx      ← renders answer buttons for single-choice steps
      MultiSelect.tsx       ← multi-choice with Continue button
      AnswerButton.tsx      ← shared styled option button
      NumberInput.tsx       ← numeric input with lbs/kg toggle
      EmailInput.tsx        ← email field with validation + trust badge
      ProgressBar.tsx       ← animated top bar (1px, teal fill)
    ui/
      Button.tsx            ← primary/secondary CTA button

  data/
    quizConfig.ts           ← all 8 steps, questions, answers, progress %

  hooks/
    useQuizState.ts         ← localStorage persistence
                               · Step TTL: 3 minutes
                               · Offer TTL: 12 hours

  types/
    quiz.ts                 ← QuizStep, Answer, QuizState, QuizAnswers
```

---

## Quiz Flow

| Step | Route | Type | Question |
|------|-------|------|----------|
| 1 | `/quiz/1` | single-select (auto-advance) | Select your A1C levels |
| 2 | `/quiz/2` | single-select (auto-advance) | What is your main goal? |
| 3 | `/quiz/3` | single-select (auto-advance) | How old are you? |
| 4 | `/quiz/4` | single-select (auto-advance) | What is your gender? |
| 5 | `/quiz/5` | single-select (auto-advance) | How active are you? |
| 6 | `/quiz/6` | number-input | How much do you weigh? |
| 7 | `/quiz/7` | multi-select | What is your biggest challenge? |
| 8 | `/quiz/8` | email-input | Where should we send your plan? |
| — | `/loading-screen` | animated | Analyzing answers (4s timer) |
| — | `/results` | static | Plan summary + CTA |
| — | `/offer` | interactive | Select plan + order |

Auto-advance steps navigate after 200ms delay to allow selected state to visually show.

---

## Key Implementation Notes

### Auto-advance stale closure fix
`handleNext` in `quiz/[step]/page.tsx` accepts an optional `freshAnswer` param.
When auto-advancing, `QuizStep.tsx` passes the answer ID directly:
```ts
setTimeout(() => onNext(id), 200)
```
This avoids reading stale React state in the closure.

### Tailwind v4
No `tailwind.config.ts` — all custom tokens live in `src/app/globals.css` under `@theme {}`.
Custom colors are accessed via `bg-[#087295]` inline or CSS vars like `var(--color-primary-main)`.

### Images
Hero image on Step 1 uses Unsplash placeholder. Swap for real assets later.
`next.config.ts` allows `images.unsplash.com` as remote pattern.

### Offer page pricing pattern (matches SOP)
Three plans: 7-day / 1-month (MOST POPULAR) / 3-month.
Price shown as large `$0` + small `.51` + `per day` — implemented inline in `offer/page.tsx`.
Fine print dynamically shows the selected plan's sale price.

---

## Current Status (MVP)

- [x] Design tokens applied (font, colors, radii)
- [x] All 8 quiz steps functional
- [x] Auto-advance on single-select
- [x] Number input with lbs/kg toggle
- [x] Email capture with validation
- [x] Loading screen (animated, 4s, then routes to results)
- [x] Results page
- [x] Offer/pricing page (3 cards, MOST POPULAR badge, strikethrough prices)
- [x] localStorage persistence (3min quiz, 12h offer)
- [x] Back navigation between steps
- [ ] Step transition animations (slide-left)
- [ ] Mobile viewport QA (375px)
- [ ] Visual QA against live site
- [ ] Real hero images (currently Unsplash placeholder)
- [ ] Offer page — actual order flow / payment integration
