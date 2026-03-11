"use client";

import MyBodyLogo from "./MyBodyLogo";

interface QuizHeaderProps {
  progress: number; // 0–100
  onBack?: () => void;
  showBack?: boolean;
}

export default function QuizHeader({
  progress,
  onBack,
  showBack = true,
}: QuizHeaderProps) {
  const translateX = -(100 - progress);

  return (
    <header
      className="border-b [--linear-progress-height:0.25rem]"
      style={{
        borderColor: "var(--color-secondary-200)",
      } as React.CSSProperties}
    >
      <div
        className="relative mx-auto mb-[calc(var(--linear-progress-height)*-1)] flex h-[calc(4rem+var(--linear-progress-height))] max-w-[calc(76rem+2rem)] items-center px-4 tablet:h-[calc(5rem+var(--linear-progress-height))] tablet:max-w-[calc(76rem+4rem)] tablet:px-8"
        style={{
          width: "100%",
        }}
      >
        {showBack && (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-s border-[1.5px] border-transparent bg-transparent transition-colors tablet:size-12 [&>svg]:size-6"
            style={{
              color: "var(--color-primary-main)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary-600)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-primary-main)")
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width={20}
              height={20}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}

        <MyBodyLogo className="absolute left-1/2 top-1/2 h-9 -translate-x-1/2 -translate-y-1/2 tablet:h-10" />
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="relative w-full overflow-hidden"
        style={{
          height: "var(--linear-progress-height, 0.25rem)",
          backgroundColor: "var(--color-secondary-200)",
        }}
      >
        <div
          className="size-full transition-transform duration-200 ease-linear"
          style={{
            backgroundColor: "var(--color-primary-main)",
            transform: `translateX(${translateX}%)`,
          }}
        />
      </div>
    </header>
  );
}
