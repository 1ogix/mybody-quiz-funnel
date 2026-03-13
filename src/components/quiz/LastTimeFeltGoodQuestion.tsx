"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Answer } from "@/types/quiz";
import Button from "@/components/ui/Button";

interface LastTimeFeltGoodQuestionProps {
  answers: Answer[];
  onNext: (value: string) => void;
}

export default function LastTimeFeltGoodQuestion({
  answers,
  onNext,
}: LastTimeFeltGoodQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const canContinue = useMemo(() => Boolean(selectedId), [selectedId]);

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

        <Image
          src="/images/woman_weight_changes.055af1e3.png"
          alt=""
          width={536}
          height={720}
          className="-mr-4 h-auto max-h-[22.5rem] max-w-[6.5rem] object-contain object-top desktop:max-w-[16.75rem]"
        />
      </div>

      {canContinue && (
        <div className="mt-6 grid grid-cols-1 gap-4 desktop:mt-8">
          <div
            className="flex items-start rounded-[0.5rem] p-4"
            style={{ backgroundColor: "var(--color-success-200)" }}
          >
            <p className="body-regular">
              <span>
                <strong>Thanks for sharing!</strong>
                <br />
                <br />
                You&apos;re not alone - lots of people feel the same way. MyBody
                creates a plan that&apos;s realistic, flexible, and helps you stay
                motivated.
              </span>
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
