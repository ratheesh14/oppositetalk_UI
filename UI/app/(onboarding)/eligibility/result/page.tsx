'use client';

import React from 'react';
import Link from 'next/link';
import { useEligibilityStore } from '@/store/useEligibilityStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ShieldAlert, ArrowRight, RefreshCw, Home } from 'lucide-react';

export default function EligibilityResultPage() {
  const result = useEligibilityStore((s) => s.result);
  const resetAssessment = useEligibilityStore((s) => s.resetAssessment);
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  // Check eligibility from assessment result or user auth state
  const isEligible = result ? result.isEligible : (user ? user.isEligible : false);

  const handleCreateProfile = () => {
    updateUser({ isEligible: true });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b0716] flex items-center justify-center p-4 text-purple-100 relative overflow-hidden">
      {/* Background Radial Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-700/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-lg w-full futuristic-card rounded-3xl border border-purple-500/40 p-8 sm:p-10 shadow-[0_0_60px_rgba(168,85,247,0.25)] backdrop-blur-2xl text-center relative z-10">
        {isEligible ? (
          <div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
              Verified & Evaluated
            </span>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-4">You are Eligible</h1>
            <p className="text-purple-300/80 text-xs sm:text-sm mt-2 max-w-sm mx-auto leading-relaxed">
              Your age and criteria meet the requirements for joining the OppositeTalk community.
            </p>

            <div className="mt-8 pt-6 border-t border-purple-900/60">
              <Link href="/profile" onClick={handleCreateProfile}>
                <Button size="lg" variant="neon" className="w-full font-bold py-4 text-sm">
                  Create Your Profile <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 mb-6 border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-widest text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/40">
              Profile Ineligible
            </span>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-4">Registration Restricted</h1>

            {result?.reasons && result.reasons.length > 0 ? (
              <div className="mt-6 rounded-2xl bg-purple-950/80 p-5 text-left border border-rose-500/40 shadow-inner">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-2.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Eligibility Criteria Notice
                </h4>
                <ul className="space-y-2">
                  {result.reasons.map((reason, idx) => (
                    <li key={idx} className="text-xs text-purple-200 leading-relaxed font-medium">
                      • {reason}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-purple-950/80 p-5 text-left border border-rose-500/40">
                <p className="text-xs text-purple-200 leading-relaxed">
                  OppositeTalk strictly enforces age criteria: <strong>Males must be above 26</strong> (27+) and <strong>Females must be above 24</strong> (25+). Based on your submitted age, your profile cannot proceed.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/auth/callback">
                <Button variant="outline" size="md" className="w-full border-purple-700/60 text-purple-200 hover:bg-purple-900/60 text-xs">
                  <RefreshCw className="w-3.5 h-3.5 mr-2" /> Re-enter Age & Information
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="w-full text-xs text-purple-300 hover:text-white">
                  <Home className="w-3.5 h-3.5 mr-1.5" /> Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
