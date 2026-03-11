"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";

interface Plan {
  id: string;
  label: string;
  duration: string;
  originalPrice: string;
  salePrice: string;
  perDay: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "7day",
    label: "7-day plan",
    duration: "for first 7 days",
    originalPrice: "$22.20",
    salePrice: "$6.93",
    perDay: "$0.99",
  },
  {
    id: "1month",
    label: "1-month plan",
    duration: "for first month",
    originalPrice: "$44.40",
    salePrice: "$15.19",
    perDay: "$0.51",
    popular: true,
  },
  {
    id: "3month",
    label: "3-month plan",
    duration: "for first 3 months",
    originalPrice: "$75.49",
    salePrice: "$25.99",
    perDay: "$0.29",
  },
];

export default function OfferPage() {
  const [selected, setSelected] = useState("1month");
  const [promoApplied] = useState(true);

  useEffect(() => {
    // Mark offer as seen in localStorage
    try {
      const raw = localStorage.getItem("mybody_quiz_state");
      if (raw) {
        const state = JSON.parse(raw);
        state.offerSeenAt = Date.now();
        localStorage.setItem("mybody_quiz_state", JSON.stringify(state));
      }
    } catch {}
  }, []);

  const selectedPlan = PLANS.find((p) => p.id === selected)!;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 quiz-container py-6 flex flex-col gap-5">
        {/* Heading */}
        <h1 className="text-xl font-semibold text-center" style={{ color: "#292b2c" }}>
          Select Your Transformation
        </h1>

        {/* Promo badge */}
        {promoApplied && (
          <div
            className="flex items-center justify-center gap-2 text-sm font-medium px-3 py-2 rounded-[0.75rem]"
            style={{ backgroundColor: "#e6f2ff", color: "#027aff" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ca455" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Your promo code has been successfully applied
          </div>
        )}

        {/* Plan cards */}
        <div className="flex flex-col gap-3">
          {PLANS.map((plan) => {
            const isSelected = selected === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className="w-full relative rounded-[0.75rem] border-[1.5px] p-4 text-left transition-all duration-150"
                style={{
                  borderColor: isSelected ? "#027aff" : "color-mix(in srgb, #292b2c 15%, transparent)",
                  backgroundColor: isSelected ? "#f0f8fb" : "#ffffff",
                }}
              >
                {/* Most popular badge */}
                {plan.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#027aff", color: "#ffffff" }}
                  >
                    MOST POPULAR
                  </span>
                )}

                <div className="flex items-center gap-3">
                  {/* Radio */}
                  <span
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      borderColor: isSelected ? "#027aff" : "#9ca3af",
                      backgroundColor: isSelected ? "#027aff" : "transparent",
                    }}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>

                  {/* Plan details */}
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: "#292b2c" }}>
                      {plan.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                      <span className="line-through mr-1" style={{ color: "#9ca3af" }}>
                        {plan.originalPrice}
                      </span>
                      {plan.salePrice}{" "}
                      <span>{plan.duration}</span>
                    </p>
                  </div>

                  {/* Per day price */}
                  <div className="text-right">
                    <span className="text-2xl font-bold" style={{ color: "#292b2c" }}>
                      ${plan.perDay.replace("$", "").split(".")[0]}
                      <span className="text-sm font-semibold">.{plan.perDay.split(".")[1]}</span>
                    </span>
                    <p className="text-xs" style={{ color: "#6b7280" }}>per day</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 mt-2">
          <Button>
            Get My Plan →
          </Button>

          {/* Trust signals */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6b7280" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1ca455" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Guaranteed safe checkout
            </div>
            {/* Payment icons */}
            <div className="flex items-center gap-3">
              {["VISA", "MC", "AMEX", "DISC"].map((card) => (
                <span
                  key={card}
                  className="text-[10px] font-bold px-2 py-1 rounded border"
                  style={{
                    borderColor: "#e5e7eb",
                    color: "#374151",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fine print */}
        <p className="text-xs text-center leading-relaxed" style={{ color: "#9ca3af" }}>
          By clicking ORDER NOW, I agree to pay {selectedPlan.salePrice} for my plan and that,
          if I do not cancel before the end of the introductory period, my subscription will
          automatically charge at the regular price. I can cancel by contacting{" "}
          <a href="mailto:hello@mybody.health" className="underline" style={{ color: "#027aff" }}>
            hello@mybody.health
          </a>
          . <a href="#" className="underline" style={{ color: "#027aff" }}>Subscription Terms</a>
        </p>
      </main>
    </div>
  );
}
