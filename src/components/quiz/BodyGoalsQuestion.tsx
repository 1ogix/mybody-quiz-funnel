"use client";

import Image from "next/image";
import { Answer } from "@/types/quiz";
import Button from "@/components/ui/Button";

interface BodyGoalsQuestionProps {
  answers: Answer[];
  selected: string[];
  gender?: "male" | "female";
  onToggle: (answerId: string) => void;
  onNext: () => void;
}

const CONNECTOR_SVGS: Record<
  string,
  { viewBox: string; widthClass: string; path: string }
> = {
  lifted_chest: {
    viewBox: "0 0 48 97",
    widthClass: "w-12",
    path: "M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2V0ZM36.6667 91C36.6667 93.9455 39.0545 96.3333 42 96.3333C44.9455 96.3333 47.3333 93.9455 47.3333 91C47.3333 88.0545 44.9455 85.6667 42 85.6667C39.0545 85.6667 36.6667 88.0545 36.6667 91ZM1 1V2H17.6988V1V0H1V1ZM25.6988 9H24.6988V83H25.6988H26.6988V9H25.6988ZM33.6988 91V92H42V91V90H33.6988V91ZM25.6988 83H24.6988C24.6988 87.9706 28.7282 92 33.6988 92V91V90C29.8328 90 26.6988 86.866 26.6988 83H25.6988ZM17.6988 1V2C21.5648 2 24.6988 5.13401 24.6988 9H25.6988H26.6988C26.6988 4.02944 22.6694 0 17.6988 0V1Z",
  },
  flatter_belly: {
    viewBox: "0 0 57 41",
    widthClass: "w-[3.5625rem]",
    path: "M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2V0ZM45.6667 35C45.6667 37.9455 48.0545 40.3333 51 40.3333C53.9455 40.3333 56.3333 37.9455 56.3333 35C56.3333 32.0545 53.9455 29.6667 51 29.6667C48.0545 29.6667 45.6667 32.0545 45.6667 35ZM1 1V2H17.9976V1V0H1V1ZM25.9975 9H24.9975V27H25.9975H26.9975V9H25.9975ZM33.9975 35V36H51V35V34H33.9975V35ZM25.9975 27H24.9975C24.9975 31.9706 29.027 36 33.9975 36V35V34C30.1316 34 26.9975 30.866 26.9975 27H25.9975ZM17.9976 1V2C21.8635 2 24.9975 5.13401 24.9975 9H25.9975H26.9975C26.9975 4.02944 22.9681 0 17.9976 0V1Z",
  },
  firmer_butt: {
    viewBox: "0 0 78 12",
    widthClass: "w-[4.875rem]",
    path: "M66.6667 6C66.6667 8.94552 69.0545 11.3333 72 11.3333C74.9455 11.3333 77.3333 8.94552 77.3333 6C77.3333 3.05448 74.9455 0.666667 72 0.666667C69.0545 0.666667 66.6667 3.05448 66.6667 6ZM0 6V7H72V6V5H0V6Z",
  },
  leaner_legs: {
    viewBox: "0 0 66 12",
    widthClass: "w-[4.125rem]",
    path: "M54.6667 6C54.6667 8.94552 57.0545 11.3333 60 11.3333C62.9455 11.3333 65.3333 8.94552 65.3333 6C65.3333 3.05448 62.9455 0.666667 60 0.666667C57.0545 0.666667 54.6667 3.05448 54.6667 6ZM0 6V7H60V6V5H0V6Z",
  },
};

export default function BodyGoalsQuestion({
  answers,
  selected,
  gender = "female",
  onToggle,
  onNext,
}: BodyGoalsQuestionProps) {
  const bodyImageSrc =
    gender === "male" ? "/images/man_body.png" : "/images/woman_body.png";

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex w-full tablet:max-w-56 flex-col gap-2">
          {answers.map((answer) => {
            const isSelected = selected.includes(answer.id);
            const connector = CONNECTOR_SVGS[answer.id];
            return (
              <div key={answer.id} className="relative">
                <button
                  id={`quiz__text--info-question-${answer.id}`}
                  type="button"
                  onClick={() => onToggle(answer.id)}
                  className="flex min-h-[5.25rem] w-full cursor-pointer items-center rounded-xl border p-4 transition duration-200 ease-linear"
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
                    <span className="flex items-center justify-center p-0.5">
                      <span
                        role="checkbox"
                        aria-checked={isSelected}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[0.375rem] border-2 border-solid transition-colors"
                        style={{
                          borderColor: isSelected
                            ? "var(--color-secondary-main)"
                            : "var(--color-secondary-400)",
                          backgroundColor: isSelected
                            ? "var(--color-secondary-main)"
                            : "transparent",
                        }}
                      >
                        {isSelected && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                    </span>
                  </div>
                </button>
                {connector && (
                  <svg
                    viewBox={connector.viewBox}
                    fill="none"
                    className={`inline-block shrink-0 align-middle leading-none absolute right-0 translate-x-full top-1/2 transition-all ${connector.widthClass}`}
                    style={{
                      color: isSelected
                        ? "var(--color-primary-main)"
                        : "var(--color-secondary-100)",
                    }}
                  >
                    <path d={connector.path} fill="currentColor" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        <Image
          src={bodyImageSrc}
          alt="Body image"
          width={102}
          height={395}
          className="h-auto w-[6.375rem]"
        />
      </div>

      <Button
        id="quiz__next-question-button"
        type="button"
        className="mt-6"
        onClick={onNext}
        disabled={selected.length === 0}
      >
        Next
      </Button>
    </div>
  );
}
