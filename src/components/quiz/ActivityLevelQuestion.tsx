"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Answer } from "@/types/quiz";
import Button from "@/components/ui/Button";

interface ActivityLevelQuestionProps {
  answers: Answer[];
  variant?: "activity_level" | "water_intake";
  onNext: (value: string) => void;
}

export default function ActivityLevelQuestion({
  answers,
  variant = "activity_level",
  onNext,
}: ActivityLevelQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const canContinue = useMemo(() => Boolean(selectedId), [selectedId]);
  const isStarterActivity =
    selectedId === "not_active" || selectedId === "walk_only";
  const isHigherActivity =
    selectedId === "one_two_times_week" || selectedId === "three_five_times_week";
  const isLowerHydration =
    selectedId === "only_coffee_or_tea" ||
    selectedId === "fewer_than_2_glasses" ||
    selectedId === "depends";
  const isHigherHydration =
    selectedId === "2_6_glasses" || selectedId === "7_10_glasses";

  return (
    <>
      <div className="flex gap-4">
        <div className="flex w-full min-w-[50%] flex-col gap-2">
          {answers.map((answer) => {
            const isSelected = selectedId === answer.id;
            return (
              <button
                key={answer.id}
                id={`quiz__radio_question-${answer.id}`}
                type="button"
                onClick={() => setSelectedId(answer.id)}
                className="flex min-h-[5.25rem] cursor-pointer items-center rounded-xl border p-4 text-left transition duration-200 ease-linear"
                style={{
                  borderColor: isSelected
                    ? "var(--color-secondary-main)"
                    : "var(--color-secondary-200)",
                  backgroundColor: isSelected
                    ? "var(--color-secondary-100)"
                    : "var(--color-neutral-white)",
                }}
              >
                {answer.imageSrc && (
                  <div className="relative mr-4 size-12 shrink-0 overflow-hidden rounded-[0.5rem]">
                    <Image
                      src={answer.imageSrc}
                      alt={answer.label}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-cover"
                    />
                  </div>
                )}

                <div className="flex-grow">
                  <p className="body-large font-medium">{answer.label}</p>
                </div>

                <div className="ml-4 shrink-0">
                  <span
                    role="radio"
                    aria-checked={isSelected}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-current"
                    style={{
                      color: isSelected
                        ? "var(--color-secondary-main)"
                        : "var(--color-secondary-400)",
                    }}
                  >
                    {isSelected && (
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: "var(--color-secondary-main)" }}
                      />
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {((variant === "activity_level" &&
        (isStarterActivity || isHigherActivity)) ||
        (variant === "water_intake" &&
          (isLowerHydration || isHigherHydration))) && (
        <div className="mt-6 grid grid-cols-1 gap-4 desktop:mt-8">
          <div
            className="flex items-start rounded-[0.5rem] p-4"
            style={{ backgroundColor: "var(--color-success-200)" }}
          >
            <p className="body-regular">
              {variant === "activity_level" ? (
                isStarterActivity ? (
                  <span>
                    💪 <strong>41% of users</strong> started just like you!
                    We&apos;ll help you build a simple, effective routine.
                  </span>
                ) : (
                  <span>
                    🏃 <strong>You&apos;re more active than 58% of users!</strong>{" "}
                    Staying consistent will bring even faster results.
                  </span>
                )
              ) : isLowerHydration ? (
                <span>
                  <strong>💧 Reminder: Water matters</strong>
                  <br />
                  <br />
                  Staying hydrated can boost energy, reduce cravings, and improve
                  results. We&apos;ll help you remember to drink more.
                </span>
              ) : (
                <span>
                  <strong>💧 Nice work!</strong>
                  <br />
                  <br />
                  You drink more water than most people who take this quiz. Keep
                  it up!
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      <Button
        id="quiz__next-question-button"
        type="button"
        className="mt-6"
        disabled={!canContinue}
        onClick={() => {
          if (selectedId) {
            onNext(selectedId);
          }
        }}
      >
        Next
      </Button>
    </>
  );
}
