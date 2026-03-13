"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MyBodyLogo from "@/components/layout/MyBodyLogo";
import { useQuizState } from "@/hooks/useQuizState";
import { FUNNEL_CODE } from "@/data/funnelRoutes";

const SECTION_CONTAINER =
  "[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-(--section-container-gutter-internal) mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] [--section-grid-columns:4] [--section-grid-spacing:1rem] grid grid-cols-[repeat(var(--section-grid-columns),1fr)] gap-x-(--section-grid-spacing) tablet:[--section-grid-columns:8] tablet:[--section-grid-spacing:1.5rem] desktop:[--section-grid-columns:12] desktop:[--section-grid-spacing:2rem]";

const PLANS = [
  {
    id: "1-month",
    label: "1-month membership",
    subtitle: "Ideal solution for trying out the plan",
    originalPerDay: "1.39",
    perDay: "0.48",
    originalTotal: "41.82",
    total: "14.49",
    banner: true,
    bannerText: "MOST POPULAR - SAVE 65%",
  },
  {
    id: "3-month",
    label: "3-month membership",
    subtitle: "Great for building new healthy habits",
    originalPerDay: "0.80",
    perDay: "0.28",
    originalTotal: "72.35",
    total: "25.20",
    banner: false,
    bannerText: "",
  },
  {
    id: "6-month",
    label: "6-month membership",
    subtitle: "For achieving the best health results",
    originalPerDay: "0.48",
    perDay: "0.17",
    originalTotal: "86.50",
    total: "29.99",
    banner: false,
    bannerText: "",
  },
];

