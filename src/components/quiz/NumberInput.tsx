"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface NumberInputProps {
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  onNext: (value: string) => void;
}

export default function NumberInput({
  placeholder = "Enter value",
  unit = "lbs",
  min = 1,
  max = 999,
  onNext,
}: NumberInputProps) {
  const [value, setValue] = useState("");
  const [activeUnit, setActiveUnit] = useState<string>(unit);
  const [error, setError] = useState("");

  const unitOptions = unit === "lbs" ? ["lbs", "kg"] : [unit];

  function handleSubmit() {
    const num = Number(value);
    if (!value || isNaN(num)) {
      setError("Please enter a valid number.");
      return;
    }
    if (num < min || num > max) {
      setError(`Please enter a value between ${min} and ${max}.`);
      return;
    }
    setError("");
    onNext(`${value} ${activeUnit}`);
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {unitOptions.length > 1 && (
        <div
          className="flex rounded-[0.75rem] border-[1.5px] overflow-hidden self-center"
          style={{
            borderColor: "color-mix(in srgb, #292b2c 15%, transparent)",
          }}
        >
          {unitOptions.map((u) => (
            <button
              key={u}
              onClick={() => setActiveUnit(u)}
              className="px-6 py-1.5 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: activeUnit === u ? "#027aff" : "transparent",
                color: activeUnit === u ? "#fff" : "#292b2c",
              }}
            >
              {u}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          placeholder={placeholder}
          value={value}
          min={min}
          max={max}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full h-14 px-4 pr-16 border-[1.5px] rounded-[0.75rem] text-base font-semibold outline-none transition-colors"
          style={{
            borderColor: error
              ? "#ef4444"
              : "color-mix(in srgb, #292b2c 20%, transparent)",
            color: "#292b2c",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#027aff";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error
              ? "#ef4444"
              : "color-mix(in srgb, #292b2c 20%, transparent)";
          }}
        />
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium"
          style={{ color: "#6b7280" }}
        >
          {activeUnit}
        </span>
      </div>

      {error && (
        <p className="text-sm text-red-500 -mt-2">{error}</p>
      )}

      <Button onClick={handleSubmit} disabled={!value}>
        Continue →
      </Button>
    </div>
  );
}
