"use client";

import { FormEvent, useMemo, useState } from "react";
import Button from "@/components/ui/Button";

type WeightUnit = "lb" | "kg";

interface WeightQuestionProps {
  heightValue?: string;
  onNext: (value: string) => void;
}

function parseHeightToMeters(heightValue?: string): number | null {
  if (!heightValue) return null;

  const normalized = heightValue.trim().toLowerCase();

  // Accept legacy/plain numeric centimeters (e.g. "170")
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

  // Accept apostrophe format (e.g. 5'9 or 5'9")
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

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

export default function WeightQuestion({
  heightValue,
  onNext,
}: WeightQuestionProps) {
  const [unit, setUnit] = useState<WeightUnit>("lb");
  const [value, setValue] = useState("");

  const canContinue = useMemo(() => value.trim().length > 0, [value]);
  const bmiInfo = useMemo(() => {
    if (!canContinue) return null;

    const parsedWeight = Number(value);
    if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) return null;

    const heightMeters = parseHeightToMeters(heightValue);
    if (!heightMeters) return null;

    const weightKg = unit === "kg" ? parsedWeight : parsedWeight * 0.45359237;
    const bmi = weightKg / (heightMeters * heightMeters);
    if (!Number.isFinite(bmi) || bmi <= 0) return null;

    const roundedBmi = Math.round(bmi * 10) / 10;
    return {
      value: roundedBmi,
      category: getBmiCategory(roundedBmi),
    };
  }, [canContinue, heightValue, unit, value]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue) return;
    onNext(`${value} ${unit}`);
  }

  return (
    <div className="mx-auto max-w-full tablet:my-[2.62rem] tablet:max-w-96">
      <div
        className="mb-6 grid h-10 gap-1 rounded-[0.75rem] p-1 tablet:mb-10"
        style={{
          gridTemplateColumns: "repeat(2, 1fr)",
          backgroundColor: "var(--color-secondary-100)",
        }}
      >
        <button
          type="button"
          onClick={() => setUnit("lb")}
          className="flex h-full cursor-pointer items-center justify-center rounded-[0.5rem] font-medium transition-colors duration-200"
          style={{
            color: "var(--color-secondary-800)",
            backgroundColor:
              unit === "lb" ? "var(--color-neutral-white)" : "transparent",
          }}
        >
          LB
        </button>
        <button
          type="button"
          onClick={() => setUnit("kg")}
          className="flex h-full cursor-pointer items-center justify-center rounded-[0.5rem] font-medium transition-colors duration-200"
          style={{
            color: "var(--color-secondary-800)",
            backgroundColor:
              unit === "kg" ? "var(--color-neutral-white)" : "transparent",
          }}
        >
          KG
        </button>
      </div>

      <form
        id="quiz__weight-question-upl-desktop--input-ft"
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
              name={unit === "lb" ? "pounds" : "kilograms"}
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
                {unit}
              </p>
            </div>
          </div>
        </div>

        {bmiInfo && (
          <div
            className="mt-6 flex items-start rounded-[0.5rem] p-4 desktop:mt-12"
            style={{ backgroundColor: "var(--color-success-200)" }}
          >
            <p className="body-regular">
              <strong>
                👆Your BMI is {bmiInfo.value.toFixed(1)}, which is considered{" "}
                {bmiInfo.category}.
              </strong>
              <br />
              Let&apos;s bring it down in a healthy, doable way - so you feel
              lighter, more energized, and more in control.
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
