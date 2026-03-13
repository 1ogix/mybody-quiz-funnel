"use client";

import Image from "next/image";
import { Answer } from "@/types/quiz";

type Variant = "allergies" | "omit_nonos";

interface FoodPreferencesQuestionProps {
  answers: Answer[];
  selected: string[];
  variant: Variant;
  onToggle: (answerId: string) => void;
  onNext: () => void;
}

function getCheckboxActiveClass(variant: Variant): string {
  return variant === "omit_nonos"
    ? "border-[var(--color-danger-main)] bg-[var(--color-danger-main)]"
    : "border-[var(--color-secondary-main)] bg-[var(--color-secondary-main)]";
}

export default function FoodPreferencesQuestion({
  answers,
  selected,
  variant,
  onToggle,
  onNext,
}: FoodPreferencesQuestionProps) {
  const isAllergies = variant === "allergies";
  const canContinue = selected.length > 0;

  return (
    <>
      <div className="flex flex-col gap-2">
        {answers.map((answer, index) => {
          const isSelected = selected.includes(answer.id);
          const hasImage = Boolean(answer.imageSrc);
          const useChevron =
            answer.id === "none" || (isAllergies && answer.id === "Other");

          return (
            <div
              key={answer.id}
              className={index === 0 ? "mb-6 last-of-type:mb-0 tablet:mb-10" : ""}
              id={`quiz__option-${answer.id}`}
            >
              <button
                type="button"
                onClick={() => onToggle(answer.id)}
                className={[
                  "flex w-full min-h-[5.25rem] cursor-pointer items-center rounded-xl border p-4 text-left",
                  "transition duration-200 ease-linear",
                  isSelected
                    ? "border-[var(--color-secondary-main)] bg-[var(--color-secondary-100)]"
                    : "border-[var(--color-secondary-200)] bg-[var(--color-neutral-white)]",
                ].join(" ")}
              >
                {hasImage && (
                  <div className="relative mr-4 size-12 shrink-0 overflow-hidden rounded-[0.5rem]">
                    <Image
                      src={answer.imageSrc as string}
                      alt={answer.label}
                      width={48}
                      height={48}
                      className="size-12 object-cover"
                    />
                  </div>
                )}

                <div className="flex-grow text-left">
                  <p className="body-large text-left font-medium">{answer.label}</p>
                </div>

                <div className="ml-4 shrink-0">
                  {useChevron ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="inline-block size-6 shrink-0 align-middle leading-none text-secondary-600"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.29289 6.29289C8.68342 5.90237 9.31658 5.90237 9.70711 6.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071L9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071C7.90237 17.3166 7.90237 16.6834 8.29289 16.2929L12.5858 12L8.29289 7.70711C7.90237 7.31658 7.90237 6.68342 8.29289 6.29289Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <span
                      className={[
                        "flex h-5 w-5 items-center justify-center rounded-[0.375rem] border-2 border-solid",
                        isSelected
                          ? getCheckboxActiveClass(variant)
                          : "border-[var(--color-secondary-400)] bg-transparent",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <svg
                          viewBox="0 0 16 16"
                          className="size-3 text-[var(--color-neutral-white)]"
                          fill="none"
                        >
                          <path
                            d="M3 8.5L6.2 11.4L13 4.6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 z-20 mt-auto bg-gradient-to-t from-[var(--color-tertiary-100)] to-transparent px-10 pb-4 pt-6 tablet:pb-6 desktop:pb-10">
        <button
          type="button"
          id="quiz__next-question-button"
          onClick={onNext}
          disabled={!canContinue}
          className="relative mx-auto flex h-12 w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-l border-[1.5px] border-transparent bg-primary-main px-3 text-center body-regular font-semibold text-neutral-white transition-colors hover-btn:bg-primary-600 disabled:cursor-default disabled:bg-secondary-200"
        >
          <div className="flex w-full items-center justify-center gap-2 opacity-100">
            <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
              Next
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
