"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import MyBodyLogo from "@/components/layout/MyBodyLogo";
import { useQuizState } from "@/hooks/useQuizState";
import { FUNNEL_CODE } from "@/data/funnelRoutes";

function parseWeightToKg(raw?: string): number | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  const match = normalized.match(/^(\d+(?:\.\d+)?)\s*(kg|lb)?$/);
  if (!match) return null;
  const numeric = Number(match[1]);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  const unit = match[2] ?? "kg";
  return unit === "lb" ? numeric * 0.45359237 : numeric;
}

function CheckoutHeader({
  progress,
  onBack,
}: {
  progress: number;
  onBack?: () => void;
}) {
  const translateX = -(100 - progress);

  return (
    <header
      className="border-b [--linear-progress-height:0.25rem]"
      style={{ borderColor: "var(--color-secondary-200)" }}
    >
      <div className="relative mx-auto mb-[calc(var(--linear-progress-height)*-1)] flex h-[calc(4rem+var(--linear-progress-height))] max-w-[calc(76rem+2rem)] items-center px-4 tablet:h-[calc(5rem+var(--linear-progress-height))] tablet:max-w-[calc(76rem+4rem)] tablet:px-8 w-full">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-s border-[1.5px] border-transparent bg-transparent transition-colors tablet:size-12 [&>svg]:size-6"
            style={{ color: "var(--color-primary-main)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" width={20} height={20} aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}

        <MyBodyLogo className="absolute left-1/2 top-1/2 h-9 -translate-x-1/2 -translate-y-1/2 tablet:h-10" />
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="relative w-full overflow-hidden"
        style={{
          height: "var(--linear-progress-height, 0.25rem)",
          backgroundColor: "var(--color-secondary-200)",
        }}
      >
        <div
          className="size-full transition-transform duration-200 ease-linear"
          style={{
            backgroundColor: "var(--color-primary-main)",
            transform: `translateX(${translateX}%)`,
          }}
        />
      </div>
    </header>
  );
}

function WeightChart({
  currentKg,
  targetKg,
}: {
  currentKg: number;
  targetKg: number;
}) {
  return (
    <div className="w-full relative bg-primary-100 rounded-xl flex flex-col mb-8">
      <div className="w-full rounded-xl overflow-hidden">
        <svg
          viewBox="0 0 588 264"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden tablet:block tablet:w-full"
        >
          <path
            d="M143.698 124.899C111.849 124.899 113.222 96.8 54.8571 96.8H0V264H588V219.413H533.143C501.716 219.413 429.775 192.336 375.577 192.336C321.379 192.336 267.18 140.736 222.481 140.736C177.781 140.736 175.546 124.899 143.698 124.899Z"
            className="fill-primary-200"
          />
          <path
            d="M56 97C114.086 97 112.72 124.958 144.416 124.958C176.112 124.958 178.336 140.717 222.822 140.717C267.308 140.717 321.248 192.058 375.187 192.058C429.126 192.058 500.723 219 532 219"
            className="stroke-primary-main"
            strokeWidth="6"
          />
          <circle cx="532" cy="219" r="8" className="fill-primary-main stroke-primary-100" strokeWidth="4" />
          <circle cx="56" cy="97" r="8" className="fill-primary-main stroke-primary-100" strokeWidth="4" />
        </svg>
        <svg
          viewBox="0 0 343 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full tablet:hidden"
        >
          <path
            d="M83.8236 100.167C65.2453 100.167 66.046 80 32 80H0V200H343V168H311C292.668 168 250.702 148.567 219.086 148.567C187.471 148.567 155.855 111.533 129.78 111.533C103.706 111.533 102.402 100.167 83.8236 100.167Z"
            className="fill-primary-200"
          />
          <path
            d="M32 80C66.046 80 65.2453 100.167 83.8236 100.167C102.402 100.167 103.706 111.533 129.78 111.533C155.855 111.533 187.471 148.567 219.086 148.567C250.702 148.567 292.668 168 311 168"
            className="stroke-primary-main"
            strokeWidth="4"
          />
          <circle cx="311" cy="168" r="8" className="fill-primary-main stroke-primary-100" strokeWidth="4" />
          <circle cx="32" cy="80" r="8" className="fill-primary-main stroke-primary-100" strokeWidth="4" />
        </svg>
      </div>

      <div className="inline-flex items-center pb-1 pr-3 pt-1 body-large bg-neutral-white text-neutral-black pl-3 rounded-m bottom-[72%] left-4 tablet:left-6 absolute px-4 py-1.5 shadow-sm">
        <p className="font-semibold text-current">{currentKg} kg</p>
      </div>
      <div className="inline-flex items-center pb-1 pr-3 pt-1 body-large bg-primary-main text-neutral-white pl-3 rounded-m absolute px-4 py-1.5 shadow-sm bottom-20 right-4 tablet:bottom-[5.75rem] tablet:right-6">
        <p className="font-semibold text-current">{targetKg} kg</p>
      </div>
    </div>
  );
}

function NameStep({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    onSubmit(name.trim());
  }

  return (
    <section className="section-p-large mx-auto bg-[var(--section-background-color,transparent)]">
      <div className="[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-(--section-container-gutter-internal) mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] [--section-grid-columns:4] [--section-grid-spacing:1rem] grid grid-cols-[repeat(var(--section-grid-columns),1fr)] gap-x-(--section-grid-spacing) tablet:[--section-grid-columns:8] tablet:[--section-grid-spacing:1.5rem] desktop:[--section-grid-columns:12] desktop:[--section-grid-spacing:2rem]">
        <div className="col-span-full tablet:col-[2/-2] desktop:col-[4/-4]">
          <h6 id="checkout__name_step--title" className="body-large font-semibold mb-8">
            What&apos;s your name?
          </h6>
          <p className="font-semibold">Name</p>
          <form className="flex flex-col gap-8 tablet:gap-10 mt-2" onSubmit={handleSubmit}>
            <div role="group">
              <div className="flex h-12 items-center rounded-xl border border-solid bg-neutral-white px-3 transition-colors cursor-text text-secondary-main border-secondary-200 focus-within:border-secondary-main hover:border-secondary-main">
                <input
                  id="checkout__name-input"
                  type="text"
                  autoCapitalize="off"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-full w-full appearance-none border-none bg-transparent body-regular font-normal text-current placeholder:text-secondary-600 focus:outline-hidden"
                />
              </div>
            </div>
            <button
              type="submit"
              className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid text-center font-semibold outline-hidden transition-colors disabled-btn:pointer-events-none disabled-btn:cursor-default loading:cursor-default border-transparent text-neutral-white disabled-btn:bg-secondary-200 bg-primary-main hover-btn:bg-primary-600 w-full h-12 px-3 rounded-l body-regular tablet:max-w-96 mx-auto"
              id="checkout__name_form_button"
              disabled={!name.trim() || submitting}
            >
              <div className="flex w-full items-center justify-center gap-2 opacity-100">
                <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">Continue</div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function WeightLossStep({
  currentKg,
  targetKg,
  onContinue,
}: {
  currentKg: number;
  targetKg: number;
  onContinue: () => void;
}) {
  return (
    <section className="section-p-large max-w-[37rem] mx-auto tablet:[--section-container-gutter:0.5rem] bg-[var(--section-background-color,transparent)]">
      <div className="[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-(--section-container-gutter-internal) mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] [--section-grid-columns:4] [--section-grid-spacing:1rem] grid grid-cols-[repeat(var(--section-grid-columns),1fr)] gap-x-(--section-grid-spacing) tablet:[--section-grid-columns:8] tablet:[--section-grid-spacing:1.5rem] desktop:[--section-grid-columns:12] desktop:[--section-grid-spacing:2rem]">
        <div className="col-span-full">
          <h2 className="headline2 text-center">
            Your A1C management plan is ready!
          </h2>
          <p className="body-large text-secondary-800 text-center my-8">
            Let&apos;s reach your goals together
          </p>

          <WeightChart currentKg={currentKg} targetKg={targetKg} />

          <div className="flex items-center rounded-xl border border-success-main bg-success-100 shadow-l">
            <div className="ml-6 my-4 w-20 flex-shrink-0">
              <Image
                alt=""
                width={180}
                height={164}
                className="block h-auto w-full"
                sizes="5rem"
                src="/images/recommendation_widget_image.ed32123c.png"
              />
            </div>
            <p className="body-regular py-4 px-6">
              Based on your data, we recommend to start with our{" "}
              <span className="font-semibold">1-month plan</span> to see
              initial positive results.
            </p>
          </div>

          <button
            type="button"
            className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid text-center font-semibold outline-hidden transition-colors disabled-btn:pointer-events-none disabled-btn:cursor-default loading:cursor-default border-transparent text-neutral-white disabled-btn:bg-secondary-200 bg-primary-main hover-btn:bg-primary-600 w-full h-12 px-3 rounded-l body-regular tablet:max-w-sm mx-auto mt-8"
            id="checkout__see_my_results_button"
            onClick={onContinue}
          >
            <div className="flex w-full items-center justify-center gap-2 opacity-100">
              <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                See My Results
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

const PLAN_DETAILS: Record<
  string,
  { label: string; price: string; fee: string; total: string }
> = {
  "692": {
    label: "1-month membership",
    price: "41.82",
    fee: "2.79",
    total: "44.61",
  },
  "693": {
    label: "3-month membership",
    price: "72.35",
    fee: "2.79",
    total: "75.14",
  },
  "694": {
    label: "6-month membership",
    price: "86.50",
    fee: "2.79",
    total: "89.29",
  },
};

const COUNTRIES = [
  "United States",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "India",
  "Ireland",
  "Italy",
  "Japan",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Portugal",
  "Singapore",
  "South Africa",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
] as const;

const US_STATES_POPULAR = ["California"] as const;

const US_STATES_ALL = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

function RefreshSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block shrink-0 align-middle leading-none size-6 text-secondary-800"
    >
      <path
        d="M18.0885 18.6291C16.8014 19.8109 15.1979 20.5925 13.4738 20.8786C11.7497 21.1646 9.97952 20.9427 8.37946 20.24C6.7794 19.5372 5.41866 18.384 4.46338 16.9211C3.64518 15.6681 3.15475 14.2344 3.03109 12.7511C2.99669 12.3384 3.33572 12.0021 3.7499 12.0021C4.16417 12.0021 4.4961 12.3388 4.53747 12.751C4.66242 13.9958 5.09764 15.194 5.80853 16.2334C6.66107 17.4799 7.87034 18.44 9.27798 18.988C10.6856 19.5361 12.226 19.6464 13.6975 19.3047C15.1689 18.9629 16.5028 18.185 17.5245 17.0728H15.345C15.1461 17.0728 14.9553 16.9938 14.8147 16.8532C14.674 16.7126 14.595 16.5219 14.595 16.3231C14.595 16.1243 14.674 15.9336 14.8147 15.793C14.9553 15.6524 15.1461 15.5734 15.345 15.5734H18.8385C19.0374 15.5734 19.2282 15.6524 19.3688 15.793C19.5095 15.9336 19.5885 16.1243 19.5885 16.3231V19.812C19.5885 20.0108 19.5095 20.2015 19.3688 20.3421C19.2282 20.4827 19.0374 20.5617 18.8385 20.5617C18.6396 20.5617 18.4488 20.4827 18.3082 20.3421C18.1675 20.2015 18.0885 20.0108 18.0885 19.812V18.6276V18.6291ZM6.47551 6.93287H8.65501C8.85393 6.93287 9.04469 7.01185 9.18534 7.15244C9.326 7.29303 9.40501 7.48371 9.40501 7.68253C9.40501 7.88135 9.326 8.07203 9.18534 8.21262C9.04469 8.35321 8.85393 8.43219 8.65501 8.43219H5.16001C4.9611 8.43219 4.77034 8.35321 4.62968 8.21262C4.48903 8.07203 4.41001 7.88135 4.41001 7.68253V4.19062C4.41001 3.9918 4.48903 3.80112 4.62968 3.66053C4.77034 3.51994 4.9611 3.44096 5.16001 3.44096C5.35893 3.44096 5.54969 3.51994 5.69034 3.66053C5.831 3.80112 5.91001 3.9918 5.91001 4.19062V5.37508C7.19695 4.19182 8.80085 3.40891 10.5257 3.12202C12.2506 2.83513 14.0217 3.05669 15.6227 3.75963C17.2236 4.46256 18.585 5.61643 19.5405 7.0802C20.359 8.3341 20.8493 9.76888 20.9723 11.2532C21.0065 11.6659 20.6674 12.0021 20.2533 12.0021C19.8389 12.0021 19.5069 11.6653 19.4656 11.253C19.3406 10.008 18.9053 8.80975 18.1942 7.77028C17.3415 6.52364 16.132 5.5635 14.7241 5.0156C13.3162 4.4677 11.7755 4.35759 10.304 4.6997C8.83241 5.04181 7.49851 5.82019 6.47701 6.93287H6.47551Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LockSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block shrink-0 align-middle leading-none size-6 text-secondary-800"
    >
      <path
        d="M11.6123 16.4256C11.6123 16.8396 11.9483 17.1756 12.3623 17.1756C12.7763 17.1756 13.1123 16.8396 13.1123 16.4256V14.2046C13.1123 13.7906 12.7763 13.4546 12.3623 13.4546C11.9483 13.4546 11.6123 13.7906 11.6123 14.2046V16.4256Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.725 13.1708C20.725 11.1874 19.448 9.49738 17.6728 8.87957V7.30301C17.6728 4.38001 15.2948 2.00201 12.3748 2.00201C10.9538 1.96401 9.62576 2.54101 8.61976 3.53801C7.61476 4.53401 7.05776 5.86301 7.05176 7.30301V8.87974C5.27679 9.49768 4 11.1876 4 13.1708V17.4598C4 19.9648 6.037 22.0018 8.542 22.0018H16.183C18.688 22.0018 20.725 19.9648 20.725 17.4598V13.1708ZM16.1728 7.30301V8.62878H8.55176V7.28601C8.55576 6.27001 8.95476 5.31701 9.67676 4.60301C10.3938 3.89201 11.3428 3.50201 12.3558 3.50201H12.3718C14.4678 3.50201 16.1728 5.20701 16.1728 7.30301ZM8.542 10.1288C6.864 10.1288 5.5 11.4928 5.5 13.1708V17.4598C5.5 19.1378 6.864 20.5018 8.542 20.5018H16.183C17.86 20.5018 19.225 19.1378 19.225 17.4598V13.1708C19.225 11.4928 17.86 10.1288 16.183 10.1288H8.542Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InfoCircleSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block shrink-0 align-middle leading-none size-6 text-secondary-800"
    >
      <path
        d="M12.0088 10.8769C12.4228 10.8769 12.7588 11.2129 12.7588 11.6269V16.0459C12.7588 16.4599 12.4228 16.7959 12.0088 16.7959C11.5948 16.7959 11.2588 16.4599 11.2588 16.0459V11.6269C11.2588 11.2129 11.5948 10.8769 12.0088 10.8769Z"
        fill="currentColor"
      />
      <path
        d="M13.004 8.45398C13.004 7.90098 12.552 7.45398 11.999 7.45398C11.446 7.45398 10.999 7.90098 10.999 8.45398C10.999 9.00698 11.446 9.45398 11.999 9.45398H12.009C12.561 9.45398 13.004 9.00698 13.004 8.45398Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2C6.486 2 2 6.486 2 12ZM3.5 12C3.5 16.6856 7.31443 20.5 12 20.5C16.6856 20.5 20.5 16.6856 20.5 12C20.5 7.31443 16.6856 3.5 12 3.5C7.31443 3.5 3.5 7.31443 3.5 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PaymentStep({
  productId,
  onBack,
}: {
  productId: string;
  onBack: () => void;
}) {
  const plan = PLAN_DETAILS[productId] ?? PLAN_DETAILS["692"];
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [showTaxPicker, setShowTaxPicker] = useState(false);
  const [taxCountry, setTaxCountry] = useState("United States");
  const [taxState, setTaxState] = useState("California");
  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);

  const isUS = taxCountry === "United States";

  return (
    <section className="section-p-hero bg-[var(--section-background-color,transparent)]">
      <div className="[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-(--section-container-gutter-internal) mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] [--section-grid-columns:4] [--section-grid-spacing:1rem] grid grid-cols-[repeat(var(--section-grid-columns),1fr)] gap-x-(--section-grid-spacing) tablet:[--section-grid-columns:8] tablet:[--section-grid-spacing:1.5rem] desktop:[--section-grid-columns:12] desktop:[--section-grid-spacing:2rem]">
        <div className="col-span-full m-auto my-0 grid max-w-122 grid-cols-1">
          <div className="pb-12">
            <p
              className="headline6 mb-6 text-secondary-main"
              id="checkout__order-summary"
            >
              Order summary
            </p>
            <div className="grid gap-x-6 gap-y-3 grid-cols-[1fr_max-content] [&>:nth-of-type(2n)]:text-right">
              <p className="text-secondary-800">
                <span>{plan.label}</span>
              </p>
              <p className="text-secondary-800">USD&nbsp;{plan.price}</p>
              <p className="text-secondary-800">Service fee</p>
              <p className="text-secondary-800">USD&nbsp;{plan.fee}</p>
              <p className="font-semibold text-secondary-800">Total</p>
              <p className="font-semibold text-secondary-800">
                USD&nbsp;{plan.total}
              </p>
            </div>
            {!showTaxPicker ? (
              <p className="mt-12 text-secondary-800 body-small">
                Tax country:{" "}
                <button
                  type="button"
                  className="cursor-pointer underline"
                  onClick={() => setShowTaxPicker(true)}
                >
                  {taxCountry}
                </button>
              </p>
            ) : (
              <div className="grid desktop:grid-cols-2 gap-4 mt-12">
                <div className="relative">
                  <label className="body-small mb-2 block font-semibold">
                    Tax country:
                  </label>
                  <button
                    type="button"
                    className="body-regular group flex h-12 w-full cursor-pointer items-center justify-between rounded-l border border-solid border-secondary-200 bg-neutral-white pl-3 pr-3 text-left text-secondary-main transition-[border-color] duration-200 focus:border-secondary-main focus:outline-hidden active:border-secondary-main active:outline-hidden"
                    aria-haspopup="menu"
                    aria-expanded={countryOpen}
                    data-state={countryOpen ? "open" : "closed"}
                    onClick={() => {
                      setCountryOpen(!countryOpen);
                      setStateOpen(false);
                    }}
                  >
                    {taxCountry}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="inline-block shrink-0 align-middle leading-none size-6 text-secondary-800 transition-transform duration-300 group-data-[state=open]:rotate-180"
                    >
                      <path
                        d="M11.2773 15.6887C11.6764 16.1038 12.3236 16.1038 12.7227 15.6887L17.7589 10.4516C18.274 9.91591 17.9092 9 17.1807 9L6.81932 9C6.09084 9 5.72602 9.91591 6.24113 10.4516L11.2773 15.6887Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  {countryOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-solid border-secondary-200 bg-neutral-white shadow-l">
                      {COUNTRIES.map((c) => (
                        <button
                          key={c}
                          type="button"
                          className={`flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left body-regular transition-colors hover:bg-tertiary-100 ${
                            c === taxCountry
                              ? "font-semibold text-secondary-main"
                              : "text-secondary-800"
                          }`}
                          onClick={() => {
                            setTaxCountry(c);
                            setCountryOpen(false);
                            if (c !== "United States") {
                              setTaxState("");
                            } else if (!taxState) {
                              setTaxState("California");
                            }
                          }}
                        >
                          {c}
                          {c === taxCountry && (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="inline-block shrink-0 size-4 text-secondary-main ml-auto"
                            >
                              <path
                                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                                fill="currentColor"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {isUS && (
                  <div className="relative">
                    <label className="body-small mb-2 block font-semibold">
                      State:
                    </label>
                    <button
                      type="button"
                      className="body-regular group flex h-12 w-full cursor-pointer items-center justify-between rounded-l border border-solid border-secondary-200 bg-neutral-white pl-3 pr-3 text-left text-secondary-main transition-[border-color] duration-200 focus:border-secondary-main focus:outline-hidden active:border-secondary-main active:outline-hidden"
                      aria-haspopup="menu"
                      aria-expanded={stateOpen}
                      data-state={stateOpen ? "open" : "closed"}
                      onClick={() => {
                        setStateOpen(!stateOpen);
                        setCountryOpen(false);
                      }}
                    >
                      {taxState}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="inline-block shrink-0 align-middle leading-none size-6 text-secondary-800 transition-transform duration-300 group-data-[state=open]:rotate-180"
                      >
                        <path
                          d="M11.2773 15.6887C11.6764 16.1038 12.3236 16.1038 12.7227 15.6887L17.7589 10.4516C18.274 9.91591 17.9092 9 17.1807 9L6.81932 9C6.09084 9 5.72602 9.91591 6.24113 10.4516L11.2773 15.6887Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    {stateOpen && (
                      <div className="absolute left-0 top-full z-50 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-solid border-secondary-200 bg-neutral-white shadow-l">
                        <div className="px-4 py-2 body-small text-secondary-600 font-semibold">
                          Most used:
                        </div>
                        {US_STATES_POPULAR.map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left body-regular transition-colors hover:bg-tertiary-100 ${
                              s === taxState
                                ? "font-semibold text-secondary-main"
                                : "text-secondary-800"
                            }`}
                            onClick={() => {
                              setTaxState(s);
                              setStateOpen(false);
                            }}
                          >
                            {s}
                            {s === taxState && (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="inline-block shrink-0 size-4 text-secondary-main ml-auto"
                              >
                                <path
                                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                        <div className="px-4 py-2 body-small text-secondary-600 font-semibold border-t border-secondary-200">
                          A-Z
                        </div>
                        {US_STATES_ALL.map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left body-regular transition-colors hover:bg-tertiary-100 ${
                              s === taxState
                                ? "font-semibold text-secondary-main"
                                : "text-secondary-800"
                            }`}
                            onClick={() => {
                              setTaxState(s);
                              setStateOpen(false);
                            }}
                          >
                            {s}
                            {s === taxState && (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="inline-block shrink-0 size-4 text-secondary-main ml-auto"
                              >
                                <path
                                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <h6
            className="text-secondary-main headline6"
            id="checkout__payment-title"
          >
            Select a secure payment method
          </h6>

          <div
            id="checkout__payments-card"
            className="mb-10 mt-6 rounded-xl border border-solid border-secondary-200 bg-neutral-white p-6 min-h-[5.125rem]"
          >
            <div className="[&_.paypal-buttons]:rounded-l [&_.gpay-card-info-container-fill]:!h-11 [&_.primer-checkout-apm-googlePay]:bg-neutral-black [&_.gpay-card-info-container]:!rounded-l [&_.primer-checkout-apm-applePay]:!h-12 [&_.primer-checkout-apm-applePay]:bg-neutral-black [&_.primer-checkout-apm-applePay]:!rounded-l [&_.primer-checkout-apm-applePay]:pt-1">
              <div className="flex flex-col gap-1.5">
                {/* PayPal button placeholder */}
                <div className="min-h-14" id="paypal-selector">
                  <button
                    type="button"
                    className="w-full h-[45px] rounded-l cursor-pointer border-none flex items-center justify-center transition-[0.2s_ease-in-out]"
                    style={{ backgroundColor: "#ffc439" }}
                    aria-label="Pay with PayPal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 101 32"
                      className="h-5"
                    >
                      <path
                        d="M 12.237 2.8 L 4.437 2.8 C 3.937 2.8 3.437 3.2 3.337 3.7 L 0.237 23.7 C 0.137 24.1 0.437 24.4 0.837 24.4 L 4.537 24.4 C 5.037 24.4 5.537 24 5.637 23.5 L 6.437 18.1 C 6.537 17.6 6.937 17.2 7.537 17.2 L 10.037 17.2 C 15.137 17.2 18.137 14.7 18.937 9.8 C 19.237 7.7 18.937 6 17.937 4.8 C 16.837 3.5 14.837 2.8 12.237 2.8 Z M 13.137 10.1 C 12.737 12.9 10.537 12.9 8.537 12.9 L 7.337 12.9 L 8.137 7.7 C 8.137 7.4 8.437 7.2 8.737 7.2 L 9.237 7.2 C 10.637 7.2 11.937 7.2 12.637 8 C 13.137 8.4 13.337 9.1 13.137 10.1 Z"
                        fill="#253B80"
                      />
                      <path
                        d="M 35.437 10 L 31.737 10 C 31.437 10 31.137 10.2 31.137 10.5 L 30.937 11.5 L 30.637 11.1 C 29.837 9.9 28.037 9.5 26.237 9.5 C 22.137 9.5 18.637 12.6 17.937 17 C 17.537 19.2 18.037 21.3 19.337 22.7 C 20.437 24 22.137 24.6 24.037 24.6 C 27.337 24.6 29.237 22.5 29.237 22.5 L 29.037 23.5 C 28.937 23.9 29.237 24.3 29.637 24.3 L 33.037 24.3 C 33.537 24.3 34.037 23.9 34.137 23.4 L 36.037 10.9 C 36.137 10.6 35.837 10.2 35.437 10 Z M 30.337 17.2 C 29.937 19.3 28.337 20.8 26.137 20.8 C 25.037 20.8 24.237 20.5 23.637 19.8 C 23.037 19.1 22.837 18.2 23.037 17.2 C 23.337 15.1 25.137 13.6 27.237 13.6 C 28.337 13.6 29.137 14 29.737 14.6 C 30.237 15.3 30.437 16.2 30.337 17.2 Z"
                        fill="#253B80"
                      />
                      <path
                        d="M 55.337 10 L 51.637 10 C 51.237 10 50.937 10.2 50.737 10.5 L 45.537 18.1 L 43.337 10.8 C 43.237 10.3 42.737 10 42.337 10 L 38.637 10 C 38.237 10 37.837 10.4 38.037 10.9 L 42.137 23 L 38.237 28.4 C 37.937 28.8 38.237 29.4 38.737 29.4 L 42.437 29.4 C 42.837 29.4 43.137 29.2 43.337 28.9 L 55.837 10.9 C 56.137 10.6 55.837 10 55.337 10 Z"
                        fill="#253B80"
                      />
                      <path
                        d="M 67.737 2.8 L 59.937 2.8 C 59.437 2.8 58.937 3.2 58.837 3.7 L 55.737 23.6 C 55.637 24 55.937 24.3 56.337 24.3 L 60.337 24.3 C 60.637 24.3 60.937 24.1 60.937 23.7 L 61.937 18 C 62.037 17.5 62.437 17.1 63.037 17.1 L 65.537 17.1 C 70.637 17.1 73.637 14.6 74.437 9.7 C 74.737 7.6 74.437 5.9 73.437 4.7 C 72.237 3.5 70.337 2.8 67.737 2.8 Z M 68.637 10.1 C 68.237 12.9 66.037 12.9 64.037 12.9 L 62.837 12.9 L 63.637 7.7 C 63.637 7.4 63.937 7.2 64.237 7.2 L 64.737 7.2 C 66.137 7.2 67.437 7.2 68.137 8 C 68.637 8.4 68.737 9.1 68.637 10.1 Z"
                        fill="#179BD7"
                      />
                      <path
                        d="M 90.937 10 L 87.237 10 C 86.937 10 86.637 10.2 86.637 10.5 L 86.437 11.5 L 86.137 11.1 C 85.337 9.9 83.537 9.5 81.737 9.5 C 77.637 9.5 74.137 12.6 73.437 17 C 73.037 19.2 73.537 21.3 74.837 22.7 C 75.937 24 77.637 24.6 79.537 24.6 C 82.837 24.6 84.737 22.5 84.737 22.5 L 84.537 23.5 C 84.437 23.9 84.737 24.3 85.137 24.3 L 88.537 24.3 C 89.037 24.3 89.537 23.9 89.637 23.4 L 91.537 10.9 C 91.637 10.6 91.337 10.2 90.937 10 Z M 85.737 17.2 C 85.337 19.3 83.737 20.8 81.537 20.8 C 80.437 20.8 79.637 20.5 79.037 19.8 C 78.437 19.1 78.237 18.2 78.437 17.2 C 78.737 15.1 80.537 13.6 82.637 13.6 C 83.737 13.6 84.537 14 85.137 14.6 C 85.837 15.3 86.037 16.2 85.737 17.2 Z"
                        fill="#179BD7"
                      />
                      <path
                        d="M 95.337 3.3 L 92.137 23.6 C 92.037 24 92.337 24.3 92.737 24.3 L 95.937 24.3 C 96.437 24.3 96.937 23.9 97.037 23.4 L 100.237 3.5 C 100.337 3.1 100.037 2.8 99.637 2.8 L 96.037 2.8 C 95.637 2.8 95.437 3 95.337 3.3 Z"
                        fill="#179BD7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Google Pay button placeholder */}
                <div id="primer-selector">
                  <button
                    type="button"
                    aria-label="Buy with GPay"
                    className="w-full h-11 rounded-l cursor-pointer border-none bg-neutral-black flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 62 24"
                      className="h-5"
                    >
                      <path
                        d="M29.764 12.96v6.241h-1.98V1.2h5.252c1.263-.025 2.482.46 3.396 1.35.94.84 1.478 2.04 1.478 3.29 0 1.275-.537 2.475-1.478 3.316a4.62 4.62 0 01-3.396 1.373h-3.272v2.43zm0-9.335v5.48h3.316c.752.025 1.479-.27 2.005-.815.552-.52.855-1.249.855-2.01s-.303-1.489-.855-2.009a2.673 2.673 0 00-2.005-.84l-3.316.194z"
                        fill="#fff"
                      />
                      <path
                        d="M42.343 7.26c1.453 0 2.604.39 3.447 1.17.843.78 1.264 1.845 1.264 3.195v6.465h-1.894v-1.455h-.087c-.816 1.194-1.9 1.792-3.246 1.792-1.15 0-2.113-.34-2.89-1.02-.777-.68-1.165-1.53-1.165-2.55 0-1.08.412-1.94 1.237-2.58.826-.64 1.928-.96 3.307-.96 1.178 0 2.149.215 2.913.645v-.453c0-.687-.285-1.33-.797-1.784a2.653 2.653 0 00-1.85-.74c-1.074 0-1.923.453-2.549 1.36l-1.744-1.097c.928-1.336 2.3-2.004 4.114-2.004l-.06.016zm-2.559 8.265c0 .52.226 .96.64 1.29.412.328.904.492 1.438.492.778 0 1.5-.316 2.079-.912.604-.596.906-1.29.906-2.082-.616-.493-1.478-.74-2.586-.74-.806 0-1.478.202-2.016.605-.537.404-.806.882-.806 1.457l.345-.11z"
                        fill="#fff"
                      />
                      <path
                        d="M55.955 7.596L49.7 21.937h-2.04l2.322-5.04-4.115-9.3h2.148l2.91 7.02h.043L53.85 7.597h2.105z"
                        fill="#fff"
                      />
                      <path
                        d="M21.2 10.56c0-.637-.055-1.275-.164-1.9H10.833v3.594h5.824a4.98 4.98 0 01-2.16 3.27v2.7h3.49c2.044-1.884 3.223-4.663 3.223-7.664h-.01z"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.833 21.36c2.925 0 5.382-.963 7.176-2.616l-3.49-2.7c-.97.653-2.214 1.028-3.686 1.028-2.828 0-5.225-1.91-6.082-4.477H1.152v2.79a10.836 10.836 0 009.681 5.975z"
                        fill="#34A853"
                      />
                      <path
                        d="M4.751 12.596a6.474 6.474 0 010-4.152V5.654H1.152a10.887 10.887 0 000 9.732l3.599-2.79z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M10.833 3.96a5.87 5.87 0 014.151 1.622l3.09-3.091A10.397 10.397 0 0010.834.24 10.836 10.836 0 001.152 5.654l3.599 2.79c.857-2.568 3.254-4.478 6.082-4.478v-.006z"
                        fill="#EA4335"
                      />
                    </svg>
                  </button>
                </div>

                {/* Card form */}
                <form
                  id="primer-checkout-card-form"
                  className="mt-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="mb-4">
                    <div className="body-small text-secondary-600 mb-1.5">
                      Card number
                    </div>
                    <div className="flex h-12 items-center rounded-xl border border-solid bg-neutral-white px-3 transition-colors cursor-text text-secondary-main border-secondary-200 focus-within:border-secondary-main hover:border-secondary-main">
                      <div className="mr-2 shrink-0">
                        <Image
                          src="/images/payment-card.svg"
                          alt="Card"
                          width={24}
                          height={16}
                          className="opacity-50"
                        />
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="h-full w-full appearance-none border-none bg-transparent body-regular font-normal text-current placeholder:text-secondary-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="body-small text-secondary-600 mb-1.5">
                        Expiry (MM/YY)
                      </div>
                      <div className="flex h-12 items-center rounded-xl border border-solid bg-neutral-white px-3 transition-colors cursor-text text-secondary-main border-secondary-200 focus-within:border-secondary-main hover:border-secondary-main">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="h-full w-full appearance-none border-none bg-transparent body-regular font-normal text-current placeholder:text-secondary-600 focus:outline-hidden"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="body-small text-secondary-600 mb-1.5">
                        CVV
                      </div>
                      <div className="flex h-12 items-center rounded-xl border border-solid bg-neutral-white px-3 transition-colors cursor-text text-secondary-main border-secondary-200 focus-within:border-secondary-main hover:border-secondary-main">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="h-full w-full appearance-none border-none bg-transparent body-regular font-normal text-current placeholder:text-secondary-600 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="body-small text-secondary-600 mb-1.5">
                      Name on card
                    </div>
                    <div className="flex h-12 items-center rounded-xl border border-solid bg-neutral-white px-3 transition-colors cursor-text text-secondary-main border-secondary-200 focus-within:border-secondary-main hover:border-secondary-main">
                      <input
                        type="text"
                        placeholder="Full name"
                        inputMode="text"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="h-full w-full appearance-none border-none bg-transparent body-regular font-normal text-current placeholder:text-secondary-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="h-8" />

                  <button
                    type="submit"
                    className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid border-transparent text-center font-semibold text-neutral-white bg-primary-main w-full h-12 px-3 rounded-l body-regular hover:bg-primary-600 active:scale-[0.98] transition-all"
                  >
                    <span>Complete secure payment</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-4"
            id="checkout__payments-disclaimers"
          >
            <li className="items-start flex list-none">
              <RefreshSvg />
              <div className="ml-4">
                <p className="text-secondary-800 body-regular font-normal">
                  Your subscription automatically renews until canceled. To
                  avoid being charged, you must cancel at least a day before
                  each renewal date.
                </p>
              </div>
            </li>
            <li className="items-start flex list-none">
              <LockSvg />
              <div className="ml-4">
                <p className="text-secondary-800 body-regular font-normal">
                  Follow the instructions on the screen to complete your
                  purchase securely.
                </p>
              </div>
            </li>
          </div>
          <li className="mt-4 items-start flex list-none">
            <InfoCircleSvg />
            <div className="ml-4">
              <p className="text-secondary-800 body-regular font-normal">
                Tax country is required for billing only. Your total won&apos;t
                change — taxes are already included.
              </p>
            </div>
          </li>
        </div>
      </div>
    </section>
  );
}

export default function FunnelCheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { answers } = useQuizState();

  const step = searchParams.get("step");
  const code = searchParams.get("code") || FUNNEL_CODE;
  const productId = searchParams.get("productId") || "692";
  const isWeightLoss = step === "weight-loss";
  const isPayment = step === "payment";

  const currentWeightKg = parseWeightToKg(
    typeof answers[7] === "string" ? answers[7] : undefined,
  );
  const targetWeightKg = parseWeightToKg(
    typeof answers[8] === "string" ? answers[8] : undefined,
  );
  const currentKg = currentWeightKg ? Math.round(currentWeightKg) : 88;
  const targetKg = targetWeightKg ? Math.round(targetWeightKg) : 65;

  const headerProgress = 100;

  function handleNameSubmit(name: string) {
    const chars = name.split("").map((c, i) => `${i}=${c}`).join("&");
    router.push(
      `/checkout/uni-s-mb-pbp-sugar?${chars}&code=${code}&step=weight-loss`,
    );
  }

  function handleBack() {
    router.back();
  }

  function handleSeeResults() {
    router.push("/checkout/result");
  }

  return (
    <>
      <CheckoutHeader
        progress={headerProgress}
        onBack={isWeightLoss || isPayment ? handleBack : undefined}
      />

      {isPayment ? (
        <PaymentStep productId={productId} onBack={handleBack} />
      ) : isWeightLoss ? (
        <WeightLossStep
          currentKg={currentKg}
          targetKg={targetKg}
          onContinue={handleSeeResults}
        />
      ) : (
        <NameStep onSubmit={handleNameSubmit} />
      )}
    </>
  );
}
