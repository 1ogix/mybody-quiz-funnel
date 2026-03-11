"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { quizSteps, PROGRESS_PERCENTS } from "@/data/quizConfig";
import { useQuizState } from "@/hooks/useQuizState";
import Header from "@/components/layout/Header";
import ProgressBar from "@/components/quiz/ProgressBar";
import QuizStep from "@/components/quiz/QuizStep";

interface PageProps {
  params: Promise<{ step: string }>;
}

export default function QuizStepPage({ params }: PageProps) {
  const { step: stepParam } = use(params);
  const stepId = parseInt(stepParam, 10);
  const router = useRouter();
  const { answers, setAnswer, goToStep, hydrated } = useQuizState();

  const step = quizSteps.find((s) => s.id === stepId);

  useEffect(() => {
    if (!hydrated) return;
    if (!step) {
      router.replace("/quiz/1");
    }
  }, [hydrated, step, router]);

  if (!step || !hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
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

  // Accepts optional freshAnswer to avoid stale-closure issues with auto-advance
  function handleNext(freshAnswer?: string | string[]) {
    const answer = freshAnswer ?? currentAnswer;
    let nextStepId: number;

    if (typeof answer === "string" && currentStep.answers) {
      const match = currentStep.answers.find((a) => a.id === answer);
      nextStepId = match?.nextStep ?? currentStep.nextStep ?? currentStep.id + 1;
    } else {
      nextStepId = currentStep.nextStep ?? currentStep.id + 1;
    }

    goToStep(nextStepId);

    if (nextStepId > quizSteps.length) {
      router.push("/loading-screen");
    } else {
      router.push(`/quiz/${nextStepId}`);
    }
  }

  const progress = PROGRESS_PERCENTS[currentStep.id] ?? 50;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header showBack={currentStep.id > 1} onBack={() => router.push(`/quiz/${currentStep.id - 1}`)} />
      <ProgressBar percent={progress} />

      <main className="flex-1 flex flex-col quiz-container pt-6 pb-8">
        <QuizStep
          step={currentStep}
          selectedAnswer={selectedAnswer}
          selectedAnswers={selectedAnswers}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}
