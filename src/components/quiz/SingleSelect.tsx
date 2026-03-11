"use client";

import { Answer } from "@/types/quiz";
import AnswerButton from "./AnswerButton";

interface SingleSelectProps {
  answers: Answer[];
  selected?: string;
  onSelect: (answerId: string) => void;
}

export default function SingleSelect({
  answers,
  selected,
  onSelect,
}: SingleSelectProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {answers.map((answer, i) => (
        <AnswerButton
          key={answer.id}
          label={answer.label}
          emoji={answer.emoji}
          selected={selected === answer.id}
          onClick={() => onSelect(answer.id)}
          delay={i * 60}
        />
      ))}
    </div>
  );
}
