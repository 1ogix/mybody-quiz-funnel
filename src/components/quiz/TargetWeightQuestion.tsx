"use client";

import { FormEvent, useMemo, useState } from "react";
import Button from "@/components/ui/Button";

interface TargetWeightQuestionProps {
  heightValue?: string;
  onNext: (value: string) => void;
}

function parseHeightToMeters(heightValue?: string): number | null {
  if (!heightValue) return null;

  const normalized = heightValue.trim().toLowerCase();

  const numericOnlyMatch = normalized.match(/^(\d+(?:\.\d+)?)$/);
  if (numericOnlyMatch) {
    const cm = Number(numericOnlyMatch[1]);
    if (!Number.isFinite(cm) || cm <= 0) return null;
    return cm / 100;
  }

  const cmMatch = normalized.match(/^(\d+(?:\.\d+)?)\s*cm$/);
  if (cmMatch) {
    const cm = Number(cmMatch[1]);
    if (!Number.isFinite(cm) || cm <= 0) return null;
    return cm / 100;
  }

  const ftInMatch = normalized.match(
    /^(\d+(?:\.\d+)?)\s*ft\s*(\d+(?:\.\d+)?)\s*in$/
  );
  if (ftInMatch) {
    const feet = Number(ftInMatch[1]);
    const inches = Number(ftInMatch[2]);
    if (!Number.isFinite(feet) || !Number.isFinite(inches)) return null;
    if (feet < 0 || inches < 0) return null;
    const totalInches = feet * 12 + inches;
    if (totalInches <= 0) return null;
    return totalInches * 0.0254;
  }

  const apostropheMatch = normalized.match(
    /^(\d+(?:\.\d+)?)\s*'\s*(\d+(?:\.\d+)?)\s*"?$/
  );
  if (apostropheMatch) {
    const feet = Number(apostropheMatch[1]);
    const inches = Number(apostropheMatch[2]);
    if (!Number.isFinite(feet) || !Number.isFinite(inches)) return null;
    if (feet < 0 || inches < 0) return null;
    const totalInches = feet * 12 + inches;
    if (totalInches <= 0) return null;
    return totalInches * 0.0254;
  }

  return null;
}

export default function TargetWeightQuestion({
  heightValue,
  onNext,
}: TargetWeightQuestionProps) {
  const [value, setValue] = useState("");
  const canContinue = useMemo(() => value.trim().length > 0, [value]);
  const targetWeightAlert = useMemo(() => {
    if (!canContinue) return null;

    const parsedWeightKg = Number(value);
    if (!Number.isFinite(parsedWeightKg) || parsedWeightKg <= 0) return null;

    const heightMeters = parseHeightToMeters(heightValue);
    if (!heightMeters) return null;

    const bmi = parsedWeightKg / (heightMeters * heightMeters);
    if (!Number.isFinite(bmi) || bmi <= 0) return null;

    const isOutOfHealthyRange = bmi < 18.5 || bmi >= 25;
    if (!isOutOfHealthyRange) return null;

    return true;
  }, [canContinue, heightValue, value]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue) return;
    onNext(`${value} kg`);
  }

  return (
    <div className="mx-auto max-w-full tablet:my-[2.62rem] tablet:max-w-96">
      <form
        id="quiz__weight-question-upl-desktop-target--input-cm"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div role="group">
          <div
            className="relative h-20 border-b px-3 py-2"
            style={{
              borderColor: "var(--color-secondary-200)",
              color: "var(--color-secondary-main)",
            }}
          >
            <input
              id="quiz__weight-input"
              type="number"
              name="kilograms"
              placeholder="0"
              autoComplete="off"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="h-full w-full border-none bg-transparent text-center text-[3rem] font-semibold leading-4 caret-[var(--color-primary-main)] [appearance:textfield] placeholder:text-[var(--color-secondary-200)] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="absolute bottom-4 right-3">
              <p
                className="body-regular"
                style={{ color: "var(--color-secondary-600)" }}
              >
                kg
              </p>
            </div>
          </div>
        </div>

        {targetWeightAlert && (
          <div
            className="mt-6 flex items-start rounded-[0.5rem] p-4 desktop:mt-12"
            style={{ backgroundColor: "var(--color-success-200)" }}
          >
            <p className="body-regular">
              <strong>
                ⚠️ This goal may be too extreme.
              </strong>
              <br />
              Your target weight is not within a healthy range.
            </p>
          </div>
        )}

        <Button
          id="quiz__next-question-button"
          type="submit"
          className="mt-6 tablet:mt-10"
          disabled={!canContinue}
        >
          Next
        </Button>
      </form>
    </div>
  );
}
