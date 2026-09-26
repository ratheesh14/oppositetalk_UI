'use client';

import React from 'react';
import Link from 'next/link';
import { useEligibilityStore } from '@/store/useEligibilityStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, ShieldAlert } from 'lucide-react';

export default function EligibilityResultPage() {
  const result = useEligibilityStore((s) => s.result);
  const resetAssessment = useEligibilityStore((s) => s.resetAssessment);
  const updateUser = useAuthStore((s) => s.updateUser);

  // Default fallback for preview
  const isEligible = result ? result.isEligible : true;

  const handleCreateProfile = () => {
    updateUser({ isEligible: true });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xl text-center">
        {isEligible ? (
          <div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Backend Evaluated
            </span>

            <h1 className="font-serif text-3xl font-bold text-slate-900 mt-4">You&apos;re eligible</h1>
            <p className="text-slate-600 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
              Your responses meet the current requirements for joining the community.
            </p>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Link href="/profile" onClick={handleCreateProfile}>
                <Button size="lg" className="w-full bg-slate-900 text-white font-bold py-4 text-base">
                  Create Your Profile <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-700 mb-6">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Status Notice
            </span>

            <h1 className="font-serif text-3xl font-bold text-slate-900 mt-4">You&apos;re currently not eligible.</h1>

            {result?.reasons && result.reasons.length > 0 ? (
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-left border border-slate-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Factual Criteria Notice</h4>
                <ul className="space-y-2">
                  {result.reasons.map((reason, idx) => (
                    <li key={idx} className="text-xs text-slate-700 leading-relaxed">
                      • {reason}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Your stated intentions differ from the platform&apos;s current mandatory criteria regarding long-term commitment and family vision.
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/eligibility" onClick={resetAssessment}>
                <Button variant="outline" size="md" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" /> Review Responses
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
