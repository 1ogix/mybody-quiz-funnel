"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface PerfectSolutionQuestionProps {
  onNext: () => void;
}

const HEART_PATH =
  "M15.85 2.00016C16.481 2.00016 17.111 2.08916 17.71 2.29016C21.401 3.49016 22.731 7.54016 21.62 11.0802C20.99 12.8892 19.96 14.5402 18.611 15.8892C16.68 17.7592 14.561 19.4192 12.28 20.8492L12.03 21.0002L11.77 20.8392C9.48102 19.4192 7.35002 17.7592 5.40102 15.8792C4.06102 14.5302 3.03002 12.8892 2.39002 11.0802C1.26002 7.54016 2.59002 3.49016 6.32102 2.26916C6.61102 2.16916 6.91002 2.09916 7.21002 2.06016H7.33002C7.61102 2.01916 7.89002 2.00016 8.17002 2.00016H8.28002C8.91002 2.01916 9.52002 2.12916 10.111 2.33016H10.17C10.21 2.34916 10.24 2.37016 10.26 2.38916C10.481 2.46016 10.69 2.54016 10.89 2.65016L11.27 2.82016C11.3618 2.86913 11.4649 2.94396 11.554 3.00863C11.6104 3.0496 11.6612 3.0865 11.7 3.11016C11.7163 3.11979 11.7329 3.12947 11.7496 3.13923C11.8354 3.18928 11.9247 3.24142 12 3.29916C13.111 2.45016 14.46 1.99016 15.85 2.00016ZM18.5098 9.20016C18.9198 9.18916 19.2698 8.86016 19.2998 8.43916V8.32016C19.3298 6.91916 18.4808 5.65016 17.1898 5.16016C16.7798 5.01916 16.3298 5.24016 16.1798 5.66016C16.0398 6.08016 16.2598 6.54016 16.6798 6.68916C17.3208 6.92916 17.7498 7.56016 17.7498 8.25916V8.29016C17.7308 8.51916 17.7998 8.74016 17.9398 8.91016C18.0798 9.08016 18.2898 9.17916 18.5098 9.20016Z";

function HeartBullet({ children }: { children: ReactNode }) {
  return (
    <li className="mt-4 flex items-center first:mt-0">
      <div
        className="flex size-10 flex-shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--color-primary-400)" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="inline-block shrink-0 align-middle leading-none"
          style={{ color: "var(--color-neutral-white)" }}
        >
          <path fillRule="evenodd" clipRule="evenodd" d={HEART_PATH} fill="currentColor" />
        </svg>
      </div>
      <div className="ml-4">
        <p className="body-regular font-normal">{children}</p>
      </div>
    </li>
  );
}

export default function PerfectSolutionQuestion({
  onNext,
}: PerfectSolutionQuestionProps) {
  return (
    <>
      <Image
        src="/images/woman.46fa66bd.png"
        alt="female-perfect solution image"
        width={591}
        height={144}
      />

      <h4 className="headline4" id="quiz__title--info-question">
        The perfect solution is right here!
      </h4>

      <ul className="list-none space-y-8" id="quiz__text--info-question">
        <HeartBullet>
          <strong>Eat what you love</strong> and still lose stubborn fat
        </HeartBullet>
        <HeartBullet>
          <strong>Balance your blood sugar</strong> to boost energy and sleep
          better
        </HeartBullet>
        <HeartBullet>
          <strong>Reach your dream weight</strong> faster and stay there
        </HeartBullet>
      </ul>

      <div
        className="flex items-start rounded-[0.5rem] p-4"
        style={{ backgroundColor: "var(--color-success-200)" }}
      >
        <p className="body-regular">
          💡 Backed by science
          <br />
          <br />
          Studies show that personalized nutrition plans lead to better long-term
          results and higher motivation.
        </p>
      </div>

      <Button
        id="quiz__next-question-button"
        type="button"
        className="mx-auto tablet:max-w-sm"
        onClick={onNext}
      >
        Next
      </Button>
    </>
  );
}
