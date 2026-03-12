"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { funnelSteps } from "@/data/quizConfig";
import { useQuizState } from "@/hooks/useQuizState";
import QuizHeader from "@/components/layout/QuizHeader";
import QuizOptionCard from "@/components/quiz/QuizOptionCard";
import MultiSelect from "@/components/quiz/MultiSelect";
import NumberInput from "@/components/quiz/NumberInput";
import EmailInput from "@/components/quiz/EmailInput";
import TrustedByMany from "@/components/quiz/TrustedByMany";
import BodyGoalsQuestion from "@/components/quiz/BodyGoalsQuestion";
import {
  getProgressPercentForQuestion,
  getQuestionFromStepId,
  getLoaderPath,
  getQuizPathForStep,
  QUIZ_BASE_PATH,
  STARTNOW_PATH,
} from "@/data/funnelRoutes";

const EMAIL_STEP_ID = 8;

interface FunnelStepPageProps {
  stepId: number;
  activeQuestionKey?: string;
}

export default function FunnelStepPage({
  stepId,
  activeQuestionKey,
}: FunnelStepPageProps) {
  const router = useRouter();
  const { answers, setAnswer, goToStep, hydrated } = useQuizState();

  const step = funnelSteps.find((s) => s.id === stepId);

  useEffect(() => {
    if (!hydrated) return;
    if (!step) {
      router.replace(QUIZ_BASE_PATH);
    }
  }, [hydrated, router, step]);

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
  const selectedAnswer =
    typeof currentAnswer === "string" ? currentAnswer : undefined;
  const selectedAnswers = Array.isArray(currentAnswer) ? currentAnswer : [];

  function handleAnswer(value: string | string[]) {
    setAnswer(currentStep.id, value);
  }

  function handleNext() {
    const nextStepId = currentStep.nextStep ?? currentStep.id + 1;
    goToStep(nextStepId);

    if (nextStepId > EMAIL_STEP_ID) {
      router.push(getLoaderPath());
      return;
    }

    router.push(getQuizPathForStep(nextStepId));
  }

  function handleBack() {
    if (currentStep.id <= 1) {
      router.push(STARTNOW_PATH);
      return;
    }

    router.push(getQuizPathForStep(currentStep.id - 1));
  }

  const fallbackQuestionKey =
    getQuestionFromStepId(currentStep.id) ?? `step-${currentStep.id}`;
  const stepQuestionKey = activeQuestionKey ?? fallbackQuestionKey;
  const progress = getProgressPercentForQuestion(stepQuestionKey);
  const isBodyGoals = stepQuestionKey === "body_goals";
  const selectedGender = answers[1] === "male" ? "male" : "female";
  const questionContainerClass = isBodyGoals
    ? "[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-[var(--section-container-gutter-internal)] mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] w-full pb-10 pt-6 [--section-container-width:37rem] tablet:py-16 tablet:[--section-container-width:21.4rem]"
    : "mx-auto w-full max-w-[calc(37rem+2*1rem)] px-4 tablet:max-w-[calc(37rem+2*2rem)] tablet:px-8 pb-10 pt-6 tablet:py-16";

  return (
    <div className="flex min-h-screen flex-col">
      <QuizHeader progress={progress} showBack onBack={handleBack} />

      <main className="w-full">
        <div
          data-testid={`quiz__question-${stepQuestionKey}`}
        >
          <div className="h-[inherit] animate-fade-in">
            <div className={questionContainerClass}>
              {currentStep.type !== "info" && (
                <div className="mb-4 flex flex-col-reverse gap-4">
                  <p
                    id={`quiz__subtitle-${stepQuestionKey}--question-with-title`}
                    className="body-large"
                    style={{ color: "var(--color-secondary-800)" }}
                  >
                    {currentStep.subtitle}
                  </p>
                  <h1
                    id={`quiz__title-${stepQuestionKey}--question-with-title`}
                    className="overflow body-large break-words font-semibold"
                    style={{ color: "var(--color-secondary-main)" }}
                  >
                    {currentStep.question}
                  </h1>
                </div>
              )}

              {currentStep.type === "single-select" && currentStep.answers && (
                <div className="flex w-full min-w-[50%] flex-col gap-2">
                  {currentStep.answers.map((answer) => (
                    <QuizOptionCard
                      key={answer.id}
                      id={`quiz__option-${answer.id}-${stepQuestionKey}--single-question`}
                      testId={`quiz__option-${answer.id}-${stepQuestionKey}--single-question`}
                      label={answer.label}
                      emoji={answer.emoji}
                      selected={selectedAnswer === answer.id}
                      onClick={() => {
                        handleAnswer(answer.id);
                        if (currentStep.autoAdvance) {
                          setTimeout(() => handleNext(), 200);
                        }
                      }}
                    />
                  ))}
                </div>
              )}

              {currentStep.type === "multi-select" && currentStep.answers && (
                <>
                  {isBodyGoals ? (
                    <BodyGoalsQuestion
                      answers={currentStep.answers}
                      selected={selectedAnswers}
                      gender={selectedGender}
                      onToggle={(id) => {
                        const next = selectedAnswers.includes(id)
                          ? selectedAnswers.filter((a) => a !== id)
                          : [...selectedAnswers, id];
                        handleAnswer(next);
                      }}
                      onNext={handleNext}
                    />
                  ) : (
                    <MultiSelect
                      answers={currentStep.answers}
                      selected={selectedAnswers}
                      onToggle={(id) => {
                        const next = selectedAnswers.includes(id)
                          ? selectedAnswers.filter((a) => a !== id)
                          : [...selectedAnswers, id];
                        handleAnswer(next);
                      }}
                      onNext={handleNext}
                    />
                  )}
                </>
              )}

              {currentStep.type === "number-input" && (
                <NumberInput
                  placeholder={currentStep.inputPlaceholder}
                  unit={currentStep.inputUnit}
                  min={currentStep.inputMin}
                  max={currentStep.inputMax}
                  onNext={(val) => {
                    handleAnswer(val);
                    handleNext();
                  }}
                />
              )}

              {currentStep.type === "email-input" && (
                <EmailInput
                  onNext={(email) => {
                    handleAnswer(email);
                    handleNext();
                  }}
                />
              )}

              {currentStep.type === "info" && currentStep.question === "trusted_by_many" && (
                <TrustedByMany
                  gender={typeof answers[1] === "string" ? answers[1] : "female"}
                  onNext={handleNext}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
