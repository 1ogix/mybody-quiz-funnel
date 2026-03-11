"use client";

import { useCallback, useEffect, useState } from "react";
import { QuizAnswers, QuizState } from "@/types/quiz";

const STORAGE_KEY = "mybody_quiz_state";
const STEP_TTL_MS = 3 * 60 * 1000; // 3 minutes
const OFFER_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function loadState(): QuizState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state: QuizState & { savedAt?: number } = JSON.parse(raw);
    // Check if step persistence has expired
    if (state.savedAt && Date.now() - state.savedAt > STEP_TTL_MS) {
      // Only clear if offer not seen (offer persists 12h)
      if (!state.offerSeenAt || Date.now() - state.offerSeenAt > OFFER_TTL_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
    }
    return state;
  } catch {
    return null;
  }
}

function saveState(state: QuizState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...state, savedAt: Date.now() })
  );
}

export function useQuizState() {
  const [state, setState] = useState<QuizState>({
    currentStep: 1,
    answers: {},
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setState(saved);
    }
    setHydrated(true);
  }, []);

  const setAnswer = useCallback(
    (stepId: number, value: string | string[]) => {
      setState((prev) => {
        const next = {
          ...prev,
          answers: { ...prev.answers, [stepId]: value },
        };
        saveState(next);
        return next;
      });
    },
    []
  );

  const goToStep = useCallback((step: number) => {
    setState((prev) => {
      const next = { ...prev, currentStep: step };
      saveState(next);
      return next;
    });
  }, []);

  const markOfferSeen = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, offerSeenAt: Date.now() };
      saveState(next);
      return next;
    });
  }, []);

  const resetQuiz = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState({ currentStep: 1, answers: {} });
  }, []);

  const getAnswer = useCallback(
    (stepId: number): string | string[] | undefined => {
      return state.answers[stepId];
    },
    [state.answers]
  );

  return {
    state,
    answers: state.answers as QuizAnswers,
    currentStep: state.currentStep,
    hydrated,
    setAnswer,
    goToStep,
    markOfferSeen,
    resetQuiz,
    getAnswer,
  };
}
