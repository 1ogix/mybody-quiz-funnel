"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({ showBack = false, onBack }: HeaderProps) {
  const router = useRouter();

  function handleBack() {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  }

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b"
      style={{ borderColor: "color-mix(in srgb, #292b2c 10%, transparent)" }}
    >
      <div className="quiz-container h-16 md:h-20 flex items-center relative">
        {showBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="absolute left-4 md:left-8 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Logo */}
        <div className="mx-auto">
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: "#027aff" }}
          >
            my<span style={{ color: "#292b2c" }}>body</span>
          </span>
        </div>
      </div>
    </header>
  );
}
