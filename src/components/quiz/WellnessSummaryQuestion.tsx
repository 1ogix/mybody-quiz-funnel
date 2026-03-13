"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

interface WellnessSummaryQuestionProps {
  gender?: string;
  heightValue?: string;
  weightValue?: string;
  mainGoalValue?: string;
  activityLevelValue?: string;
  onNext: () => void;
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
    /^(\d+(?:\.\d+)?)\s*ft\s*(\d+(?:\.\d+)?)\s*in$/,
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
    /^(\d+(?:\.\d+)?)\s*'\s*(\d+(?:\.\d+)?)\s*"?$/,
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

function getBmiCategory(bmi: number): "underweight" | "normal" | "overweight" | "obese" {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

function getEnergyLevel(activityLevelValue?: string): string {
  switch (activityLevelValue) {
    case "not_active":
      return "Low";
    case "walk_only":
    case "one_two_times_week":
      return "Average";
    case "three_five_times_week":
      return "High";
    default:
      return "Average";
  }
}

function getMainGoal(mainGoalValue?: string): string {
  switch (mainGoalValue) {
    case "balance_blood_sugar":
      return "Balance blood sugar";
    case "boost_energy":
      return "Boost energy";
    case "lose_weight":
    default:
      return "Lose weight";
  }
}

function getBodyImageSrc(gender: string, bmi: number): string {
  const isMale = gender === "male";
  if (bmi >= 30) {
    return isMale
      ? "/images/body_fat_32_man.e0643ed1.png"
      : "/images/body_fat_32_woman.18cc422e.png";
  }

  return isMale
    ? "/images/body_fat_14_20_man.39a641ea.png"
    : "/images/body_fat_14_20_woman.e5105a13.png";
}

function getRiskMessage(bmi: number): string {
  if (bmi >= 30) {
    return "You're heavily overweight, which drastically raises your chance of heart failure, diabetes, stroke, and even early death.";
  }

  if (bmi >= 25) {
    return "You're currently overweight, which can raise your risk of metabolic and cardiovascular issues over time.";
  }

  if (bmi >= 18.5) {
    return "Your BMI is in a healthier range. A personalized plan can still help improve body composition and long-term energy.";
  }

  return "Your BMI is below the healthy range, and a tailored nutrition plan can help you gain strength in a balanced way.";
}

export default function WellnessSummaryQuestion({
  gender,
  heightValue,
  weightValue,
  mainGoalValue,
  activityLevelValue,
  onNext,
}: WellnessSummaryQuestionProps) {
  const heightMeters = parseHeightToMeters(heightValue);
  const weightKg = parseWeightToKg(weightValue);
  const hasBmiData = heightMeters !== null && weightKg !== null;
  const bmiRaw = hasBmiData ? weightKg / (heightMeters * heightMeters) : 34.37;
  const bmi = Math.round(bmiRaw * 100) / 100;
  const category = getBmiCategory(bmi);
  const goalLabel = getMainGoal(mainGoalValue);
  const energyLabel = getEnergyLevel(activityLevelValue);
  const imageSrc = getBodyImageSrc(gender === "male" ? "male" : "female", bmi);
  const riskMessage = getRiskMessage(bmi);

  const markerColumnClass =
    category === "normal" ? "col-start-1" : category === "overweight" ? "col-start-2" : "col-start-3";
  const bmiColorClass =
    category === "normal" ? "text-success-main" : category === "overweight" ? "text-warning-main" : "text-danger-main";
  const categoryLabel =
    category === "underweight"
      ? "Underweight"
      : category === "normal"
        ? "Normal"
        : category === "overweight"
          ? "Overweight"
          : "Obese";

  return (
    <>
      <h4 className="headline4 mb-8 text-center">Your wellness summary</h4>

      <div className="mx-auto flex w-full max-w-96 flex-col gap-8">
        <div className="flex flex-col items-center rounded-xl bg-neutral-white px-4 py-6 shadow-l">
          <h6 className="headline6 mb-4">Body mass index</h6>

          <div className={`mb-4 flex flex-wrap items-center gap-2 ${bmiColorClass}`}>
            <h2 className="headline2">{bmi.toFixed(2)}</h2>
            <h6 className="headline6">{categoryLabel}</h6>
          </div>

          <div className="w-full">
            <div className="mb-1 grid grid-cols-3 gap-1">
              <div className={`flex h-10 items-center justify-center ${markerColumnClass}`}>
                <svg
                  width="32"
                  height="18"
                  viewBox="0 0 32 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2526 17.1592C15.6504 17.6067 16.3496 17.6067 16.7474 17.1592L30.8165 1.33149C31.275 0.815571 30.9088 0 30.2185 0H1.78147C1.0912 0 0.724951 0.815573 1.18355 1.33149L15.2526 17.1592Z"
                    className="fill-secondary-main"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1">
              <div className="body-small flex h-9 items-center justify-center rounded-l-m bg-success-main px-2 font-semibold text-neutral-white tablet:body-large">
                18.5-24.9
              </div>
              <div className="body-small flex h-9 items-center justify-center bg-warning-main px-2 font-semibold text-neutral-white tablet:body-large">
                25-29.9
              </div>
              <div className="body-small flex h-9 items-center justify-center rounded-r-m bg-danger-main px-2 font-semibold text-neutral-white tablet:body-large">
                30.0&lt;
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between rounded-m border border-solid border-primary-200 bg-primary-100">
          <div className="flex flex-col gap-4 self-center p-4">
            <div className="flex items-center gap-4">
              <div className="size-10 min-w-10 text-[2.375rem] leading-10">🚀</div>
              <div>
                <p className="caption mb-0.5 text-secondary-600">Goal</p>
                <p className="body-regular font-semibold text-primary-main">{goalLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-10 min-w-10 text-[2.375rem] leading-10">⚡</div>
              <div>
                <p className="caption mb-0.5 text-secondary-600">Energy level</p>
                <p className="body-regular font-semibold text-primary-main">{energyLabel}</p>
              </div>
            </div>
          </div>

          <div className="mt-1.5 self-end">
            <Image
              src={imageSrc}
              alt="Body image"
              width={384}
              height={294}
              className="h-[12.5rem] w-auto object-contain object-bottom tablet:h-[18.375rem]"
              priority={false}
            />
          </div>
        </div>

        <div className="flex items-start rounded-m bg-success-200 p-4">
          <p className="body-regular">
            <strong>{riskMessage.split(",")[0]},</strong>
            {riskMessage.slice(riskMessage.indexOf(",") + 1)}
          </p>
        </div>

        <Button
          id="quiz__next-question-button"
          type="button"
          className="w-full"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </>
  );
}
