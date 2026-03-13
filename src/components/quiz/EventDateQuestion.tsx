"use client";

import { FormEvent, useState } from "react";

interface EventDateQuestionProps {
  onNext: (value: string) => void;
}

export default function EventDateQuestion({ onNext }: EventDateQuestionProps) {
  const [eventDate, setEventDate] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!eventDate) return;
    onNext(eventDate);
  }

  return (
    <>
      <div className="mb-4 flex flex-col-reverse gap-4">
        <p
          id="quiz__subtitle-event_date--question-with-title"
          className="body-large text-secondary-800"
        >
          We&apos;ll create your plan to help you reach your goal and shine on
          your big day. Your information stays private.
        </p>
        <p
          id="quiz__title-event_date--question-with-title"
          className="overflow body-large break-words font-semibold"
        >
          When&apos;s your event?
        </p>
      </div>

      <form
        className="mt-8 flex flex-col gap-8 tablet:gap-12 desktop:mt-12"
        onSubmit={handleSubmit}
      >
        <div role="group">
          <label
            htmlFor="quiz__event-date-input"
            className="body-small mb-2 block font-semibold"
          >
            Your date
          </label>
          <div className="flex h-12 cursor-text items-center rounded-xl border border-solid border-secondary-200 bg-neutral-white px-3 text-secondary-main transition-colors focus-within:border-secondary-main hover:border-secondary-main">
            <input
              id="quiz__event-date-input"
              type="date"
              autoCapitalize="off"
              placeholder="Your date"
              name="eventDate"
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
              className="h-full w-full appearance-none border-none bg-transparent text-body-regular font-regular text-current focus:outline-hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          id="quiz__next-question-button"
          disabled={!eventDate}
          className="relative mx-auto flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-l border-[1.5px] border-solid border-transparent bg-primary-main px-3 text-center body-regular font-semibold text-neutral-white outline-hidden transition-colors hover-btn:bg-primary-600 disabled-btn:cursor-default disabled-btn:bg-secondary-200 disabled-btn:pointer-events-none tablet:max-w-96"
        >
          <div className="flex w-full items-center justify-center gap-2 opacity-100">
            <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
              Next
            </div>
          </div>
        </button>
      </form>
    </>
  );
}
