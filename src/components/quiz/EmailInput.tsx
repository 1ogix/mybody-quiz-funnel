"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface EmailInputProps {
  onNext: (email: string) => void;
}

export default function EmailInput({ onNext }: EmailInputProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  async function handleSubmit() {
    if (!validate(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate brief delay before advancing
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    onNext(email);
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Trust badges */}
      <div className="flex items-center gap-2 text-sm" style={{ color: "#6b7280" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ca455" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>Your data is safe and private</span>
      </div>

      <div className="relative">
        <input
          type="email"
          inputMode="email"
          placeholder="yourname@email.com"
          value={email}
          autoComplete="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full h-14 px-4 border-[1.5px] rounded-[0.75rem] text-base outline-none transition-colors"
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
      </div>

      {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

      <Button onClick={handleSubmit} loading={loading} disabled={!email}>
        Get My Plan →
      </Button>

      <p className="text-xs text-center" style={{ color: "#6b7280" }}>
        By continuing, you agree to our{" "}
        <a href="#" className="underline hover:text-[#027aff]">Terms</a> and{" "}
        <a href="#" className="underline hover:text-[#027aff]">Privacy Policy</a>.
      </p>
    </div>
  );
}
