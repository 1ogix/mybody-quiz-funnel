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
import StudiesProveQuestion from "@/components/quiz/StudiesProveQuestion";
import HeightQuestion from "@/components/quiz/HeightQuestion";
import WeightQuestion from "@/components/quiz/WeightQuestion";
import TargetWeightQuestion from "@/components/quiz/TargetWeightQuestion";
import AgeQuestion from "@/components/quiz/AgeQuestion";
import WeightChangesQuestion from "@/components/quiz/WeightChangesQuestion";
import LastTimeFeltGoodQuestion from "@/components/quiz/LastTimeFeltGoodQuestion";
import MealsPerDayQuestion from "@/components/quiz/MealsPerDayQuestion";
import ActivityLevelQuestion from "@/components/quiz/ActivityLevelQuestion";
import PerfectSolutionQuestion from "@/components/quiz/PerfectSolutionQuestion";
import CookingTimeQuestion from "@/components/quiz/CookingTimeQuestion";
import FoodPreferencesQuestion from "@/components/quiz/FoodPreferencesQuestion";
import SpecialistsQuestion from "@/components/quiz/SpecialistsQuestion";
import MedicalConditionsQuestion from "@/components/quiz/MedicalConditionsQuestion";
import EventDateQuestion from "@/components/quiz/EventDateQuestion";
import WeightLossForecastQuestion from "@/components/quiz/WeightLossForecastQuestion";
import WellnessSummaryQuestion from "@/components/quiz/WellnessSummaryQuestion";
import {
  getProgressPercentForQuestion,
  getQuestionFromStepId,
  getLoaderPath,
  getQuizPathForStep,
  QUIZ_BASE_PATH,
  STARTNOW_PATH,
} from "@/data/funnelRoutes";

