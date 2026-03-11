"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";

const STATS = [
  { label: "Users who reduced A1C", value: "93%" },
  { label: "Average weight lost", value: "12 lbs" },
  { label: "Days to see results", value: "7" },
];

const BENEFITS = [
  "Personalized meal plan tailored to your A1C levels",
  "Simple recipes under 30 minutes",
  "Grocery list included",
  "Progress tracking & weekly check-ins",
  "24/7 support from nutrition experts",
];

export default function ResultsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 quiz-container py-8 flex flex-col gap-8">
        {/* Hero result */}
        <div
          className="rounded-[1rem] p-6 text-center"
          style={{ backgroundColor: "#e6f2ff" }}
        >
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: "#027aff" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold mb-2" style={{ color: "#292b2c" }}>
            Your personalised plan is ready!
          </h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            Based on your answers, we built a custom A1C management plan just for you.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[0.75rem] p-3 text-center border"
              style={{ borderColor: "color-mix(in srgb, #292b2c 10%, transparent)" }}
            >
              <p className="text-2xl font-bold" style={{ color: "#027aff" }}>
                {stat.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-semibold" style={{ color: "#292b2c" }}>
            What you get with your plan:
          </h2>
          {BENEFITS.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3 text-sm" style={{ color: "#292b2c" }}>
              <svg
                className="flex-shrink-0 mt-0.5"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1ca455"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {benefit}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Button onClick={() => router.push("/offer")}>
            Get My Plan →
          </Button>
          <p className="text-xs text-center" style={{ color: "#6b7280" }}>
            🔒 Secure checkout · Cancel anytime
          </p>
        </div>
      </main>
    </div>
  );
}
