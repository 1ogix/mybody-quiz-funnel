"use client";

import Image from "next/image";
import { Answer } from "@/types/quiz";

interface CookingTimeQuestionProps {
  answers: Answer[];
  selectedId?: string;
  onSelect: (value: string) => void;
}

const SUBTEXT_BY_ID: Record<string, string | undefined> = {
  quick_and_easy: "Under 30 minutes per meal",
  depends_on_the_day: "30-60 minutes per meal",
  love_cooking_from_scratch: "More than 1 hour per meal",
};

export default function CookingTimeQuestion({
  answers,
  selectedId,
  onSelect,
}: CookingTimeQuestionProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex w-full min-w-[50%] flex-col gap-2">
        {answers.map((answer) => {
          const isSelected = selectedId === answer.id;
          const subtext = SUBTEXT_BY_ID[answer.id];
          return (
            <button
              key={answer.id}
              id={`quiz__option-${answer.id}-cooking_time--single-question`}
              type="button"
              onClick={() => onSelect(answer.id)}
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
                <p className="body-large font-medium">
                  <span>{answer.label}</span>
                  {subtext && (
                    <span
                      className="body-small mt-1 block"
                      style={{ color: "var(--color-secondary-800)" }}
                    >
                      {subtext}
                    </span>
                  )}
                </p>
              </div>
              <div className="ml-4 shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  width={24}
                  height={24}
                  style={{
                    color: isSelected
                      ? "var(--color-secondary-main)"
                      : "var(--color-secondary-600)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.29289 6.29289C8.68342 5.90237 9.31658 5.90237 9.70711 6.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071L9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071C7.90237 17.3166 7.90237 16.6834 8.29289 16.2929L12.5858 12L8.29289 7.70711C7.90237 7.31658 7.90237 6.68342 8.29289 6.29289Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
