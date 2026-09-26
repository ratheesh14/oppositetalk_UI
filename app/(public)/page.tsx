import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  CheckCircle2,
  Lock,
  Compass,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="w-full bg-[#0b0716] text-purple-100 overflow-hidden">
      {/* HERO SECTION WITH FUTURISTIC PURPLE RADIAL GLOW */}
      <section className="relative overflow-hidden pt-24 pb-28 lg:pt-32 lg:pb-40 bg-gradient-to-b from-[#130b24] via-[#0b0716] to-[#120a22]">
        {/* Futuristic Glowing Orbs & Grids */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#58218e_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-950/80 px-4 py-1.5 text-xs font-bold text-fuchsia-300 border border-purple-500/40 mb-8 backdrop-blur-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Futuristic Values-First Relationship Platform</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-tight">
            Meet people who are serious about{' '}
            <span className="gradient-text-purple">building a family.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-2xl text-purple-200/80 max-w-3xl mx-auto font-normal leading-relaxed">
            A deliberate community for adults seeking meaningful relationships, marriage, family building, and shared economic responsibility.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/eligibility">
              <Button size="lg" variant="neon" className="px-10 py-4 text-base">
                Check Your Eligibility
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="px-10 py-4 text-base">
                How It Works
              </Button>
            </Link>
          </div>

          {/* Futuristic Trust Highlights Grid */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-5xl mx-auto pt-12 border-t border-purple-900/40">
            <div className="futuristic-card p-5 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-fuchsia-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Identity Verification</h4>
              <p className="text-xs text-purple-300/70 mt-1">Real identity & background screening</p>
            </div>
            <div className="futuristic-card p-5 rounded-2xl">
              <HeartHandshake className="w-6 h-6 text-fuchsia-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Marriage & Family Focus</h4>
              <p className="text-xs text-purple-300/70 mt-1">Clear long-term intentions</p>
            </div>
            <div className="futuristic-card p-5 rounded-2xl">
              <Lock className="w-6 h-6 text-fuchsia-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Encrypted & Private</h4>
              <p className="text-xs text-purple-300/70 mt-1">SignalR real-time security</p>
            </div>
            <div className="futuristic-card p-5 rounded-2xl">
              <Award className="w-6 h-6 text-fuchsia-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Curated Community</h4>
              <p className="text-xs text-purple-300/70 mt-1">Backend-screened members</p>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY STEPS SECTION */}
      <section className="py-24 bg-[#0e071c] relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">Next-Gen Architecture</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              A deliberate methodology for serious outcomes.
            </h2>
            <p className="text-purple-300/70 mt-4 text-sm sm:text-base">
              OppositeTalk eliminates superficial swipe mechanics in favor of intentional values evaluation and mutual commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                01
              </div>
              <h3 className="font-bold text-white text-lg">Eligibility Assessment</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Complete a 7-section screening process evaluating intent regarding marriage, family goals, and financial responsibility.
              </p>
            </div>

            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                02
              </div>
              <h3 className="font-bold text-white text-lg">Comprehensive Profile</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Detail your education, profession, family vision, financial style, and lifestyle preferences across a 12-step guided setup.
              </p>
            </div>

            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                03
              </div>
              <h3 className="font-bold text-white text-lg">Values Discover & Like</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Explore profiles filtered by children preferences, career, travel, and personal values without public vanity metrics.
              </p>
            </div>

            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                04
              </div>
              <h3 className="font-bold text-white text-lg">Mutual Match & Chat</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Unlock connection upon mutual interest, showing transparent shared alignment areas and real-time SignalR chat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY STANDARD & SCREENING SECTION */}
      <section className="py-24 bg-[#120925] border-y border-purple-900/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">Quality Standard</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2 leading-tight">
              Backend-screened community built on mutual accountability.
            </h2>
            <p className="text-purple-300/80 mt-6 text-sm sm:text-base leading-relaxed">
              Successful partnerships start with honesty. Members who do not satisfy mandatory criteria regarding serious intent and respect do not enter the main platform.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
                <span className="text-sm text-purple-200">Exclusively for adults seeking serious long-term relationship commitment and marriage.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
                <span className="text-sm text-purple-200">Focus on financial responsibility, career growth, and healthy lifestyle choices.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
                <span className="text-sm text-purple-200">Confidential backend eligibility evaluation — no discriminatory or judgmental language.</span>
              </li>
            </ul>

            <div className="mt-10">
              <Link href="/eligibility">
                <Button size="lg" variant="neon" className="px-8 py-3.5">
                  Take the Assessment
                </Button>
              </Link>
            </div>
          </div>

          <div className="futuristic-card p-8 rounded-3xl border border-purple-500/30">
            <h3 className="font-serif text-2xl font-bold text-white mb-6">Assessment Topics Covered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Basic Eligibility',
                'Relationship Intentions',
                'Family & Children Goals',
                'Financial Responsibility',
                'Personal Development',
                'Lifestyle & Health',
                'Social Awareness',
              ].map((topic, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-purple-950/60 border border-purple-800/40">
                  <div className="h-2.5 w-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
                  <span className="text-xs font-bold text-purple-100">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-24 text-center relative">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">Ready for a relationship built on shared values?</h2>
          <p className="text-purple-300/70 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Join thousands of adults serious about long-term partnerships, family life, and financial stability.
          </p>
          <div className="mt-10">
            <Link href="/eligibility">
              <Button size="lg" variant="neon" className="px-10 py-4 text-base">
                Check Your Eligibility Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
