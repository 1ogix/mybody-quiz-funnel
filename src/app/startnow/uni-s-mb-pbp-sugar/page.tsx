"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import MyBodyLogo from "@/components/layout/MyBodyLogo";

const BULLETS = [
  "See real changes in just 7 days",
  "Crush cravings with tasty meals",
  "Slim down with no extreme rules",
];

const AIC_OPTIONS = [
  { id: "high", label: "> 6.4" },
  { id: "pre", label: "5.7 - 6.4" },
  { id: "normal", label: "< 5.6" },
  { id: "unknown", label: "I don't know" },
];

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block shrink-0 align-middle leading-none size-6"
    style={{ color: "var(--color-success-main)" }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.1008 10.4108C16.4625 9.99341 16.4174 9.36185 16.0001 9.00014C15.5827 8.63844 14.9512 8.68355 14.5895 9.1009L10.7478 13.5336L9.41429 12.2001C9.02377 11.8096 8.3906 11.8096 8.00008 12.2001C7.60955 12.5907 7.60955 13.2238 8.00008 13.6144L10.093 15.7073C10.5033 16.1176 11.1757 16.0936 11.5558 15.6551L16.1008 10.4108Z"
      fill="currentColor"
    />
  </svg>
);

export default function StartnowPage() {
  const router = useRouter();

  function handleSelect(id: string) {
    try {
      const state = JSON.parse(
        localStorage.getItem("mybody_quiz_state") || "{}"
      );
      state.answers = { ...state.answers, 0: id };
      state.savedAt = Date.now();
      localStorage.setItem("mybody_quiz_state", JSON.stringify(state));
    } catch {
      // localStorage not available (SSR or private browsing)
    }
    router.push("/quiz/uni-s-mb-pbp-sugar/1");
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header
        className="startnow-header relative z-50 flex items-center justify-center bg-white border-b"
        style={{ borderColor: "var(--color-secondary-200)" }}
      >
        <MyBodyLogo className="h-10" />
      </header>

      {/* ── Hero section ────────────────────────────────────────────────── */}
      {/*
       * `relative`       → positioning context for absolute fill images
       * `startnow-hero`  → h-[calc(100vh-4rem)] / desktop:h-[calc(100vh-5rem)]
       * `section-p-hero` → pt-6/pb-10 → pt-12/pb-12 → pt-24/pb-24
       *
       * Mirrors: <section class="relative h-[calc(100vh-4rem)]
       *                           section-p-hero desktop:h-[calc(100vh-5rem)]">
       */}
      <section className="startnow-hero section-p-hero relative flex justify-center">

        {/*
         * Grid container — matches original class string:
         *   max-w-[calc(containerWidth + 2×gutter)] px-(gutter) mx-auto
         *   4-col/1rem (mobile) → 8-col/1.5rem (tablet) → 12-col/2rem (desktop)
         *
         * Images are children here but position:absolute so they fill <section>.
         */}
        <div className="startnow-container startnow-grid mx-auto h-full">

          {/* ── Background images (absolutely fill the <section>) ─────── */}
          {/* mobile only — block up to tablet (40em / 640px) */}
          <Image
            src="/images/egg_image_mobile.png"
            alt="Egg image"
            fill
            className="object-cover block tablet:hidden"
            priority
            sizes="100vw"
          />
          {/* tablet only — hidden below 640px and above 992px */}
          <Image
            src="/images/egg_image_tablet.png"
            alt="Egg image"
            fill
            className="object-cover hidden tablet:block desktop:hidden"
            priority
            sizes="100vw"
          />
          {/* desktop and above — hidden below 992px */}
          <Image
            src="/images/egg_image_desktop.png"
            alt="Egg image"
            fill
            className="object-cover hidden desktop:block"
            priority
            sizes="100vw"
          />

          {/* ── Content panel ────────────────────────────────────────── */}
          <div className="startnow-content self-center z-10">

            {/* Headline — <div><h2 class="headline2"> */}
            <div>
              <h2 className="headline2">
                Easy-to-follow A1C management plan
              </h2>
            </div>

            {/*
             * Body wrapper — desktop:max-w-96 · [&>*]:mt-6 tablet:mt-8 desktop:mt-12
             * Mirrors: <div class="desktop:max-w-96 [&>*]:mt-6 ...">
             */}
            <div className="startnow-body">

              {/* Bullet list */}
              <ul className="list-none">
                {BULLETS.map((bullet, i) => (
                  <li
                    key={bullet}
                    className={`flex items-start${i > 0 ? " mt-4" : ""}`}
                  >
                    <CheckIcon />
                    <div className="ml-4">
                      {/* body-regular font-medium — matches original <p class="body-regular font-medium"> */}
                      <p className="body-regular font-medium">
                        {bullet}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* A1C selector */}
              <div>
                {/* body-large mb-4 font-semibold — matches <p class="body-large mb-4 font-semibold"> */}
                <p className="body-large mb-4 font-semibold">
                  Select your A1C levels
                </p>

                {/* grid-cols-2 tablet:grid-cols-1 — matches original */}
                <div className="grid gap-2 grid-cols-2 tablet:grid-cols-1">
                  {AIC_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      id={`startnow_button-${opt.id}`}
                      data-testid={`startnow_button-${opt.id}`}
                      onClick={() => handleSelect(opt.id)}
                      className="startnow-btn body-regular"
                    >
                      <div className="flex w-full items-center justify-center gap-2 opacity-100">
                        <div
                          className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
                          style={{ display: "flex", alignItems: "start" }}
                        >
                          <p
                            className="m-auto"
                            style={{ display: "block", whiteSpace: "nowrap" }}
                          >
                            {opt.label}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
