"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

interface SpecialistsQuestionProps {
  onNext: () => void;
}

const SPECIALISTS = [
  {
    name: "Elle Jackson",
    role: "Director of Nutritional Science",
    imageSrc: "/images/elle_jackson.225e1d7b.png",
  },
  {
    name: "SaRene Brooks",
    role: "Lead Consultant for Weight Loss Medicine",
    imageSrc: "/images/sarene_brooks.fff838c3.png",
  },
  {
    name: "Kathryn Gentile",
    role: "Senior Specialist in Physical Wellness",
    imageSrc: "/images/kathryn_gentile.70c6d655.png",
  },
  {
    name: "Tavia Vital",
    role: "Head of Metabolic Health and Diabetes Care",
    imageSrc: "/images/travia_vital.ce786b83.png",
  },
];

export default function SpecialistsQuestion({ onNext }: SpecialistsQuestionProps) {
  return (
    <>
      <h4 className="headline4 text-center">
        Your plan, created by certified specialists you can trust
      </h4>

      <div className="flex w-full flex-col items-center gap-4">
        {SPECIALISTS.map((specialist) => (
          <div
            key={specialist.name}
            className="flex w-full max-w-96 items-center rounded-xl border border-solid border-secondary-100 bg-neutral-white p-6 shadow-l"
          >
            <Image
              src={specialist.imageSrc}
              alt="Consultant"
              width={192}
              height={192}
              sizes="6rem"
              className="size-20 shrink-0 rounded-full desktop:size-24"
            />

            <div className="ml-4">
              <p className="body-regular font-semibold">{specialist.name}</p>
              <p className="body-small mt-2 text-secondary-800">{specialist.role}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        id="quiz__next-question-button"
        type="button"
        className="w-full tablet:max-w-sm"
        onClick={onNext}
      >
        Next
      </Button>
    </>
  );
}
