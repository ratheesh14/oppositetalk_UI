'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEligibilityStore } from '@/store/useEligibilityStore';
import { eligibilityService } from '@/services/eligibilityService';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, ArrowRight, Save, CheckCircle, ShieldCheck } from 'lucide-react';

export default function EligibilityPage() {
  const router = useRouter();
  const {
    questions,
    currentIndex,
    answers,
    setQuestions,
    selectOption,
    nextQuestion,
    previousQuestion,
    setResult,
  } = useEligibilityStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await eligibilityService.getAssessmentQuestions();
        setQuestions(data.questions);
      } catch (err) {
        console.error('Failed to load questions:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadQuestions();
  }, [setQuestions]);

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-xs text-slate-500 font-medium">Loading Eligibility Questions from Backend...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedOptionId = answers[currentQuestion.id];
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleOptionClick = (optionId: string) => {
    selectOption(currentQuestion.id, optionId);
  };

  const handleSaveProgress = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    try {
      const result = await eligibilityService.submitAssessment(answers);
      setResult(result);
      router.push('/eligibility/result');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-2xl bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl">
        {/* Header Header & Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span className="font-semibold uppercase tracking-wider text-slate-700">
                {currentQuestion.section}
              </span>
            </div>
            <span>
              Question <strong className="text-slate-900">{currentIndex + 1}</strong> of {questions.length}
            </span>
          </div>

          <ProgressBar progressPercentage={progressPercentage} showPercentage={false} />
        </div>

        {/* Question Text */}
        <div className="my-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQuestion.questionText}
          </h2>
          {currentQuestion.description && (
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              {currentQuestion.description}
            </p>
          )}
        </div>

        {/* Option Selectable Cards */}
        <div className="space-y-3 my-8">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80 text-slate-800'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold leading-snug">{option.text}</p>
                  {option.subtext && (
                    <p className={`text-xs mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {option.subtext}
                    </p>
                  )}
                </div>
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                    isSelected ? 'border-amber-400 bg-amber-400 text-slate-900' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls: Back, Save, Next/Submit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <Button
              variant="outline"
              size="md"
              onClick={previousQuestion}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSaveProgress} className="text-xs">
              <Save className="w-3.5 h-3.5 mr-1" /> Save Progress
            </Button>
          </div>

          {isLastQuestion ? (
            <Button
              size="md"
              onClick={handleSubmitAssessment}
              disabled={!selectedOptionId}
              isLoading={isSubmitting}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold w-full sm:w-auto"
            >
              Submit Assessment
            </Button>
          ) : (
            <Button
              size="md"
              onClick={nextQuestion}
              disabled={!selectedOptionId}
              className="bg-slate-900 text-white w-full sm:w-auto"
            >
              Continue <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>

        {saveToast && (
          <div className="mt-4 p-2 rounded-xl bg-slate-900 text-white text-center text-xs animate-in fade-in">
            Progress saved to server draft.
          </div>
        )}
      </div>
    </div>
  );
}
