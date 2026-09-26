'use client';

import React from 'react';
import Link from 'next/link';
import { useEligibilityStore } from '@/store/useEligibilityStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ArrowRight, Home, HeartHandshake } from 'lucide-react';

export default function EligibilityResultPage() {
  const result = useEligibilityStore((s) => s.result);
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  // Check eligibility from assessment result or user auth state
  const isEligible = result ? result.isEligible : (user ? user.isEligible : false);

  React.useEffect(() => {
    if (result) {
      updateUser({ isEligible: result.isEligible });
    }
  }, [result, updateUser]);

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

            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-500/40">
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 mb-6 border border-fuchsia-500/40 shadow-[0_0_25px_rgba(217,70,239,0.35)]">
              <HeartHandshake className="w-10 h-10 text-fuchsia-400" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-widest text-fuchsia-400 bg-fuchsia-950/80 px-3.5 py-1 rounded-full border border-fuchsia-500/40">
              OppositeTalk Eligibility Notice
            </span>

            {/* Main Message requested by user */}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-5 leading-tight">
              You are not ready for the marriage
            </h1>

            {/* Sub-message requested by user */}
            <p className="text-fuchsia-300 font-medium text-base sm:text-lg mt-3">
              Will See you soon
            </p>

            <div className="mt-8 pt-6 border-t border-purple-900/60">
              <Link href="/">
                <Button variant="neon" size="md" className="w-full font-bold text-xs py-3.5">
                  <Home className="w-4 h-4 mr-2" /> Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
