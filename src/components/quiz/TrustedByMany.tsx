"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

interface Props {
  gender: string;
  onNext: () => void;
}

export default function TrustedByMany({ gender, onNext }: Props) {
  const isMale = gender === "male";
  const genderWord = isMale ? "men" : "women";
  const imgSrc = isMale
    ? "/images/trusted-by-many-men.802ec732.png"
    : "/images/trusted_by_many_women_sugar.42028cc5.png";

  return (
    <div
      data-testid="quiz__question-trusted_by_many"
      className="animate-fade-in flex flex-col items-center gap-6 desktop:gap-12"
    >
      <h4
        className="headline4 text-center"
        id="quiz__title--info-question"
        style={{ color: "var(--color-secondary-main)" }}
      >
        Join 750k+ {genderWord} using{" "}
        <span style={{ color: "var(--color-primary-main)" }}>MyBody</span> to
        balance sugar and feel better
      </h4>
      <Image
        src={imgSrc}
        alt={`750k+ ${genderWord} using MyBody`}
        width={484}
        height={474}
        className="w-80 tablet:w-[30.25rem]"
        priority
      />
      <div className="w-full tablet:max-w-sm">
        <Button id="quiz__next-question-button" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