const REVIEWS = [
  {
    name: "Sophia M.",
    avatar: "/images/sophia.4cf9d633.png",
    text: "Dropped 8 lbs in just a few weeks without feeling hungry. The recipes are delicious and so easy to make. I finally feel in control of my health!",
  },
  {
    name: "Marcus H.",
    avatar: "/images/marcus.03eeba7f.png",
    text: "The plan is simple to follow and fits into my busy schedule. My energy levels are up and I\u2019m sleeping better than I have in years.",
  },
  {
    name: "Lily S.",
    avatar: "/images/lily.38cdbead.png",
    text: "I feel amazing! \uD83D\uDCAA\uD83E\uDD51\u2728 My cravings are gone and I actually look forward to my meals. Best investment I\u2019ve ever made in myself.",
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
    <div className="flex gap-0.5 text-warning-main">
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
    </div>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getPromoCode() {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" }).toLowerCase();
  const day = now.getDate();
  return `user_${month}${day}`;
}

function DiscountBadgeSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block shrink-0 align-middle leading-none size-6 text-primary-main"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.3991 9.146L21.1193 9.866C21.6895 10.426 21.9997 11.186 21.9997 11.986C22.0097 12.786 21.6995 13.547 21.1393 14.116C21.1327 14.1233 21.126 14.1298 21.1193 14.1362C21.116 14.1394 21.1127 14.1427 21.1093 14.146L20.3991 14.856C20.119 15.136 19.9589 15.516 19.9589 15.917V16.946C19.9589 18.606 18.6084 19.957 16.9478 19.957H15.9174C15.5173 19.957 15.1372 20.116 14.8571 20.396L14.1368 21.116C13.5466 21.707 12.7763 21.996 12.006 21.996C11.2357 21.996 10.4655 21.707 9.87526 21.127L9.14499 20.396C8.86489 20.116 8.48475 19.957 8.08461 19.957H7.05423C5.39363 19.957 4.04314 18.606 4.04314 16.946V15.917C4.04314 15.516 3.88308 15.136 3.60298 14.846L2.88272 14.136C1.7123 12.967 1.70229 11.056 2.87272 9.877L3.60298 9.146C3.88308 8.866 4.04314 8.486 4.04314 8.076V7.056C4.04314 5.396 5.39363 4.047 7.05423 4.047H8.08461C8.48475 4.047 8.86489 3.886 9.14499 3.606L9.86525 2.886C11.0357 1.707 12.9464 1.707 14.1268 2.877L14.8571 3.606C15.1372 3.886 15.5173 4.047 15.9174 4.047H16.9478C18.6084 4.047 19.9589 5.396 19.9589 7.056V8.087C19.9589 8.486 20.119 8.866 20.3991 9.146ZM9.42509 15.446C9.66518 15.446 9.88526 15.356 10.0453 15.186L15.1872 10.047C15.5273 9.707 15.5273 9.146 15.1872 8.806C14.8471 8.467 14.2969 8.467 13.9567 8.806L8.81487 13.946C8.47475 14.286 8.47475 14.846 8.81487 15.186C8.97493 15.356 9.19501 15.446 9.42509 15.446ZM13.6966 14.566C13.6966 15.056 14.0868 15.446 14.577 15.446C15.0571 15.446 15.4473 15.056 15.4473 14.566C15.4473 14.087 15.0571 13.696 14.577 13.696C14.0868 13.696 13.6966 14.087 13.6966 14.566ZM9.4351 8.556C9.91527 8.556 10.3054 8.946 10.3054 9.426C10.3054 9.917 9.91527 10.306 9.4351 10.306C8.95492 10.306 8.55478 9.917 8.55478 9.426C8.55478 8.946 8.95492 8.556 9.4351 8.556Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GreenCheckSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block shrink-0 align-middle leading-none size-6 text-success-main"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6877 7.27405C20.0887 7.65388 20.1058 8.28681 19.726 8.68775L10.726 18.1877C10.3472 18.5876 9.71639 18.6059 9.31509 18.2286L4.31509 13.5286C3.91268 13.1504 3.89311 12.5175 4.27138 12.1151C4.64964 11.7127 5.2825 11.6931 5.68491 12.0714L9.95912 16.0891L18.274 7.31226C18.6539 6.91133 19.2868 6.89422 19.6877 7.27405Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RefreshSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block shrink-0 align-middle leading-none size-6"
    >
      <path
        d="M18.0885 18.6291C16.8014 19.8109 15.1979 20.5925 13.4738 20.8786C11.7497 21.1646 9.97952 20.9427 8.37946 20.24C6.7794 19.5372 5.41866 18.384 4.46338 16.9211C3.64518 15.6681 3.15475 14.2344 3.03109 12.7511C2.99669 12.3384 3.33572 12.0021 3.7499 12.0021C4.16417 12.0021 4.4961 12.3388 4.53747 12.751C4.66242 13.9958 5.09764 15.194 5.80853 16.2334C6.66107 17.4799 7.87034 18.44 9.27798 18.988C10.6856 19.5361 12.226 19.6464 13.6975 19.3047C15.1689 18.9629 16.5028 18.185 17.5245 17.0728H15.345C15.1461 17.0728 14.9553 16.9938 14.8147 16.8532C14.674 16.7126 14.595 16.5219 14.595 16.3231C14.595 16.1243 14.674 15.9336 14.8147 15.793C14.9553 15.6524 15.1461 15.5734 15.345 15.5734H18.8385C19.0374 15.5734 19.2282 15.6524 19.3688 15.793C19.5095 15.9336 19.5885 16.1243 19.5885 16.3231V19.812C19.5885 20.0108 19.5095 20.2015 19.3688 20.3421C19.2282 20.4827 19.0374 20.5617 18.8385 20.5617C18.6396 20.5617 18.4488 20.4827 18.3082 20.3421C18.1675 20.2015 18.0885 20.0108 18.0885 19.812V18.6276V18.6291ZM6.47551 6.93287H8.65501C8.85393 6.93287 9.04469 7.01185 9.18534 7.15244C9.326 7.29303 9.40501 7.48371 9.40501 7.68253C9.40501 7.88135 9.326 8.07203 9.18534 8.21262C9.04469 8.35321 8.85393 8.43219 8.65501 8.43219H5.16001C4.9611 8.43219 4.77034 8.35321 4.62968 8.21262C4.48903 8.07203 4.41001 7.88135 4.41001 7.68253V4.19062C4.41001 3.9918 4.48903 3.80112 4.62968 3.66053C4.77034 3.51994 4.9611 3.44096 5.16001 3.44096C5.35893 3.44096 5.54969 3.51994 5.69034 3.66053C5.831 3.80112 5.91001 3.9918 5.91001 4.19062V5.37508C7.19695 4.19182 8.80085 3.40891 10.5257 3.12202C12.2506 2.83513 14.0217 3.05669 15.6227 3.75963C17.2236 4.46256 18.585 5.61643 19.5405 7.0802C20.359 8.3341 20.8493 9.76888 20.9723 11.2532C21.0065 11.6659 20.6674 12.0021 20.2533 12.0021C19.8389 12.0021 19.5069 11.6653 19.4656 11.253C19.3406 10.008 18.9053 8.80975 18.1942 7.77028C17.3415 6.52364 16.132 5.5635 14.7241 5.0156C13.3162 4.4677 11.7755 4.35759 10.304 4.6997C8.83241 5.04181 7.49851 5.82019 6.47701 6.93287H6.47551Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShieldCheckSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block shrink-0 align-middle leading-none mb-8 size-20 text-success-main"
    >
      <path
        d="M22.4242 12.6583C22.7539 12.2814 22.7539 11.7187 22.4242 11.3417L20.8423 9.53291C20.662 9.32672 20.5742 9.0556 20.5993 8.78284L20.8195 6.39277C20.8656 5.89328 20.5344 5.43697 20.0453 5.32586L17.7103 4.79548C17.442 4.73454 17.2107 4.56576 17.0707 4.32887L15.8473 2.2574C15.5915 1.82432 15.0538 1.64862 14.5917 1.84708L12.3945 2.79057C12.1426 2.89875 11.8573 2.89875 11.6054 2.79057L9.4071 1.8466C8.94541 1.64835 8.40831 1.82346 8.15219 2.25574L6.93004 4.31852C6.78958 4.5556 6.55752 4.7242 6.28864 4.78453L3.95721 5.30765C3.46688 5.41767 3.13436 5.87448 3.18034 6.3749L3.4008 8.77402C3.4258 9.04608 3.3384 9.31653 3.15891 9.52251L1.57348 11.3418C1.24492 11.7189 1.24542 12.2807 1.57465 12.6571L3.15765 14.4672C3.33791 14.6733 3.42577 14.9444 3.40071 15.217L3.18013 17.6174C3.13424 18.1168 3.46537 18.573 3.95443 18.6841L6.29041 19.2147C6.55824 19.2755 6.78925 19.4438 6.92924 19.6801L8.15107 21.7424C8.40767 22.1755 8.9462 22.3503 9.40826 22.1505L11.6044 21.201C11.8569 21.0919 12.1432 21.0915 12.3959 21.2L14.5928 22.1434C15.0545 22.3417 15.5916 22.1665 15.8477 21.7343L17.0707 19.6701C17.2106 19.4338 17.4417 19.2655 17.7095 19.2047L20.0453 18.6741C20.5344 18.563 20.8656 18.1067 20.8195 17.6072L20.5993 15.2172C20.5742 14.9444 20.662 14.6733 20.8423 14.4671L22.4242 12.6583ZM9.37995 16.01L6.99995 13.61C6.60995 13.22 6.60995 12.59 6.99995 12.2L7.06995 12.13C7.45995 11.74 8.09995 11.74 8.48995 12.13L9.39216 13.0378C9.7826 13.4307 10.418 13.4314 10.8092 13.0393L15.2499 8.59C15.6399 8.2 16.2799 8.2 16.6699 8.59L16.7399 8.66C17.1299 9.05 17.1299 9.68 16.7399 10.07L10.8199 16.01C10.4099 16.4 9.77995 16.4 9.37995 16.01Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronArrowSvg() {
  return (
    <svg
      viewBox="0 0 80 105"
      fill="none"
      className="inline-block shrink-0 align-middle leading-none absolute left-1/2 -translate-x-1/3 top-1/5 text-primary-400 w-20 h-[6.5rem]"
    >
      <path
        d="M1.40809 34.0248C-0.461613 32.1502 -0.46814 29.1042 1.39353 27.2215C3.25519 25.3388 6.28007 25.3322 8.14978 27.2069L30.3552 49.4705C31.2556 50.3733 31.7617 51.6 31.7617 52.8795C31.7617 54.159 31.2556 55.3857 30.3552 56.2885L8.14978 78.5521C6.28007 80.4268 3.25519 80.4202 1.39353 78.5375C-0.46814 76.6547 -0.461613 73.6088 1.40809 71.7342L20.2134 52.8795L1.40809 34.0248Z"
        fill="currentColor"
      />
      <path
        d="M21.856 15.9387C18.3185 12.3036 18.3062 6.39724 21.8284 2.74645C25.3507 -0.904349 31.0738 -0.91708 34.6113 2.71801L76.6239 45.8896C78.3275 47.6402 79.2852 50.019 79.2852 52.5C79.2852 54.981 78.3275 57.3598 76.6239 59.1103L34.6113 102.282C31.0738 105.917 25.3507 105.904 21.8284 102.254C18.3062 98.6028 18.3185 92.6964 21.856 89.0613L57.4358 52.5L21.856 15.9387Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlansSection({
  selectedPlan,
  onSelectPlan,
  timerDisplay,
  promoCode,
  onGetPlan,
}: {
  selectedPlan: string;
  onSelectPlan: (id: string) => void;
  timerDisplay: string;
  promoCode: string;
  onGetPlan: () => void;
}) {
  return (
    <section className="section-p-large" id="checkout__products-section">
      <div className={SECTION_CONTAINER}>
        <div className="col-span-full desktop:col-[4/-4]">
          <h2 className="headline3 mb-4 text-center">
            Your A1C management plan is customized and waiting!
          </h2>

          {/* Promo code coupon */}
          <div className="bg-primary-100 rounded-xl p-6 mb-8">
            <div className="flex flex-col tablet:flex-row tablet:items-center gap-6">
              {/* Left side */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <DiscountBadgeSvg />
                  <span className="body-regular font-semibold">
                    Your promo code applied!
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={promoCode}
                    className="w-full h-12 px-4 pr-12 rounded-l border border-solid border-primary-200 bg-neutral-white body-regular font-medium"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    <GreenCheckSvg />
                  </span>
                </div>
              </div>

              {/* Dashed separator */}
              <div className="hidden tablet:flex flex-col items-center relative">
                <div className="w-0 h-full border-l border-dashed border-primary-400" />
                <div className="absolute -top-3 w-6 h-6 rounded-full bg-primary-100" />
                <div className="absolute -bottom-3 w-6 h-6 rounded-full bg-primary-100" />
              </div>
              <div className="tablet:hidden border-t border-dashed border-primary-400 relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary-100" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary-100" />
              </div>

              {/* Right side */}
              <div className="flex-1">
                <div className="tablet:hidden relative mb-3">
                  <input
                    type="text"
                    readOnly
                    value={promoCode}
                    className="w-full h-12 px-4 pr-12 rounded-l border border-solid border-primary-200 bg-neutral-white body-regular font-medium"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    <GreenCheckSvg />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="body-regular text-secondary-600">
                    Expires in:
                  </span>
                  <span className="title-regular text-danger-main">
                    {timerDisplay}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 desktop:grid-cols-3 gap-4 desktop:gap-8 mb-6">
            {PLANS.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => onSelectPlan(plan.id)}
                  className={`text-left rounded-xl bg-neutral-white overflow-hidden cursor-pointer border-none p-0 ${
                    isSelected
                      ? "!shadow-[0_0_0_0.125rem_var(--color-primary-main)]"
                      : "!shadow-[0_0_0_0.0625rem_var(--color-secondary-400)]"
                  }`}
                >
                  {plan.banner && (
                    <div className="bg-banner-meadow-green text-banner-white body-small font-semibold text-center py-2 px-4">
                      MOST POPULAR - SAVE{" "}
                      <span className="text-banner-dandelion">65%</span>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      {/* Radio button */}
                      <div
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-primary-main"
                            : "border-secondary-400"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-main" />
                        )}
                      </div>
                      <div>
                        <p className="body-regular font-semibold">
                          {plan.label}
                        </p>
                        <p className="body-small text-secondary-600">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="body-small line-through text-secondary-400">
                        USD {plan.originalPerDay}
                      </span>
                      <span className="title-small text-primary-main">
                        USD {plan.perDay}
                      </span>
                      <span className="body-small text-secondary-600">
                        / day
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="caption text-secondary-400">
                        Total:
                      </span>
                      <span className="caption line-through text-secondary-400">
                        USD {plan.originalTotal}
                      </span>
                      <span className="body-small font-semibold">
                        USD {plan.total}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* T&Cs + CTA */}
          <p className="caption text-secondary-600 text-center mb-4">
            By continuing, you agree to the{" "}
            <a href="#" className="underline">
              Terms &amp; Conditions
            </a>
            ,{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            , and{" "}
            <a href="#" className="underline">
              Subscription Terms
            </a>
            .
          </p>

          <button
            type="button"
            onClick={onGetPlan}
            className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid border-transparent text-center font-semibold text-neutral-white bg-primary-main w-full h-12 px-3 rounded-l body-regular hover:bg-primary-600 active:scale-[0.98] transition-all"
          >
            Get your plan
          </button>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 mt-6 p-4 bg-tertiary-100 rounded-l">
            <span className="text-secondary-600 shrink-0 mt-0.5">
              <RefreshSvg />
            </span>
            <p className="caption text-secondary-600">
              Your subscription renews automatically. You can cancel at any time
              through your account settings. No refunds for partial billing
              periods. Prices may vary by region and are subject to change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const PLAN_PRODUCT_IDS: Record<string, string> = {
  "1-month": "692",
  "3-month": "693",
  "6-month": "694",
};

function ResultHeader() {
  return (
    <header
      className="border-b"
      style={{ borderColor: "var(--color-secondary-200)" }}
    >
      <div className="relative mx-auto flex h-16 max-w-[calc(76rem+2rem)] items-center px-4 tablet:h-20 tablet:max-w-[calc(76rem+4rem)] tablet:px-8 w-full">
        <MyBodyLogo className="absolute left-1/2 top-1/2 h-9 -translate-x-1/2 -translate-y-1/2 tablet:h-10" />
      </div>
    </header>
  );
}

export default function CheckoutResultPage() {
  const router = useRouter();
  const { answers } = useQuizState();
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [selectedPlan, setSelectedPlan] = useState("1-month");
  const [showGuaranteeModal, setShowGuaranteeModal] = useState(false);

  const gender = (answers[1] as string) || "female";
  const isMale = gender === "male";

  const promoCode = getPromoCode();
  const timerDisplay = formatTime(secondsLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const beforeBodyImg = isMale
    ? "/images/body_fat_32_man.e0643ed1.png"
    : "/images/body_fat_32_woman.18cc422e.png";
  const afterBodyImg = isMale
    ? "/images/body_fat_14_20_man.39a641ea.png"
    : "/images/body_fat_14_20_woman.e5105a13.png";
  const beforeAfterImg = isMale
    ? "/images/before_after_man.d38b5047.png"
    : "/images/before_after_woman.18e37f45.png";

  const scrollToPlans = () => {
    document
      .getElementById("checkout__products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGetPlan = () => {
    const productId = PLAN_PRODUCT_IDS[selectedPlan] ?? "692";
    router.push(
      `/checkout/uni-s-mb-pbp-sugar?code=${FUNNEL_CODE}&step=payment&productId=${productId}`,
    );
  };

  return (
    <div className="min-h-screen bg-tertiary-100">
      <ResultHeader />

      {/* Section 1: Sticky discount bar */}
      <div className="p-4 sticky z-sticky bg-tertiary-100 top-0">
        <div className="flex items-center justify-between gap-4 max-w-[39rem] mx-auto">
          <div className="flex items-center gap-2">
            <span className="body-small text-secondary-main whitespace-nowrap">
              Discount reserved for
            </span>
            <span className="title-regular text-danger-main">
              {timerDisplay}
            </span>
          </div>
          <button
            type="button"
            onClick={scrollToPlans}
            className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid border-transparent text-center font-semibold text-neutral-white bg-primary-main w-fit h-12 px-3 rounded-l body-regular hover:bg-primary-600 active:scale-[0.98] transition-all whitespace-nowrap"
          >
            Get your plan
          </button>
        </div>
      </div>

      {/* Section 2: Body comparison */}
      <section className="section-p-small pb-0 desktop:pt-24">
        <div className={SECTION_CONTAINER}>
          <div className="col-span-full desktop:col-[4/-4]">
            <div className="bg-primary-100 rounded-m border border-solid border-primary-200 p-4 grid grid-cols-2 gap-8 mb-4 relative">
              {/* Before */}
              <div className="flex flex-col items-center">
                <div className="relative h-[12.5rem] w-full mb-3">
                  <Image
                    src={beforeBodyImg}
                    alt="Before body"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
                <p className="body-small font-semibold text-center mb-1">
                  Body fat
                </p>
                <p className="title-small text-center text-danger-main">
                  &gt;32%
                </p>
                <p className="body-small text-center mt-2">
                  Wellness{" "}
                  <span className="font-semibold text-danger-main">
                    Low 📉
                  </span>
                </p>
              </div>

              {/* Center chevron */}
              <ChevronArrowSvg />

              {/* After */}
              <div className="flex flex-col items-center">
                <div className="relative h-[12.5rem] w-full mb-3">
                  <Image
                    src={afterBodyImg}
                    alt="After body"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
                <p className="body-small font-semibold text-center mb-1">
                  Body fat
                </p>
                <p className="title-small text-center text-success-main">
                  14-20%
                </p>
                <p className="body-small text-center mt-2">
                  Wellness{" "}
                  <span className="font-semibold text-success-main">
                    High 📈
                  </span>
                </p>
              </div>
            </div>
            <p className="col-span-full caption text-center">
              Individual results may vary.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Plans */}
      <PlansSection
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
        timerDisplay={timerDisplay}
        promoCode={promoCode}
        onGetPlan={handleGetPlan}
      />

      {/* Section 4: App screenshots */}
      <section className="section-p-large section-bg-tertiary-400 bg-[var(--section-background-color,transparent)]">
        <div className={SECTION_CONTAINER}>
          <div className="col-span-full desktop:col-[4/-4]">
            <h2 className="headline4 text-center mb-8">
              Track your wins and stay motivated
            </h2>

            {/* Desktop: grid */}
            <div className="hidden tablet:grid grid-cols-3 gap-6">
              <div className="relative h-[28rem] rounded-xl overflow-hidden">
                <Image
                  src="/images/app_screen_desktop_1.1f76468d.png"
                  alt="App screenshot 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[28rem] rounded-xl overflow-hidden">
                <Image
                  src="/images/app_screen_desktop_2.fc3be34b.png"
                  alt="App screenshot 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[28rem] rounded-xl overflow-hidden">
                <Image
                  src="/images/app_screen_desktop_3.54ce925e.png"
                  alt="App screenshot 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="tablet:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
              <div className="relative h-[24rem] min-w-[80%] rounded-xl overflow-hidden snap-start shrink-0">
                <Image
                  src="/images/app_screen_desktop_1.1f76468d.png"
                  alt="App screenshot 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[24rem] min-w-[80%] rounded-xl overflow-hidden snap-start shrink-0">
                <Image
                  src="/images/app_screen_desktop_2.fc3be34b.png"
                  alt="App screenshot 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[24rem] min-w-[80%] rounded-xl overflow-hidden snap-start shrink-0">
                <Image
                  src="/images/app_screen_desktop_3.54ce925e.png"
                  alt="App screenshot 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Success stories */}
      <section className="section-p-large">
        <div className={SECTION_CONTAINER}>
          <div className="col-span-full desktop:col-[4/-4]">
            <h2 className="headline4 text-center mb-8">
              Success stories from our members
            </h2>

            <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
              {REVIEWS.map((review) => (
                <div
                  key={review.name}
                  className="bg-neutral-white rounded-xl p-6 shadow-l"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="body-regular font-semibold">
                        {review.name}
                      </p>
                      <FiveStars />
                    </div>
                  </div>
                  <p className="body-small text-secondary-800">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Before/after */}
      <section className="section-p-large section-bg-tertiary-400 bg-[var(--section-background-color,transparent)]">
        <div className={SECTION_CONTAINER}>
          <div className="col-span-full desktop:col-[4/-4]">
            <h2 className="headline4 text-center mb-8">
              They did this – you can too
            </h2>
            <div className="relative w-full max-w-lg mx-auto mb-4">
              <Image
                src={beforeAfterImg}
                alt="Before and after transformation"
                width={800}
                height={600}
                className="w-full h-auto rounded-xl"
              />
            </div>
            <p className="caption text-center text-secondary-600">
              Individual results may vary.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Plans (repeated) */}
      <PlansSection
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
        timerDisplay={timerDisplay}
        promoCode={promoCode}
        onGetPlan={handleGetPlan}
      />

      {/* Section 8: Money-back guarantee */}
      <section className="section-bg-tertiary-400 section-p-large bg-[var(--section-background-color,transparent)]">
        <div className={SECTION_CONTAINER}>
          <div className="col-span-full desktop:col-[4/-4] flex flex-col items-center text-center">
            <ShieldCheckSvg />
            <h2 className="headline3 mb-4">30 days money-back guarantee</h2>
            <p className="body-regular text-secondary-800 mb-4 max-w-lg">
              We are confident you will love your plan. If for any reason you
              are not satisfied, we offer a full refund within the first 30 days
              of your purchase — no questions asked.
            </p>
            <button
              type="button"
              onClick={() => setShowGuaranteeModal(true)}
              className="body-small text-primary-main underline font-medium cursor-pointer bg-transparent border-none p-0"
            >
              Learn about applicable limitations.
            </button>
          </div>
        </div>
      </section>

      {showGuaranteeModal && (
        <div
          data-state="open"
          className="p-0 fixed left-0 top-0 flex items-center justify-center h-dvh w-screen bg-[rgba(0,0,0,0.6)] tablet:p-8"
          style={{ zIndex: "var(--z-index-overlay)" }}
          style={{ pointerEvents: "auto" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowGuaranteeModal(false);
          }}
        >
          <div
            role="dialog"
            aria-labelledby="guarantee-title"
            data-state="open"
            className="relative max-h-full w-full origin-center overflow-auto bg-tertiary-100 px-6 pb-6 pt-[4.5rem] shadow-l data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in tablet:px-10 tablet:pb-10 desktop:p-[4.5rem] h-full max-w-full rounded-none tablet:h-auto tablet:max-w-[50rem] tablet:rounded-xl"
            tabIndex={-1}
            style={{ pointerEvents: "auto" }}
          >
            <div className="sr-only">
              <h2 id="guarantee-title">
                30 days money-back guarantee policy
              </h2>
            </div>
            <div className="body-small grid gap-6 text-secondary-800 desktop:gap-8">
              <h4 className="headline4 text-center text-secondary-main">
                30 days money-back guarantee policy
              </h4>
              <div className="[&_p:not(:first-of-type)]:pt-6 [&_p:not(:first-of-type)]:desktop:pt-8 [&_strong]:font-semibold [&_ul]:ml-6 [&_ul]:mt-2 [&_ul]:list-outside [&_ul]:list-disc whitespace-pre-wrap">
                <p>
                  MyBody offers a money-back guarantee in addition to any refund
                  rights provided by our{" "}
                  <a
                    target="_blank"
                    className="text-primary-main underline text-secondary-800"
                    href="/general-conditions"
                  >
                    Terms&amp;Conditions
                  </a>{" "}
                  and applicable laws. If you made a purchase directly on our
                  website and were explicitly offered a money-back option during
                  checkout, you may qualify for a refund, provided the following
                  conditions are met:
                </p>
                <p>
                  <strong>Eligibility Criteria:</strong>
                </p>
                <ul>
                  <li>
                    You must submit your refund request by emailing
                    hello@mybody.health within 30 days of your initial purchase.
                  </li>
                  <li>
                    You must have followed the plan for at least{" "}
                    <strong>7 consecutive days</strong> (for monthly and more
                    lengthy subscription periods) or for at least{" "}
                    <strong>3 consecutive days</strong> (for weekly subscription
                    periods) and provide proof of compliance. Acceptable proof
                    includes a screen recording or screenshots of your{" "}
                    <strong>streak number</strong> on your home screen, showing
                    your personal progress.
                  </li>
                  <li>
                    We will review your request and notify you via email whether
                    your refund has been approved.
                  </li>
                </ul>
                <p>
                  <strong>Important Notes:</strong>
                </p>
                <ul>
                  <li>
                    A refund will only be issued if all the above conditions are
                    fulfilled.
                  </li>
                  <li>
                    If you do not fulfill the conditions outlined in our
                    Money-Back Guarantee, the fees you have paid are
                    non-refundable and cannot be exchanged, except as stated in
                    this policy or as required by applicable law. Additionally,
                    our company may review certain refund requests on a
                    case-by-case basis and approve them at its sole discretion.
                  </li>
                </ul>
              </div>
              <p className="caption">
                If you have any questions regarding this policy, feel free to
                reach out to our support team.
              </p>
              <button
                type="button"
                onClick={() => setShowGuaranteeModal(false)}
                className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid border-transparent text-center font-semibold text-neutral-white bg-primary-main w-full h-12 px-3 rounded-l body-regular m-auto max-w-[25.5rem] hover:bg-primary-600 transition-colors"
              >
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                    Close window
                  </div>
                </div>
              </button>
            </div>
            <button
              className="absolute right-4 top-4 flex cursor-pointer items-center justify-center w-10 h-10 rounded-s border-[1.5px] border-solid border-transparent bg-transparent text-secondary-main hover:text-primary-600 transition-colors"
              type="button"
              aria-label="Close"
              onClick={() => setShowGuaranteeModal(false)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="inline-block shrink-0 align-middle leading-none size-5"
              >
                <path
                  d="M18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
