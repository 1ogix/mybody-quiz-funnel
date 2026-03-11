"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  loading = false,
  variant = "primary",
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles =
    "w-full h-12 px-3 rounded-[0.75rem] border-[1.5px] border-solid border-transparent font-semibold text-base transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 flex items-center justify-center gap-2";

  const primaryStyles = isDisabled
    ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
    : "bg-[#027aff] text-white hover:bg-[#67afff] active:scale-[0.98] focus-visible:ring-[#027aff]";

  const secondaryStyles =
    "bg-transparent text-[#027aff] border-[#027aff] hover:bg-[#e6f2ff] active:scale-[0.98] focus-visible:ring-[#027aff]";

  return (
    <button
      disabled={isDisabled}
      className={`${baseStyles} ${variant === "primary" ? primaryStyles : secondaryStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
