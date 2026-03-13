"use client";

import Button from "@/components/ui/Button";

interface WeightLossForecastQuestionProps {
  currentWeightValue?: string;
  targetWeightValue?: string;
  eventDateValue?: string;
  onNext: () => void;
}

function parseWeightToKg(raw?: string): number | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  const match = normalized.match(/^(\d+(?:\.\d+)?)\s*(kg|lb)?$/);
  if (!match) return null;
  const numeric = Number(match[1]);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  const unit = match[2] ?? "kg";
  return unit === "lb" ? numeric * 0.45359237 : numeric;
}

function roundToOne(value: number): number {
  return Math.round(value * 10) / 10;
}

export default function WeightLossForecastQuestion({
  currentWeightValue,
  targetWeightValue,
  eventDateValue,
  onNext,
}: WeightLossForecastQuestionProps) {
  const currentWeightKg = parseWeightToKg(currentWeightValue);
  const targetWeightKg = parseWeightToKg(targetWeightValue);
  const hasDynamicWeights = currentWeightKg !== null && targetWeightKg !== null;

  const now = new Date();
  const eventDate = eventDateValue ? new Date(eventDateValue) : null;
  const hasValidEventDate = eventDate !== null && !Number.isNaN(eventDate.getTime());

  const startMonthShort = now.toLocaleDateString("en-US", { month: "short" });
  const endMonthShort = hasValidEventDate
    ? eventDate.toLocaleDateString("en-US", { month: "short" })
    : "Apr";
  const goalByMonthYear = hasValidEventDate
    ? eventDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "April 2026";

  const currentDisplayKg = hasDynamicWeights ? Math.round(currentWeightKg) : 88;
  const targetDisplayKg = hasDynamicWeights ? Math.round(targetWeightKg) : 88;
  const monthOneLossKg = hasDynamicWeights
    ? roundToOne(Math.max(0.8, (currentWeightKg - targetWeightKg) * 0.212))
    : 5.3;

  return (
    <>
      <h4 className="headline4 mb-8 text-center">
        The last plan you&apos;ll ever need to get in shape
      </h4>

      <div className="mb-10 flex w-full flex-col overflow-hidden rounded-xl bg-neutral-white shadow-l desktop:mb-16">
        <div className="p-6 text-center">
          <p className="body-large mb-1 font-semibold">In the 1st month, you can lose:</p>
          <div className="flex items-baseline justify-center">
            <h1 className="headline1 text-primary-main">-{monthOneLossKg.toFixed(1)}&nbsp;</h1>
            <p className="title-small text-primary-main"
            style={{fontWeight:"var(--font-weight-headline)"}}>kg</p>
          </div>
          <div className="my-4 h-px w-full bg-secondary-100" />
          <p className="body-regular mb-1 font-medium text-secondary-800">
            You can reach your goal by:
          </p>
          <h6 className="headline6 text-primary-main">{goalByMonthYear}</h6>
        </div>

        <div className="relative flex min-h-[12.5rem] grow items-end bg-primary-100">
          <div className="w-full">
            <svg
              viewBox="0 0 588 264"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden tablet:block tablet:w-full"
            >
              <path
                d="M143.698 124.899C111.849 124.899 113.222 96.8 54.8571 96.8H0V264H588V219.413H533.143C501.716 219.413 429.775 192.336 375.577 192.336C321.379 192.336 267.18 140.736 222.481 140.736C177.781 140.736 175.546 124.899 143.698 124.899Z"
                className="fill-primary-200"
              />
              <path
                d="M56 97C114.086 97 112.72 124.958 144.416 124.958C176.112 124.958 178.336 140.717 222.822 140.717C267.308 140.717 321.248 192.058 375.187 192.058C429.126 192.058 500.723 219 532 219"
                className="stroke-primary-main"
                strokeWidth="6"
              />
              <circle
                cx="532"
                cy="219"
                r="8"
                className="fill-primary-main stroke-primary-100"
                strokeWidth="4"
              />
              <circle
                cx="56"
                cy="97"
                r="8"
                className="fill-primary-main stroke-primary-100"
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
                className="fill-primary-200"
              />
              <path
                d="M32 80C66.046 80 65.2453 100.167 83.8236 100.167C102.402 100.167 103.706 111.533 129.78 111.533C155.855 111.533 187.471 148.567 219.086 148.567C250.702 148.567 292.668 168 311 168"
                className="stroke-primary-main"
                strokeWidth="4"
              />
              <circle
                cx="311"
                cy="168"
                r="8"
                className="fill-primary-main stroke-primary-100"
                strokeWidth="4"
              />
              <circle
                cx="32"
                cy="80"
                r="8"
                className="fill-primary-main stroke-primary-100"
                strokeWidth="4"
              />
            </svg>
          </div>

          <div className="absolute bottom-[72%] left-4 inline-flex items-center rounded-m bg-neutral-white px-4 py-1.5 shadow-sm tablet:left-6">
            <p className="body-large font-semibold text-current">
              <span className="font-regular">{startMonthShort}</span> {currentDisplayKg} kg
            </p>
          </div>

          <div className="absolute bottom-20 right-4 inline-flex items-center rounded-m bg-primary-main px-4 py-1.5 text-neutral-white shadow-sm tablet:bottom-[5.75rem] tablet:right-6">
            <p className="body-large font-semibold text-current">
              <span className="font-regular">{endMonthShort}</span> {targetDisplayKg} kg
            </p>
          </div>
        </div>
      </div>

      <Button
        id="quiz__next-question-button"
        type="button"
        className="w-full tablet:max-w-sm"
        onClick={onNext}
      >
        Next
      </Button>
    </>
  );
}
