"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getLoaderPath } from "@/data/funnelRoutes";
import { useQuizState } from "@/hooks/useQuizState";
import MyBodyLogo from "@/components/layout/MyBodyLogo";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function FunnelEmailPage() {
  const router = useRouter();
  const { setAnswer, goToStep } = useQuizState();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!agreed) {
      setError("Please accept the Privacy Policy to continue.");
      return;
    }

    setError("");
    setSubmitting(true);
    setAnswer(31, email.trim());
    goToStep(32);
    router.push(getLoaderPath());
  }

  return (
    <>
      <header className="flex h-16 items-center justify-center border-b border-secondary-100 tablet:h-20">
        <MyBodyLogo className="inline-block shrink-0 align-middle leading-none h-9 tablet:h-10" />
      </header>

      <section className="section-p-large bg-[var(--section-background-color,transparent)]">
        <div className="[--section-container-gutter-internal:var(--section-container-gutter,1rem)] [--section-container-width-internal:var(--section-container-width,76rem)] max-w-[calc(var(--section-container-width-internal)+2*var(--section-container-gutter-internal))] px-(--section-container-gutter-internal) mx-auto tablet:[--section-container-gutter-internal:var(--section-container-gutter,2rem)] [--section-grid-columns:4] [--section-grid-spacing:1rem] grid grid-cols-[repeat(var(--section-grid-columns),1fr)] gap-x-(--section-grid-spacing) tablet:[--section-grid-columns:8] tablet:[--section-grid-spacing:1.5rem] desktop:[--section-grid-columns:12] desktop:[--section-grid-spacing:2rem]">
          <div className="col-span-full tablet:col-[2/-2] desktop:col-[4/-4]">
            <div className="mb-8 tablet:mb-12 desktop:mb-16">
              <h3 className="headline3">Enter your email</h3>
              <p className="mt-4 text-secondary-800 body-large"></p>
            </div>

            <form onSubmit={handleSubmit}>
              <div role="group">
                <div className="flex h-12 items-center rounded-xl border border-solid bg-neutral-white px-3 transition-colors cursor-text text-secondary-main border-secondary-200 focus-within:border-secondary-main hover:border-secondary-main">
                  <input
                    id="email__email-input--form"
                    type="text"
                    autoCapitalize="off"
                    data-testid="email__email-input--form"
                    placeholder="Your email address"
                    name="email"
                    inputMode="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                    className="h-full w-full appearance-none border-none bg-transparent body-regular font-normal text-current placeholder:text-secondary-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div role="group" className="flex center">
                  <div className="p-0.5">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={agreed}
                      data-state={agreed ? "checked" : "unchecked"}
                      value="on"
                      id="email__privacy-policy-checkbox--form"
                      data-testid="email__privacy-policy-checkbox--form"
                      onClick={() => {
                        setAgreed((prev) => !prev);
                        if (error) setError("");
                      }}
                      className="flex h-5 w-5 shrink-0 appearance-none items-center justify-center rounded-[0.375rem] border-2 border-solid text-neutral-white outline-hidden transition-colors"
                      style={{
                        backgroundColor: agreed
                          ? "var(--color-secondary-main)"
                          : "transparent",
                        borderColor: agreed
                          ? "var(--color-secondary-main)"
                          : "var(--color-secondary-400)",
                      }}
                    >
                      {agreed && (
                        <svg
                          viewBox="0 0 11 8"
                          fill="none"
                          className="inline-block shrink-0 align-middle leading-none h-2"
                          style={{ pointerEvents: "none" }}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.6981 0.284C11.0935 0.66955 11.1016 1.30266 10.716 1.6981L4.86601 7.6981C4.49297 8.08071 3.88504 8.10242 3.48565 7.74741L0.335647 4.94741C-0.0771359 4.58049 -0.114317 3.94842 0.252601 3.53564C0.619519 3.12285 1.25159 3.08567 1.66437 3.45259L4.10065 5.61817L9.28401 0.3019C9.66956 -0.0935356 10.3027 -0.10155 10.6981 0.284Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="body-regular ml-3">
                    <p className="body-small">
                      I agree to the{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-main underline"
                        href="/data-protection-policy"
                      >
                        Privacy Policy
                      </a>{" "}
                      and to receiving future information from MyBody
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-3 body-small text-danger-main">{error}</p>
              )}

              <button
                type="submit"
                className="relative flex cursor-pointer items-center justify-center overflow-hidden border-[1.5px] border-solid text-center font-semibold outline-hidden transition-colors disabled-btn:pointer-events-none disabled-btn:cursor-default loading:cursor-default border-transparent text-neutral-white disabled-btn:bg-secondary-200 bg-primary-main hover-btn:bg-primary-600 w-full h-12 px-3 rounded-l body-regular mt-6"
                data-loading={submitting ? "true" : "false"}
                id="email__submit-button--form"
                data-testid="email__submit-button--form"
                disabled={submitting}
              >
                <div className="flex w-full items-center justify-center gap-2 opacity-100">
                  <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                    See My Results
                  </div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
