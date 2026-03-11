"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import { FUNNEL_CODE, getCheckoutPath } from "@/data/funnelRoutes";

const MESSAGES = [
  "Analyzing your answers...",
  "Calculating your metabolism...",
  "Building your personalized plan...",
  "Checking meal recommendations...",
  "Almost there...",
];

const TOTAL_DURATION_MS = 4000;
const STEP_DURATION = TOTAL_DURATION_MS / MESSAGES.length;

export default function FunnelLoaderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const code = searchParams.get("code") || FUNNEL_CODE;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / TOTAL_DURATION_MS) * 100, 100);
      setProgress(percent);

      const msgIndex = Math.min(
        Math.floor(elapsed / STEP_DURATION),
        MESSAGES.length - 1
      );
      setMessageIndex(msgIndex);

      if (elapsed >= TOTAL_DURATION_MS) {
        clearInterval(interval);
        router.push(getCheckoutPath(code));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center quiz-container py-12 gap-10">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#e6f2ff" }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#027aff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full h-3 rounded-full overflow-hidden bg-gray-100">
            <div
              className="h-full rounded-full transition-all duration-100 ease-linear"
              style={{
                width: `${progress}%`,
                backgroundColor: "#027aff",
              }}
            />
          </div>

          <p
            className="text-center text-base font-medium transition-all duration-300"
            style={{ color: "#292b2c" }}
          >
            {MESSAGES[messageIndex]}
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          {MESSAGES.slice(0, -1).map((msg, i) => {
            const done = messageIndex > i;
            const active = messageIndex === i;
            return (
              <div
                key={msg}
                className="flex items-center gap-3 text-sm transition-opacity duration-300"
                style={{ opacity: active || done ? 1 : 0.35 }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor: done ? "#1ca455" : active ? "#027aff" : "#e5e7eb",
                  }}
                >
                  {done ? (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : active ? (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  ) : null}
                </span>
                <span style={{ color: done ? "#1ca455" : active ? "#292b2c" : "#9ca3af" }}>
                  {msg}
                </span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
