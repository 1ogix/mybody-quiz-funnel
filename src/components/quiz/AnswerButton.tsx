"use client";

import { useState } from "react";

interface AnswerButtonProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick: () => void;
  delay?: number;
}

export default function AnswerButton({
  label,
  emoji,
  selected = false,
  onClick,
  delay = 0,
}: AnswerButtonProps) {
  const [pressed, setPressed] = useState(false);

  function handleClick() {
    setPressed(true);
    onClick();
  }

  return (
    <button
      onClick={handleClick}
      style={{
        animationDelay: `${delay}ms`,
        borderColor: selected ? "#027aff" : "color-mix(in srgb, #292b2c 15%, transparent)",
        backgroundColor: selected ? "#e6f2ff" : "#ffffff",
        color: selected ? "#027aff" : "#292b2c",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        transition: "all 0.15s ease",
      }}
      className="
        w-full h-12 px-4
        border-[1.5px] border-solid rounded-[0.75rem]
        flex items-center gap-3
        font-semibold text-base
        hover:border-[#027aff] hover:bg-[#e6f2ff]
        active:scale-[0.98]
        animate-fade-in
        cursor-pointer
        outline-none
        focus-visible:ring-2 focus-visible:ring-[#027aff] focus-visible:ring-offset-2
      "
    >
      {emoji && <span className="text-lg leading-none">{emoji}</span>}
      <span>{label}</span>
      {selected && (
        <span className="ml-auto">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1ca455"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
    </button>
  );
}
