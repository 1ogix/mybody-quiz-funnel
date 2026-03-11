"use client";

interface QuizOptionCardProps {
  id?: string;
  testId?: string;
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick: () => void;
}

export default function QuizOptionCard({
  id,
  testId,
  label,
  emoji,
  selected = false,
  onClick,
}: QuizOptionCardProps) {
  return (
    <button
      id={id}
      data-testid={testId}
      type="button"
      onClick={onClick}
      className="w-full text-left cursor-pointer transition duration-200 ease-linear"
      style={{
        display: "flex",
        minHeight: "5.25rem",
        alignItems: "center",
        borderRadius: "0.75rem",
        border: "1px solid",
        padding: "1rem",
        borderColor: selected
          ? "var(--color-secondary-main)"
          : "var(--color-secondary-200)",
        backgroundColor: selected
          ? "var(--color-secondary-100)"
          : "var(--color-neutral-white)",
        boxShadow: selected ? "0 1px 2px 0 rgba(0,0,0,0.05)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "var(--color-secondary-400)";
          e.currentTarget.style.backgroundColor = "var(--color-secondary-100)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "var(--color-secondary-200)";
          e.currentTarget.style.backgroundColor = "var(--color-neutral-white)";
        }
      }}
    >
      {/* Emoji / image */}
      {emoji && (
        <div
          className="mr-4 shrink-0 flex items-center justify-center overflow-hidden"
          style={{
            width: 48,
            height: 48,
            borderRadius: "0.5rem",
            fontSize: 48,
            lineHeight: 1,
          }}
        >
          {emoji}
        </div>
      )}

      {/* Label */}
      <div className="flex-grow">
        <p
          className="body-large font-medium"
          style={{ color: "var(--color-secondary-main)" }}
        >
          {label}
        </p>
      </div>

      {/* Chevron right */}
      <div className="ml-4 shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          width={24}
          height={24}
          style={{
            color: selected
              ? "var(--color-secondary-main)"
              : "var(--color-secondary-600)",
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.29289 6.29289C8.68342 5.90237 9.31658 5.90237 9.70711 6.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071L9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071C7.90237 17.3166 7.90237 16.6834 8.29289 16.2929L12.5858 12L8.29289 7.70711C7.90237 7.31658 7.90237 6.68342 8.29289 6.29289Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  );
}
