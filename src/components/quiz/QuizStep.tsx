"use client";

import Image from "next/image";
import { QuizStep as QuizStepType } from "@/types/quiz";
import SingleSelect from "./SingleSelect";
import MultiSelect from "./MultiSelect";
import NumberInput from "./NumberInput";
import EmailInput from "./EmailInput";

interface QuizStepProps {
  step: QuizStepType;
  selectedAnswer?: string;
  selectedAnswers?: string[];
  onAnswer: (value: string | string[]) => void;
  onNext: (freshAnswer?: string | string[]) => void;
}

export default function QuizStep({
  step,
  selectedAnswer,
  selectedAnswers = [],
  onAnswer,
  onNext,
}: QuizStepProps) {
  return (
    <div className="flex flex-col w-full min-h-0 flex-1">
      {/* Hero image (step 1 only) */}
      {step.heroImage && (
        <div className="w-full h-48 md:h-64 relative overflow-hidden rounded-b-[1.5rem] bg-[#e6f2ff] mb-6">
          <Image
            src={step.heroImage}
            alt="hero"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 480px) 100vw, 480px"
          />
        </div>
      )}

      {/* Bullets (step 1) */}
      {step.bullets && (
        <ul className="mb-6 flex flex-col gap-2">
          {step.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "#6b7280" }}>
              <svg
                className="flex-shrink-0 mt-0.5"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1ca455"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Question */}
      <h1
        className="text-[1.375rem] md:text-2xl font-semibold leading-snug mb-1"
        style={{ color: "#292b2c" }}
      >
        {step.question}
      </h1>

      {step.subtitle && (
        <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
          {step.subtitle}
        </p>
      )}

      {!step.subtitle && <div className="mb-6" />}

      {/* Answer input */}
      {step.type === "single-select" && step.answers && (
        <SingleSelect
          answers={step.answers}
          selected={selectedAnswer}
          onSelect={(id) => {
            onAnswer(id);
            if (step.autoAdvance) {
              setTimeout(() => onNext(id), 200);
            }
          }}
        />
      )}

      {step.type === "multi-select" && step.answers && (
        <MultiSelect
          answers={step.answers}
          selected={selectedAnswers}
          onToggle={(id) => {
            const next = selectedAnswers.includes(id)
              ? selectedAnswers.filter((a) => a !== id)
              : [...selectedAnswers, id];
            onAnswer(next);
          }}
          onNext={() => onNext(selectedAnswers)}
        />
      )}

      {step.type === "number-input" && (
        <NumberInput
          placeholder={step.inputPlaceholder}
          unit={step.inputUnit}
          min={step.inputMin}
          max={step.inputMax}
          onNext={(val) => {
            onAnswer(val);
            onNext(val);
          }}
        />
      )}

      {step.type === "email-input" && (
        <EmailInput
          onNext={(email) => {
            onAnswer(email);
            onNext(email);
          }}
        />
      )}
    </div>
  );
}
