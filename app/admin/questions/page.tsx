'use client';

import React, { useEffect, useState } from 'react';
import { eligibilityService } from '@/services/eligibilityService';
import { EligibilityQuestion } from '@/types/eligibility';
import { Button } from '@/components/ui/Button';
import { HelpCircle, Plus, Edit2 } from 'lucide-react';

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<EligibilityQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await eligibilityService.getAssessmentQuestions();
        setQuestions(data.questions);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Assessment Questions</h1>
          <p className="text-xs text-slate-400">Manage dynamically loaded questions and selectable option cards</p>
        </div>
        <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
          <Plus className="w-4 h-4 mr-1" /> New Question
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-amber-400">Section: {q.section}</span>
              <span>Question #{idx + 1}</span>
            </div>
            <h3 className="font-bold text-white text-base mb-2">{q.questionText}</h3>
            {q.description && <p className="text-xs text-slate-400 mb-4">{q.description}</p>}

            <div className="space-y-2 pt-3 border-t border-slate-800">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Options ({q.options.length})</span>
              {q.options.map((opt) => (
                <div key={opt.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex justify-between items-center">
                  <span>{opt.text}</span>
                  {opt.isMandatoryDisqualifier && (
                    <span className="text-[10px] bg-rose-950 text-rose-400 px-2 py-0.5 rounded border border-rose-800 font-bold">
                      Disqualifier
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
