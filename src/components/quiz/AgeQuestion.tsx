"use client";

import { FormEvent, useMemo, useState } from "react";
import Button from "@/components/ui/Button";

interface AgeQuestionProps {
  onNext: (value: string) => void;
}

export default function AgeQuestion({ onNext }: AgeQuestionProps) {
  const [age, setAge] = useState("");
  const canContinue = useMemo(() => age.trim().length > 0, [age]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue) return;
    onNext(age);
  }

  return (
    <form className="mt-8 flex flex-col gap-8 desktop:mt-12 tablet:gap-12" onSubmit={handleSubmit}>
      <div role="group">
        <label htmlFor="quiz__age-input" className="body-small mb-2 block font-semibold">
          Age
        </label>
        <div
          className="flex h-12 cursor-text items-center rounded-xl border border-solid bg-white px-3 transition-colors hover:border-[var(--color-secondary-main)] focus-within:border-[var(--color-secondary-main)]"
          style={{
            color: "var(--color-secondary-main)",
            borderColor: "var(--color-secondary-200)",
          }}
        >
          <input
            id="quiz__age-input"
            type="number"
            autoCapitalize="off"
            placeholder="Age"
            name="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            className="h-full w-full appearance-none border-none bg-transparent text-base font-normal text-current placeholder:text-[var(--color-secondary-600)] focus:outline-none"
          />
        </div>
      </div>

      <div className="!m-0 mt-6 grid grid-cols-1 gap-4 desktop:mt-8">
        <div
          className="flex items-start rounded-[0.5rem] p-4"
          style={{ backgroundColor: "var(--color-success-200)" }}
        >
          <p className="body-regular">
            <span>
              Your age helps us tailor your plan.
              <br />
              <br />
              As we get older, our metabolism, hormones, and blood sugar responses
              can shift - we&apos;ll make sure your plan fits your current needs
              for lasting results.
            </span>
          </p>
        </div>
      </div>

      <Button
        id="quiz__next-question-button"
        type="submit"
        className="mx-auto tablet:max-w-96"
        disabled={!canContinue}
      >
        Next
      </Button>
    </form>
  );
}
