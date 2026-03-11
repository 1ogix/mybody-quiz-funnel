"use client";

import { Answer } from "@/types/quiz";
import Button from "@/components/ui/Button";

interface MultiSelectProps {
  answers: Answer[];
  selected: string[];
  onToggle: (answerId: string) => void;
  onNext: () => void;
}

export default function MultiSelect({
  answers,
  selected,
  onToggle,
  onNext,
}: MultiSelectProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-3">
        {answers.map((answer, i) => {
          const isSelected = selected.includes(answer.id);
          return (
            <button
              key={answer.id}
              onClick={() => onToggle(answer.id)}
              style={{
                animationDelay: `${i * 60}ms`,
                borderColor: isSelected
                  ? "#027aff"
                  : "color-mix(in srgb, #292b2c 15%, transparent)",
                backgroundColor: isSelected ? "#e6f2ff" : "#ffffff",
                color: isSelected ? "#027aff" : "#292b2c",
              }}
              className="
                w-full h-12 px-4
                border-[1.5px] border-solid rounded-[0.75rem]
                flex items-center gap-3
                font-semibold text-base
                hover:border-[#027aff] hover:bg-[#e6f2ff]
                active:scale-[0.98] transition-all duration-150
                cursor-pointer outline-none
                focus-visible:ring-2 focus-visible:ring-[#027aff] focus-visible:ring-offset-2
              "
            >
              {answer.emoji && (
                <span className="text-lg leading-none">{answer.emoji}</span>
              )}
              <span>{answer.label}</span>
              {isSelected && (
                <span className="ml-auto">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1ca455"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Button
        onClick={onNext}
        disabled={selected.length === 0}
        className="mt-2"
      >
        Continue →
      </Button>
    </div>
  );
}
