'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEligibilityStore } from '@/store/useEligibilityStore';
import { eligibilityService } from '@/services/eligibilityService';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ArrowLeft, ArrowRight, Save, CheckCircle, ShieldCheck, Loader2 } from 'lucide-react';

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
      <div className="min-h-[calc(100vh-4rem)] bg-[#0b0716] flex items-center justify-center p-6 text-purple-200">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-fuchsia-400 animate-spin mx-auto mb-4" />
          <p className="text-xs text-purple-300 font-semibold">Loading Eligibility Questions...</p>
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
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b0716] text-purple-100 py-10 px-4 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-700/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-2xl futuristic-card rounded-3xl border border-purple-500/40 p-6 sm:p-10 shadow-[0_0_50px_rgba(168,85,247,0.2)] backdrop-blur-2xl relative z-10">
        {/* Header & Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-purple-300/80 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
              <span className="font-bold uppercase tracking-widest text-fuchsia-300">
                {currentQuestion.section}
              </span>
            </div>
            <span>
              Question <strong className="text-white">{currentIndex + 1}</strong> of {questions.length}
            </span>
          </div>

          <ProgressBar progressPercentage={progressPercentage} showPercentage={false} />
        </div>

        {/* Question Text */}
        <div className="my-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
            {currentQuestion.questionText}
          </h2>
          {currentQuestion.description && (
            <p className="text-xs sm:text-sm text-purple-300/80 mt-2.5 leading-relaxed">
              {currentQuestion.description}
            </p>
          )}
        </div>

        {/* Option Selectable Cards */}
        <div className="space-y-3.5 my-8">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-fuchsia-400 bg-fuchsia-600/30 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]'
                    : 'border-purple-800/60 bg-purple-950/60 hover:bg-purple-900/60 text-purple-100'
                }`}
              >
                <div>
                  <p className="text-sm font-bold leading-snug">{option.text}</p>
                  {option.subtext && (
                    <p className={`text-xs mt-1 ${isSelected ? 'text-fuchsia-200' : 'text-purple-300/70'}`}>
                      {option.subtext}
                    </p>
                  )}
                </div>
                <div
                  className={`h-6 w-6 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                    isSelected ? 'border-fuchsia-400 bg-fuchsia-500 text-white' : 'border-purple-700/60'
                  }`}
                >
                  {isSelected && <CheckCircle className="w-4 h-4" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls: Back, Save, Next/Submit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-purple-900/60">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <Button
              variant="outline"
              size="md"
              onClick={previousQuestion}
              disabled={currentIndex === 0}
              className="border-purple-700/60 text-purple-200 hover:bg-purple-900/60"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSaveProgress} className="text-xs text-purple-300">
              <Save className="w-3.5 h-3.5 mr-1" /> Save Progress
            </Button>
          </div>

          {isLastQuestion ? (
            <Button
              size="md"
              variant="neon"
              onClick={handleSubmitAssessment}
              disabled={!selectedOptionId}
              isLoading={isSubmitting}
              className="font-bold px-8 py-3 w-full sm:w-auto"
            >
              Submit Assessment
            </Button>
          ) : (
            <Button
              size="md"
              variant="neon"
              onClick={nextQuestion}
              disabled={!selectedOptionId}
              className="font-bold px-8 py-3 w-full sm:w-auto"
            >
              Continue <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>

        {saveToast && (
          <div className="mt-4 p-3 rounded-xl bg-purple-950 border border-purple-700 text-white text-center text-xs animate-in fade-in">
            Progress saved to server draft.
          </div>
        )}
      </div>
    </div>
  );
}
