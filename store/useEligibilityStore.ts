import { create } from 'zustand';
import { AssessmentAnswerSubmission, AssessmentResult, EligibilityQuestion } from '@/types/eligibility';

interface EligibilityState {
  questions: EligibilityQuestion[];
  currentIndex: number;
  answers: Record<string, string>; // questionId -> optionId
  result: AssessmentResult | null;
  setQuestions: (questions: EligibilityQuestion[]) => void;
  selectOption: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setResult: (result: AssessmentResult) => void;
  resetAssessment: () => void;
}

export const useEligibilityStore = create<EligibilityState>((set) => ({
  questions: [],
  currentIndex: 0,
  answers: {},
  result: null,
  setQuestions: (questions) => set({ questions }),
  selectOption: (questionId, optionId) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId },
    })),
  nextQuestion: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
    })),
  previousQuestion: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
    })),
  setResult: (result) => set({ result }),
  resetAssessment: () => set({ currentIndex: 0, answers: {}, result: null }),
}));
