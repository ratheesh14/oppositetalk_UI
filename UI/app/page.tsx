'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { isAdminUser } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { signInWithGoogleReal } from '@/lib/supabaseClient';
import {
  ShieldCheck,
  HeartHandshake,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';

function LandingPageContent() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      const storedUserStr = typeof window !== 'undefined' ? localStorage.getItem('oppositetalk_user') : null;
      let currentUser = user;
      if (!currentUser && storedUserStr) {
        try {
          currentUser = JSON.parse(storedUserStr);
        } catch {}
      }

      if ((isAuthenticated || !!currentUser) && isAdminUser(currentUser)) {
        router.push('/admin/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, user, router]);


  return (
    <div className="w-full min-h-screen bg-[#0b0716] text-purple-100 relative overflow-hidden">
      {/* FUTURISTIC PURPLE RADIAL GLOW & BACKGROUND PATTERN */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-700/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#58218e_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-28 lg:pt-28 lg:pb-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Sparkle Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-950/80 px-4 py-1.5 text-xs font-bold text-fuchsia-300 border border-purple-500/40 mb-8 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Values-First Relationship & Family Platform</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-tight text-white">
          Find someone serious about{' '}
          <span className="gradient-text-purple">marriage, family & shared values.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-2xl text-purple-200/80 max-w-3xl mx-auto font-normal leading-relaxed">
          A deliberate community for adults seeking long-term commitment, personal growth, and financial responsibility.
        </p>

        {/* GOOGLE AUTHENTICATION HERO CARD */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="futuristic-card p-8 rounded-3xl border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.25)] backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-600" />
            
            <h3 className="text-xl font-bold text-white mb-2 font-serif">Get Started with OppositeTalk</h3>
            <p className="text-xs text-purple-300/80 mb-6">
              Sign in securely using your Google Account to begin setup.
            </p>

            {/* Primary Real Google OAuth Button */}
            <button
              onClick={() => signInWithGoogleReal()}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-purple-50 text-slate-900 font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(232,121,249,0.5)] border border-purple-200 active:scale-[0.98] group cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-base tracking-tight">Continue with Google</span>
              <ArrowRight className="w-4 h-4 ml-auto text-purple-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* TRUST HIGHLIGHTS */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-5xl mx-auto pt-12 border-t border-purple-900/40">
          <div className="futuristic-card p-5 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-fuchsia-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Identity Verification</h4>
            <p className="text-xs text-purple-300/70 mt-1">Screened for authentic intent</p>
          </div>
          <div className="futuristic-card p-5 rounded-2xl">
            <HeartHandshake className="w-6 h-6 text-fuchsia-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Marriage & Family Focus</h4>
            <p className="text-xs text-purple-300/70 mt-1">Clear long-term goals</p>
          </div>
          <div className="futuristic-card p-5 rounded-2xl">
            <Lock className="w-6 h-6 text-fuchsia-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Encrypted & Private</h4>
            <p className="text-xs text-purple-300/70 mt-1">SignalR real-time security</p>
          </div>
          <div className="futuristic-card p-5 rounded-2xl">
            <Award className="w-6 h-6 text-fuchsia-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Curated Community</h4>
            <p className="text-xs text-purple-300/70 mt-1">Values eligibility screened</p>
          </div>
        </div>
      </section>

      {/* PLATFORM METHODOLOGY & FEATURES */}
      <section className="py-24 bg-[#0e071c] border-t border-purple-900/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">Methodology</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              A deliberate process for serious outcomes.
            </h2>
            <p className="text-purple-300/70 mt-4 text-sm sm:text-base">
              OppositeTalk replaces casual swipe mechanics with values compatibility, relationship intent, and mutual accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                01
              </div>
              <h3 className="font-bold text-white text-lg">Google Sign-In</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Direct OAuth 2.0 authentication capturing verified identity, full name, age, and gender preferences.
              </p>
            </div>

            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                02
              </div>
              <h3 className="font-bold text-white text-lg">Values Assessment</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                7-section confidential evaluation covering marriage intent, family timeline, and financial responsibility.
              </p>
            </div>

            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                03
              </div>
              <h3 className="font-bold text-white text-lg">Detailed Profile</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Share career goals, family vision, lifestyle habits, and financial priorities in a 12-step guided setup.
              </p>
            </div>

            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                04
              </div>
              <h3 className="font-bold text-white text-lg">Values Match & Chat</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Discover aligned partners and communicate securely in real-time SignalR chat without superficial distractions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function RootLandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0716] flex items-center justify-center text-purple-200">Loading...</div>}>
      <LandingPageContent />
    </Suspense>
  );
}