const EMAIL_STEP_ID = 31;

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

  function handleNext(nextStepOverride?: number) {
    const safeNextStepOverride =
      typeof nextStepOverride === "number" && Number.isFinite(nextStepOverride)
        ? nextStepOverride
        : undefined;
    const nextStepId =
      safeNextStepOverride ?? currentStep.nextStep ?? currentStep.id + 1;
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
  const isStudiesProve = stepQuestionKey === "studies_prove";
  const isHeight = stepQuestionKey === "height";
  const isWeight = stepQuestionKey === "weight";
  const isTargetWeight = stepQuestionKey === "target_weight";
  const isAge = stepQuestionKey === "age";
  const isWeightChanges = stepQuestionKey === "weight_changes";
  const isWeightLossForecast = stepQuestionKey === "weight_loss_forecast";
  const isWellnessSummary = stepQuestionKey === "wellness_summary";
  const isLastTimeFeltGood =
    stepQuestionKey === "last_time_felt_good_about_weight";
  const isMealsPerDay = stepQuestionKey === "meals_per_day";
  const isActivityLevel = stepQuestionKey === "activity_level";
  const isPerfectSolution = stepQuestionKey === "perfect_solution";
  const isWaterIntake = stepQuestionKey === "water_intake";
  const isCookingTime = stepQuestionKey === "cooking_time";
  const isAllergies = stepQuestionKey === "allergies";
  const isOmitNonos = stepQuestionKey === "omit_nonos";
  const isSpecialists = stepQuestionKey === "specialists";
  const isWhatMedicalConditions = stepQuestionKey === "what_medical_conditions";
  const mainClassName = isWhatMedicalConditions
    ? "w-full"
    : "w-full flex-1 flex flex-col";
  const questionWrapperClassName = isWhatMedicalConditions
    ? undefined
    : "flex-1 flex flex-col";
  const fadeContainerClassName = isWhatMedicalConditions
    ? "h-[inherit] animate-fade-in"
    : "flex-1 animate-fade-in";
  const selectedGender = answers[1] === "male" ? "male" : "female";
  const questionContainerClass = isBodyGoals
    ? "[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-[var(--section-container-gutter-internal)] mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] w-full pb-10 pt-6 [--section-container-width:37rem] tablet:py-16 tablet:[--section-container-width:21.4rem]"
    : isStudiesProve
      ? "[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-[var(--section-container-gutter-internal)] mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] w-full pb-10 pt-6 [--section-container-width:37rem] tablet:py-16 flex flex-col items-center gap-6 desktop:gap-12"
      : isWeightChanges || isWeightLossForecast || isWellnessSummary
        ? "[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-[var(--section-container-gutter-internal)] mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] w-full pb-10 pt-6 [--section-container-width:37rem] tablet:py-16 flex flex-col items-center text-center"
        : isPerfectSolution
          ? "[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-[var(--section-container-gutter-internal)] mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] w-full pb-10 pt-6 [--section-container-width:37rem] tablet:py-16 flex flex-col items-start gap-6 desktop:gap-12"
        : isSpecialists
          ? "[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-[var(--section-container-gutter-internal)] mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] w-full pb-10 pt-6 [--section-container-width:37rem] tablet:py-16 flex flex-col items-center gap-6 desktop:gap-12"
        : isAllergies || isOmitNonos
          ? "[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-[var(--section-container-gutter-internal)] mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] w-full pb-10 pt-6 [--section-container-width:37rem] tablet:py-16 flex flex-col"
        : isWhatMedicalConditions
          ? "[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-[var(--section-container-gutter-internal)] mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] w-full pb-10 pt-6 [--section-container-width:37rem] tablet:py-16"
        : isMealsPerDay
          ? "mx-auto w-full max-w-[calc(37rem+2*1rem)] px-4 tablet:max-w-[calc(37rem+2*2rem)] tablet:px-8 pb-10 pt-6 tablet:py-16 pr-0"
      : "mx-auto w-full max-w-[calc(37rem+2*1rem)] px-4 tablet:max-w-[calc(37rem+2*2rem)] tablet:px-8 pb-10 pt-6 tablet:py-16";

  return (
    <div className="flex min-h-screen flex-col">
      <QuizHeader progress={progress} showBack onBack={handleBack} />

      <main className={mainClassName}>
        <div
          data-testid={`quiz__question-${stepQuestionKey}`}
          className={questionWrapperClassName}
        >
          <div className={fadeContainerClassName}>
            <div className={questionContainerClass}>
              {currentStep.type !== "info" && (
                <>
                  {isHeight ? (
                    <div className="mb-4 flex flex-col gap-8">
                      <p
                        id="quiz__title-height--question-with-title"
                        className="overflow body-large break-words font-semibold"
                      >
                        {currentStep.question}
                      </p>
                    </div>
                  ) : isWeight ? (
                    <div className="mb-4 flex flex-col gap-8">
                      <p
                        id="quiz__title-weight--question-with-title"
                        className="overflow body-large break-words font-semibold"
                      >
                        {currentStep.question}
                      </p>
                    </div>
                  ) : isTargetWeight ? (
                    <div className="mb-4 flex flex-col gap-8">
                      <p
                        id="quiz__title-target_weight--question-with-title"
                        className="overflow body-large break-words font-semibold"
                      >
                        {currentStep.question}
                      </p>
                    </div>
                  ) : isAge ? (
                    <div className="mb-4 flex flex-col-reverse gap-4">
                      <p
                        id="quiz__title-age--question-with-title"
                        className="overflow body-large break-words font-semibold"
                      >
                        {currentStep.question}
                      </p>
                    </div>
                  ) : isLastTimeFeltGood ? (
                    <div className="mb-4 flex flex-col-reverse gap-4">
                      <p
                        id="quiz__title-last_time_felt_good_about_weight--question-with-title"
                        className="overflow body-large break-words font-semibold"
                      >
                        {currentStep.question}
                      </p>
                    </div>
                  ) : isMealsPerDay ? (
                    <div className="mb-4 flex flex-col-reverse gap-4">
                      {currentStep.subtitle && (
                        <p
                          id="quiz__subtitle-meals_per_day--question-with-title"
                          className="body-large"
                          style={{ color: "var(--color-secondary-800)" }}
                        >
                          {currentStep.subtitle}
                        </p>
                      )}
                      <p
                        id="quiz__title-meals_per_day--question-with-title"
                        className="overflow body-large break-words font-semibold"
                      >
                        {currentStep.question}
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4 flex flex-col-reverse gap-4">
                      {currentStep.subtitle && (
                        <p
                          id={`quiz__subtitle-${stepQuestionKey}--question-with-title`}
                          className="body-large"
                          style={{ color: "var(--color-secondary-800)" }}
                        >
                          {currentStep.subtitle}
                        </p>
                      )}
                      <h1
                        id={`quiz__title-${stepQuestionKey}--question-with-title`}
                        className="overflow body-large break-words font-semibold"
                        style={{ color: "var(--color-secondary-main)" }}
                      >
                        {currentStep.question}
                      </h1>
                    </div>
                  )}
                </>
              )}

              {currentStep.type === "single-select" && currentStep.answers && (
                <div className="flex w-full min-w-[50%] flex-col gap-2">
                  {isLastTimeFeltGood ? (
                    <LastTimeFeltGoodQuestion
                      answers={currentStep.answers}
                      onNext={(value) => {
                        handleAnswer(value);
                        handleNext();
                      }}
                    />
                  ) : isMealsPerDay ? (
                    <MealsPerDayQuestion
                      answers={currentStep.answers}
                      selectedId={selectedAnswer}
                      onSelect={(value) => {
                        handleAnswer(value);
                        if (currentStep.autoAdvance) {
                          setTimeout(() => handleNext(), 200);
                        }
                      }}
                    />
                  ) : isActivityLevel ? (
                    <ActivityLevelQuestion
                      answers={currentStep.answers}
                      variant="activity_level"
                      onNext={(value) => {
                        handleAnswer(value);
                        handleNext();
                      }}
                    />
                  ) : isWaterIntake ? (
                    <ActivityLevelQuestion
                      answers={currentStep.answers}
                      variant="water_intake"
                      onNext={(value) => {
                        handleAnswer(value);
                        handleNext();
                      }}
                    />
                  ) : isCookingTime ? (
                    <CookingTimeQuestion
                      answers={currentStep.answers}
                      selectedId={selectedAnswer}
                      onSelect={(value) => {
                        handleAnswer(value);
                        if (currentStep.autoAdvance) {
                          setTimeout(() => handleNext(), 200);
                        }
                      }}
                    />
                  ) : (
                    <>
                      {currentStep.answers.map((answer) => (
                        <QuizOptionCard
                          key={answer.id}
                          id={`quiz__option-${answer.id}-${stepQuestionKey}--single-question`}
                          testId={`quiz__option-${answer.id}-${stepQuestionKey}--single-question`}
                          label={answer.label}
                          emoji={answer.emoji}
                          imageSrc={answer.imageSrc}
                          selected={selectedAnswer === answer.id}
                          onClick={() => {
                            handleAnswer(answer.id);
                            if (currentStep.autoAdvance) {
                              const nextStepId =
                                answer.nextStep ??
                                currentStep.nextStep ??
                                currentStep.id + 1;
                              setTimeout(() => handleNext(nextStepId), 200);
                            }
                          }}
                        />
                      ))}
                    </>
                  )}
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
                  ) : isAllergies ? (
                    <FoodPreferencesQuestion
                      answers={currentStep.answers}
                      selected={selectedAnswers}
                      variant="allergies"
                      onToggle={(id) => {
                        if (id === "none") {
                          handleAnswer(["none"]);
                          setTimeout(() => handleNext(), 200);
                          return;
                        }

                        let next: string[];
                        if (id === "Other") {
                          next = [id];
                        } else if (selectedAnswers.includes(id)) {
                          next = selectedAnswers.filter((a) => a !== id);
                        } else {
                          next = [...selectedAnswers.filter((a) => a !== "none" && a !== "Other"), id];
                        }
                        handleAnswer(next);
                      }}
                      onNext={handleNext}
                    />
                  ) : isOmitNonos ? (
                    <FoodPreferencesQuestion
                      answers={currentStep.answers}
                      selected={selectedAnswers}
                      variant="omit_nonos"
                      onToggle={(id) => {
                        let next: string[];
                        if (id === "none") {
                          handleAnswer(["none"]);
                          setTimeout(() => handleNext(), 200);
                          return;
                        } else if (selectedAnswers.includes(id)) {
                          next = selectedAnswers.filter((a) => a !== id);
                        } else {
                          next = [...selectedAnswers.filter((a) => a !== "none"), id];
                        }
                        handleAnswer(next);
                      }}
                      onNext={handleNext}
                    />
                  ) : isWhatMedicalConditions ? (
                    <MedicalConditionsQuestion
                      answers={currentStep.answers}
                      selected={selectedAnswers}
                      onToggle={(id) => {
                        if (id === "none") {
                          handleAnswer(["none"]);
                          setTimeout(() => handleNext(), 200);
                          return;
                        }

                        const next = selectedAnswers.includes(id)
                          ? selectedAnswers.filter((a) => a !== id)
                          : [...selectedAnswers.filter((a) => a !== "none"), id];
                        handleAnswer(next);
                      }}
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
                <>
                  {isHeight ? (
                    <HeightQuestion
                      onNext={(val) => {
                        handleAnswer(val);
                        handleNext();
                      }}
                    />
                  ) : isWeight ? (
                    <WeightQuestion
                      heightValue={
                        typeof answers[6] === "string" ? answers[6] : undefined
                      }
                      onNext={(val) => {
                        handleAnswer(val);
                        handleNext();
                      }}
                    />
                  ) : isTargetWeight ? (
                    <TargetWeightQuestion
                      heightValue={
                        typeof answers[6] === "string" ? answers[6] : undefined
                      }
                      onNext={(val) => {
                        handleAnswer(val);
                        handleNext();
                      }}
                    />
                  ) : isAge ? (
                    <AgeQuestion
                      onNext={(val) => {
                        handleAnswer(val);
                        handleNext();
                      }}
                    />
                  ) : (
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
                </>
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

              {currentStep.type === "info" && currentStep.question === "studies_prove" && (
                <StudiesProveQuestion onNext={handleNext} />
              )}

              {currentStep.type === "info" && currentStep.question === "weight_changes" && (
                <WeightChangesQuestion
                  currentWeightValue={
                    typeof answers[7] === "string" ? answers[7] : undefined
                  }
                  targetWeightValue={
                    typeof answers[8] === "string" ? answers[8] : undefined
                  }
                  onNext={handleNext}
                />
              )}

              {currentStep.type === "info" && currentStep.question === "perfect_solution" && (
                <PerfectSolutionQuestion onNext={handleNext} />
              )}

              {currentStep.type === "info" && currentStep.question === "specialists" && (
                <SpecialistsQuestion onNext={handleNext} />
              )}

              {currentStep.type === "info" && currentStep.question === "event_date" && (
                <EventDateQuestion
                  onNext={(value) => {
                    handleAnswer(value);
                    handleNext();
                  }}
                />
              )}

              {currentStep.type === "info" && currentStep.question === "weight_loss_forecast" && (
                <WeightLossForecastQuestion
                  currentWeightValue={typeof answers[7] === "string" ? answers[7] : undefined}
                  targetWeightValue={typeof answers[8] === "string" ? answers[8] : undefined}
                  eventDateValue={typeof answers[28] === "string" ? answers[28] : undefined}
                  onNext={handleNext}
                />
              )}

              {currentStep.type === "info" && currentStep.question === "wellness_summary" && (
                <WellnessSummaryQuestion
                  gender={typeof answers[1] === "string" ? answers[1] : undefined}
                  heightValue={typeof answers[6] === "string" ? answers[6] : undefined}
                  weightValue={typeof answers[7] === "string" ? answers[7] : undefined}
                  mainGoalValue={typeof answers[3] === "string" ? answers[3] : undefined}
                  activityLevelValue={typeof answers[16] === "string" ? answers[16] : undefined}
                  onNext={handleNext}
                />
              )}
            </div>

            {isWhatMedicalConditions && (
              <div className="px-10 pb-4 pt-6 tablet:pb-6 desktop:pb-10 bg-gradient-to-t to-[rgba(255,251,246,0)_100%] from-tertiary-100 sticky bottom-0 z-sticky mt-auto">
                <button
                  type="button"
                  id="quiz__next-question-button"
                  onClick={() => handleNext()}
                  disabled={selectedAnswers.length === 0}
                  className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid text-center font-semibold outline-hidden transition-colors disabled-btn:pointer-events-none disabled-btn:cursor-default loading:cursor-default border-transparent text-neutral-white disabled-btn:bg-secondary-200 bg-primary-main hover-btn:bg-primary-600 w-full h-12 px-3 rounded-l body-regular col-span-full mx-auto max-w-sm"
                >
                  <div className="flex w-full items-center justify-center gap-2 opacity-100">
                    <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                      Next
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
