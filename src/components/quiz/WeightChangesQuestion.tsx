"use client";

import Button from "@/components/ui/Button";

interface WeightChangesQuestionProps {
  currentWeightValue?: string;
  targetWeightValue?: string;
  onNext: () => void;
}

function toKg(value?: string): number | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  const match = normalized.match(/^(\d+(?:\.\d+)?)\s*(kg|lb)$/);
  if (!match) return null;

  const amount = Number(match[1]);
  const unit = match[2];
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return unit === "kg" ? amount : amount * 0.45359237;
}

function formatWeightKg(valueKg: number): string {
  const rounded = Math.round(valueKg * 10) / 10;
  const text = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(1);
  return `${text} kg`;
}

export default function WeightChangesQuestion({
  currentWeightValue,
  targetWeightValue,
  onNext,
}: WeightChangesQuestionProps) {
  const currentKg = toKg(currentWeightValue) ?? 88;
  const targetKg = toKg(targetWeightValue) ?? currentKg;
  const startLabel = formatWeightKg(currentKg);
  const endLabel = formatWeightKg(targetKg);

  return (
    <>
      <h4 className="headline4">
        We&apos;ll help you lose weight and stabilize blood sugar - for good
      </h4>

      <p className="body-large my-8" style={{ color: "var(--color-secondary-800)" }}>
        Step by step, at your own pace
      </p>

      <div
        className="relative w-full rounded-xl"
        style={{ backgroundColor: "var(--color-primary-100)" }}
      >
        <div
          className="relative flex w-full flex-col rounded-xl"
          style={{ backgroundColor: "var(--color-primary-100)" }}
        >
          <div className="w-full overflow-hidden rounded-xl">
            <svg
              viewBox="0 0 588 264"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden tablet:block tablet:w-full"
            >
              <path
                d="M143.698 124.899C111.849 124.899 113.222 96.8 54.8571 96.8H0V264H588V219.413H533.143C501.716 219.413 429.775 192.336 375.577 192.336C321.379 192.336 267.18 140.736 222.481 140.736C177.781 140.736 175.546 124.899 143.698 124.899Z"
                style={{ fill: "var(--color-primary-200)" }}
              />
              <path
                d="M56 97C114.086 97 112.72 124.958 144.416 124.958C176.112 124.958 178.336 140.717 222.822 140.717C267.308 140.717 321.248 192.058 375.187 192.058C429.126 192.058 500.723 219 532 219"
                style={{ stroke: "var(--color-primary-main)" }}
                strokeWidth="6"
              />
              <circle
                cx="532"
                cy="219"
                r="8"
                style={{
                  fill: "var(--color-primary-main)",
                  stroke: "var(--color-primary-100)",
                }}
                strokeWidth="4"
              />
              <circle
                cx="56"
                cy="97"
                r="8"
                style={{
                  fill: "var(--color-primary-main)",
                  stroke: "var(--color-primary-100)",
                }}
                strokeWidth="4"
              />
            </svg>
            <svg
              viewBox="0 0 343 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block w-full tablet:hidden"
            >
              <path
                d="M83.8236 100.167C65.2453 100.167 66.046 80 32 80H0V200H343V168H311C292.668 168 250.702 148.567 219.086 148.567C187.471 148.567 155.855 111.533 129.78 111.533C103.706 111.533 102.402 100.167 83.8236 100.167Z"
                style={{ fill: "var(--color-primary-200)" }}
              />
              <path
                d="M32 80C66.046 80 65.2453 100.167 83.8236 100.167C102.402 100.167 103.706 111.533 129.78 111.533C155.855 111.533 187.471 148.567 219.086 148.567C250.702 148.567 292.668 168 311 168"
                style={{ stroke: "var(--color-primary-main)" }}
                strokeWidth="4"
              />
              <circle
                cx="311"
                cy="168"
                r="8"
                style={{
                  fill: "var(--color-primary-main)",
                  stroke: "var(--color-primary-100)",
                }}
                strokeWidth="4"
              />
              <circle
                cx="32"
                cy="80"
                r="8"
                style={{
                  fill: "var(--color-primary-main)",
                  stroke: "var(--color-primary-100)",
                }}
                strokeWidth="4"
              />
            </svg>
          </div>

          <div
            className="absolute bottom-[72%] left-4 inline-flex items-center rounded-[0.5rem] bg-white px-4 py-1.5 shadow-sm tablet:left-6"
            style={{ color: "var(--color-neutral-black)" }}
          >
            <p className="body-large font-semibold text-current">{startLabel}</p>
          </div>

          <div
            className="absolute bottom-20 right-4 inline-flex items-center rounded-[0.5rem] px-4 py-1.5 shadow-sm tablet:bottom-[5.75rem] tablet:right-6"
            style={{
              backgroundColor: "var(--color-primary-main)",
              color: "var(--color-neutral-white)",
            }}
          >
            <p className="body-large font-semibold text-current">{endLabel}</p>
          </div>
        </div>
      </div>

      <Button
        id="quiz__next-question-button"
        type="button"
        className="mt-8 tablet:max-w-sm"
        onClick={onNext}
      >
        Next
      </Button>
    </>
  );
}
