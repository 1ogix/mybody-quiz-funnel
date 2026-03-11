"use client";

interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="w-full h-1 bg-gray-100 overflow-hidden">
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${percent}%`,
          backgroundColor: "#027aff",
        }}
      />
    </div>
  );
}
