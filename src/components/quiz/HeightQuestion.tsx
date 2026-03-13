"use client";

import { FormEvent, useMemo, useState } from "react";
import Button from "@/components/ui/Button";

type HeightUnit = "ft" | "cm";

interface HeightQuestionProps {
  onNext: (value: string) => void;
}

export default function HeightQuestion({ onNext }: HeightQuestionProps) {
  const [unit, setUnit] = useState<HeightUnit>("ft");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [cm, setCm] = useState("");

  const canContinue = useMemo(() => {
    if (unit === "ft") {
      return feet.trim().length > 0 || inches.trim().length > 0;
    }
    return cm.trim().length > 0;
  }, [unit, feet, inches, cm]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue) return;

    const value =
      unit === "ft"
        ? `${feet || "0"} ft ${inches || "0"} in`
        : `${cm || "0"} cm`;

    onNext(value);
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
          onClick={() => setUnit("ft")}
          className="flex h-full cursor-pointer items-center justify-center rounded-[0.5rem] font-medium transition-colors duration-200"
          style={{
            color: "var(--color-secondary-800)",
            backgroundColor:
              unit === "ft" ? "var(--color-neutral-white)" : "transparent",
          }}
        >
          FT
        </button>
        <button
          type="button"
          onClick={() => setUnit("cm")}
          className="flex h-full cursor-pointer items-center justify-center rounded-[0.5rem] font-medium transition-colors duration-200"
          style={{
            color: "var(--color-secondary-800)",
            backgroundColor:
              unit === "cm" ? "var(--color-neutral-white)" : "transparent",
          }}
        >
          CM
        </button>
      </div>

      <form
        id={`quiz__height-question-desktop--input-${unit}`}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {unit === "ft" ? (
          <div className="grid grid-cols-2">
            <div role="group">
              <div
                className="relative h-20 border-b px-3 py-2"
                style={{
                  borderColor: "var(--color-secondary-200)",
                  color: "var(--color-secondary-main)",
                }}
              >
                <input
                  id="quiz__height-input-ft"
                  type="number"
                  name="feet"
                  placeholder="0"
                  autoComplete="off"
                  value={feet}
                  onChange={(event) => setFeet(event.target.value)}
                  className="h-full w-full border-none bg-transparent text-center text-[3rem] font-semibold leading-4 caret-[var(--color-primary-main)] [appearance:textfield] placeholder:text-[var(--color-secondary-200)] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute bottom-4 right-3">
                  <p
                    className="body-regular"
                    style={{ color: "var(--color-secondary-600)" }}
                  >
                    ft
                  </p>
                </div>
              </div>
            </div>

            <div role="group">
              <div
                className="relative h-20 border-b px-3 py-2"
                style={{
                  borderColor: "var(--color-secondary-200)",
                  color: "var(--color-secondary-main)",
                }}
              >
                <input
                  id="quiz__height-input-lb"
                  type="number"
                  name="inches"
                  placeholder="0"
                  autoComplete="off"
                  value={inches}
                  onChange={(event) => setInches(event.target.value)}
                  className="h-full w-full border-none bg-transparent text-center text-[3rem] font-semibold leading-4 caret-[var(--color-primary-main)] [appearance:textfield] placeholder:text-[var(--color-secondary-200)] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute bottom-4 right-3">
                  <p
                    className="body-regular"
                    style={{ color: "var(--color-secondary-600)" }}
                  >
                    in
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div role="group">
            <div
              className="relative h-20 border-b px-3 py-2"
              style={{
                borderColor: "var(--color-secondary-200)",
                color: "var(--color-secondary-main)",
              }}
            >
              <input
                id="quiz__height-input-cm"
                type="number"
                name="centimeters"
                placeholder="0"
                autoComplete="off"
                value={cm}
                onChange={(event) => setCm(event.target.value)}
                className="h-full w-full border-none bg-transparent text-center text-[2rem] leading-4 caret-[var(--color-primary-main)] [appearance:textfield] placeholder:text-[var(--color-secondary-200)] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="absolute bottom-4 right-3">
                <p
                  className="body-regular"
                  style={{ color: "var(--color-secondary-600)" }}
                >
                  cm
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 desktop:mt-8">
          <div
            className="flex items-start rounded-[0.5rem] p-4"
            style={{ backgroundColor: "var(--color-success-200)" }}
          >
            <p className="body-regular">
              <span>We&apos;ll use this to calculate your BMI and tailor your plan.</span>
            </p>
          </div>
        </div>

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
