"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MyBodyLogo from "@/components/layout/MyBodyLogo";
import { FUNNEL_CODE, getCheckoutPath } from "@/data/funnelRoutes";

const TOTAL_DURATION_MS = 6000;
const CIRCLE_RADIUS = 20.72;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const REVIEWS = [
  {
    id: 1,
    initials: "CC",
    name: "Caroline C.",
    bgClass: "bg-primary-100",
    textClass: "text-primary-main",
    review:
      "Cravings gone, energy's back, blood sugar finally under 110... Life-changing!!",
  },
  {
    id: 2,
    initials: "DS",
    name: "David S.",
    bgClass: "bg-danger-100",
    textClass: "text-danger-main",
    review:
      "Lost 8 lbs in days! Recipes are easy and work with my groceries. Recommend",
  },
  {
    id: 3,
    initials: "DB",
    name: "Donette B.",
    bgClass: "bg-danger-100",
    textClass: "text-danger-main",
    review:
      "This app makes weight loss feel easy! My sugar's stable and I'm loving the meals \u{1F60D}\u{1F525}",
  },
];

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block shrink-0 align-middle leading-none size-4"
    >
      <path
        d="M17.9189 14.4413C17.6599 14.7055 17.5409 15.0875 17.5999 15.4623L18.4889 20.6409C18.5639 21.0798 18.3879 21.524 18.0389 21.7776C17.6969 22.0408 17.2419 22.0723 16.8689 21.8618L12.4399 19.4304C12.2859 19.3441 12.1149 19.2978 11.9399 19.2925H11.6689C11.5749 19.3073 11.4829 19.3388 11.3989 19.3873L6.96888 21.8303C6.74988 21.946 6.50188 21.9871 6.25888 21.946C5.66688 21.8281 5.27188 21.2345 5.36888 20.6082L6.25888 15.4296C6.31788 15.0518 6.19888 14.6676 5.93988 14.3992L2.32888 10.7152C2.02688 10.4068 1.92188 9.94368 2.05988 9.52581C2.19388 9.109 2.53588 8.80481 2.94888 8.73639L7.91888 7.9775C8.29688 7.93645 8.62888 7.69436 8.79888 7.33649L10.9889 2.61049C11.0409 2.50523 11.1079 2.40839 11.1889 2.32629L11.2789 2.25261C11.3259 2.19788 11.3799 2.15262 11.4399 2.11578L11.5489 2.07368L11.7189 2H12.1399C12.5159 2.04105 12.8469 2.27788 13.0199 2.63154L15.2389 7.33649C15.3989 7.68067 15.7099 7.9196 16.0689 7.9775L21.0389 8.73639C21.4589 8.79955 21.8099 9.10479 21.9489 9.52581C22.0799 9.94789 21.9669 10.411 21.6589 10.7152L17.9189 14.4413Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FiveStars() {
  return (
    <div className="flex items-center text-warning-main">
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
    </div>
  );
}

function FunnelLoaderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const code = searchParams.get("code") || FUNNEL_CODE;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min(
        Math.round((elapsed / TOTAL_DURATION_MS) * 50),
        50,
      );
      setProgress(percent);

      if (elapsed >= TOTAL_DURATION_MS) {
        clearInterval(interval);
        router.push(getCheckoutPath(code));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [router, searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % REVIEWS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const strokeDashoffset =
    CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  const scrollTo = useCallback((index: number) => {
    setActiveSlide(index);
    if (carouselRef.current) {
      const slide = carouselRef.current.children[index] as HTMLElement;
      if (slide) {
        carouselRef.current.scrollTo({
          left: slide.offsetLeft - carouselRef.current.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <>
      <header className="flex h-16 items-center justify-center border-b border-secondary-100 tablet:h-20">
        <MyBodyLogo className="inline-block shrink-0 align-middle leading-none h-9 tablet:h-10" />
      </header>

      <section className="section-p-large bg-[var(--section-background-color,transparent)]">
        <div className="[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-(--section-container-gutter-internal) mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] [--section-grid-columns:4] [--section-grid-spacing:1rem] grid grid-cols-[repeat(var(--section-grid-columns),1fr)] gap-x-(--section-grid-spacing) tablet:[--section-grid-columns:8] tablet:[--section-grid-spacing:1.5rem] desktop:[--section-grid-columns:12] desktop:[--section-grid-spacing:2rem]">
          <div className="flex w-full flex-col items-center col-span-full">
            <div className="relative mb-8 w-[7.5rem] tablet:mb-12 tablet:w-[10.75rem] desktop:mb-16">
              <div
                className="inline-flex -rotate-90 items-stretch text-primary-main"
                role="progressbar"
                aria-valuenow={progress}
              >
                <svg width="100%" viewBox="22 22 44 44">
                  <circle
                    className="stroke-secondary-200 transition-[stroke-dashoffset] duration-300 ease-linear"
                    cx="44"
                    cy="44"
                    r={CIRCLE_RADIUS}
                    fill="none"
                    strokeWidth="2.56"
                  />
                  <circle
                    className="w-full stroke-current transition-[stroke-dashoffset] duration-300 ease-linear"
                    style={{
                      strokeDasharray: CIRCUMFERENCE,
                      strokeDashoffset,
                    }}
                    cx="44"
                    cy="44"
                    r={CIRCLE_RADIUS}
                    fill="none"
                    strokeWidth="2.56"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h2 className="headline2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {progress}%
              </h2>
            </div>

            <h4 className="headline4 text-center" id="loader__title">
              Calculating your results...
            </h4>

            <section className="overflow-hidden section-p-small bg-[var(--section-background-color,transparent)] w-full">
              <div className="[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-(--section-container-gutter-internal) mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)]">
                <div className="col-span-full">
                  <div className="relative overflow-hidden">
                    <div
                      ref={carouselRef}
                      className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
                      style={{ scrollbarWidth: "none" }}
                    >
                      {REVIEWS.map((review) => (
                        <div
                          key={review.id}
                          className="min-w-[22rem] max-w-[24rem] flex-shrink-0 snap-center"
                        >
                          <div className="rounded-xl bg-neutral-white shadow-l border border-solid border-secondary-100 p-6 h-full">
                            <div className="flex items-center">
                              <div
                                className={`relative flex size-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ${review.bgClass} ${review.textClass}`}
                              >
                                <p className="body-large font-semibold text-current">
                                  {review.initials}
                                </p>
                              </div>
                              <div className="ml-4 flex-grow items-center">
                                <div className="flex items-center justify-between">
                                  <p className="body-large font-semibold">
                                    {review.name}
                                  </p>
                                </div>
                                <div className="mt-1">
                                  <FiveStars />
                                </div>
                              </div>
                            </div>
                            <p className="body-regular mt-6 text-secondary-800">
                              {review.review}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 tablet:hidden">
                    <div className="m-[-0.375rem] flex flex-row flex-wrap justify-center">
                      {REVIEWS.map((review, i) => (
                        <div
                          key={review.id}
                          className="shrink-0 p-1.5"
                          tabIndex={0}
                          role="button"
                          onClick={() => scrollTo(i)}
                        >
                          <div
                            className={`rounded-full transition-[background-color] duration-200 size-[0.625rem] ${
                              activeSlide === i
                                ? "bg-primary-main"
                                : "bg-secondary-200"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="tablet:mt-12 tablet:flex desktop:hidden hidden items-center justify-center gap-8">
                    <button
                      type="button"
                      onClick={() =>
                        scrollTo(
                          (activeSlide - 1 + REVIEWS.length) % REVIEWS.length,
                        )
                      }
                      className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid text-center font-semibold outline-hidden transition-colors border-current bg-transparent text-primary-main hover-btn:bg-primary-100 !size-12 min-w-12 !rounded-full"
                      id="reviews-carousel-prev-button"
                    >
                      <div className="flex w-full items-center justify-center gap-2 opacity-100">
                        <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="inline-block shrink-0 align-middle leading-none size-8"
                          >
                            <path
                              d="M19.75 11.0246C20.1642 11.0246 20.5 11.3604 20.5 11.7746C20.5 12.1888 20.1642 12.5246 19.75 12.5246H6.56638L11.329 17.2676C11.6225 17.5599 11.6235 18.0347 11.3312 18.3282C11.039 18.6217 10.5641 18.6227 10.2706 18.3304L4.23547 12.3203C4.11677 12.2083 4.0346 12.058 4.00871 11.8892C4.00282 11.8513 3.99982 11.8128 3.99982 11.774C3.99982 11.5745 4.07928 11.3833 4.22063 11.2425L10.2706 5.21853C10.5642 4.92627 11.039 4.92729 11.3313 5.22081C11.6235 5.51434 11.6225 5.98921 11.329 6.28147L6.56542 11.0246H19.75Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        scrollTo((activeSlide + 1) % REVIEWS.length)
                      }
                      className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid text-center font-semibold outline-hidden transition-colors border-current bg-transparent text-primary-main hover-btn:bg-primary-100 !size-12 min-w-12 !rounded-full"
                      id="reviews-carousel-next-button"
                    >
                      <div className="flex w-full items-center justify-center gap-2 opacity-100">
                        <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="inline-block shrink-0 align-middle leading-none size-8"
                          >
                            <path
                              d="M4.75 11.0246C4.33579 11.0246 4 11.3604 4 11.7746C4 12.1888 4.33579 12.5246 4.75 12.5246H17.9336L13.171 17.2676C12.8775 17.5599 12.8765 18.0347 13.1688 18.3282C13.4611 18.6217 13.9359 18.6227 14.2294 18.3304L20.2645 12.3203C20.3832 12.2083 20.4654 12.058 20.4913 11.8892C20.4972 11.8513 20.5002 11.8128 20.5002 11.774C20.5002 11.5745 20.4207 11.3833 20.2794 11.2425L14.2294 5.21854C13.9359 4.92628 13.461 4.92731 13.1687 5.22083C12.8765 5.51435 12.8775 5.98922 13.171 6.28149L17.9346 11.0246H4.75Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default function FunnelLoaderPage() {
  return (
    <Suspense>
      <FunnelLoaderContent />
    </Suspense>
  );
}
