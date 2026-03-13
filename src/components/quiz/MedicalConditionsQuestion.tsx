"use client";

import { Answer } from "@/types/quiz";

interface MedicalConditionsQuestionProps {
  answers: Answer[];
  selected: string[];
  onToggle: (answerId: string) => void;
}

export default function MedicalConditionsQuestion({
  answers,
  selected,
  onToggle,
}: MedicalConditionsQuestionProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {answers.map((answer, index) => {
          const isSelected = selected.includes(answer.id);
          const useChevron = answer.id === "none";

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
                <div className="flex-grow text-left">
                  <p className="body-large text-left font-medium">{answer.label}</p>
                  {answer.id === "chronic_kidney_disease" && (
                    <p className="body-small mt-1 text-secondary-800">
                      Disclaimer: This meal plan is not suitable for Third-stage
                      kidney disease patients.
                    </p>
                  )}
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
                          ? "border-[var(--color-secondary-main)] bg-[var(--color-secondary-main)]"
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

      <div className="mt-6 grid grid-cols-1 gap-4 desktop:mt-8">
        <p className="body-small text-secondary-600">
          Disclaimer: MyBody meal plan is not always suitable for individuals
          with medical conditions. Please consult your doctor before starting the
          meal plan or making any other dietary and lifestyle changes.
        </p>
      </div>
    </>
  );
}
