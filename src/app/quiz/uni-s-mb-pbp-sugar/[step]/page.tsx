"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { funnelSteps, FUNNEL_PROGRESS } from "@/data/quizConfig";
import { useQuizState } from "@/hooks/useQuizState";
import QuizHeader from "@/components/layout/QuizHeader";
import QuizOptionCard from "@/components/quiz/QuizOptionCard";
import MultiSelect from "@/components/quiz/MultiSelect";
import NumberInput from "@/components/quiz/NumberInput";
import EmailInput from "@/components/quiz/EmailInput";

interface PageProps {
  params: Promise<{ step: string }>;
}

const BASE = "/quiz/uni-s-mb-pbp-sugar";
const LAST_STEP = 7;

export default function FunnelStepPage({ params }: PageProps) {
  const { step: stepParam } = use(params);
  const stepId = parseInt(stepParam, 10);
  const router = useRouter();
  const { answers, setAnswer, goToStep, hydrated } = useQuizState();

  const step = funnelSteps.find((s) => s.id === stepId);

  useEffect(() => {
    if (!hydrated) return;
    if (!step) {
      router.replace(`${BASE}/1`);
    }
  }, [hydrated, step, router]);

  if (!step || !hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "#027aff", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  const currentStep = step;
  const currentAnswer = answers[currentStep.id];
  const selectedAnswer = typeof currentAnswer === "string" ? currentAnswer : undefined;
  const selectedAnswers = Array.isArray(currentAnswer) ? currentAnswer : [];

  function handleAnswer(value: string | string[]) {
    setAnswer(currentStep.id, value);
  }

  function handleNext(freshAnswer?: string | string[]) {
    void freshAnswer; // answers are linear in this funnel
    const nextStepId = currentStep.nextStep ?? currentStep.id + 1;
    goToStep(nextStepId);

    if (nextStepId > LAST_STEP) {
      router.push("/loading-screen");
    } else {
      router.push(`${BASE}/${nextStepId}`);
    }
  }

  function handleBack() {
    if (currentStep.id <= 1) {
      router.push("/startnow/uni-s-mb-pbp-sugar");
    } else {
      router.push(`${BASE}/${currentStep.id - 1}`);
    }
  }

  const progress = FUNNEL_PROGRESS[currentStep.id] ?? 50;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <QuizHeader progress={progress} showBack onBack={handleBack} />

      <main className="flex-1 flex flex-col quiz-container pt-6 pb-8">
        {/* Subtitle above title (flex-col-reverse) */}
        <div className="flex flex-col-reverse mb-6">
          <h1
            className="text-[1.375rem] font-semibold leading-snug"
            style={{ color: "var(--color-secondary-main)" }}
          >
            {currentStep.question}
          </h1>
          {currentStep.subtitle && (
            <p className="text-sm mb-1" style={{ color: "var(--color-text-muted)" }}>
              {currentStep.subtitle}
            </p>
          )}
        </div>

        {/* Single select → card layout */}
        {currentStep.type === "single-select" && currentStep.answers && (
          <div className="flex flex-col gap-3">
            {currentStep.answers.map((answer) => (
              <QuizOptionCard
                key={answer.id}
                label={answer.label}
                emoji={answer.emoji}
                selected={selectedAnswer === answer.id}
                onClick={() => {
                  handleAnswer(answer.id);
                  if (currentStep.autoAdvance) {
                    setTimeout(() => handleNext(answer.id), 200);
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Multi select */}
        {currentStep.type === "multi-select" && currentStep.answers && (
          <MultiSelect
            answers={currentStep.answers}
            selected={selectedAnswers}
            onToggle={(id) => {
              const next = selectedAnswers.includes(id)
                ? selectedAnswers.filter((a) => a !== id)
                : [...selectedAnswers, id];
              handleAnswer(next);
            }}
            onNext={() => handleNext()}
          />
        )}

        {/* Number input */}
        {currentStep.type === "number-input" && (
          <NumberInput
            placeholder={currentStep.inputPlaceholder}
            unit={currentStep.inputUnit}
            min={currentStep.inputMin}
            max={currentStep.inputMax}
            onNext={(val) => {
              handleAnswer(val);
              handleNext(val);
            }}
          />
        )}

        {/* Email input */}
        {currentStep.type === "email-input" && (
          <EmailInput
            onNext={(email) => {
              handleAnswer(email);
              handleNext(email);
            }}
          />
        )}
      </main>
    </div>
  );
}
