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
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="w-full bg-slate-50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-1.5 text-xs font-semibold text-amber-300 border border-slate-700/80 mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Values-First Relationship Platform</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Meet people who are serious about building a family.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            A community for adults looking for meaningful relationships, marriage, family and shared responsibility.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/eligibility">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 text-base shadow-xl hover:shadow-2xl transition">
                Check Your Eligibility
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white px-8 py-4 text-base">
                How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto pt-10 border-t border-slate-800">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">ID & Background Verification</h4>
                <p className="text-xs text-slate-400 mt-0.5">Real identity confirmed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Marriage & Family Focus</h4>
                <p className="text-xs text-slate-400 mt-0.5">Clear life goals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Private & Confidential</h4>
                <p className="text-xs text-slate-400 mt-0.5">Strict data security</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Curated Community</h4>
                <p className="text-xs text-slate-400 mt-0.5">Backend-screened members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Methodology</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              A deliberate process for serious outcomes.
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              OppositeTalk replaces superficial swipe mechanics with intentional values alignment and verified commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:border-slate-300 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-bold mb-4 text-base">
                1
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Eligibility Assessment</h3>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Complete a multi-section values screening ensuring mutual intent regarding marriage, family, and economic stability.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:border-slate-300 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-bold mb-4 text-base">
                2
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Comprehensive Profile</h3>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Detail your education, profession, family vision, financial style, and lifestyle preferences across 12 structured steps.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:border-slate-300 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-bold mb-4 text-base">
                3
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Values Discover & Like</h3>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Filter profiles based on lifestyle habits, children goals, location, and shared life priorities without public vanity metrics.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:border-slate-300 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-bold mb-4 text-base">
                4
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Mutual Match & Chat</h3>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Connect once mutual interest is confirmed, with transparent shared alignment points and encrypted SignalR real-time chat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY & VALUES SECTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Quality Standard</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 leading-tight">
              Backend-screened community built on mutual accountability.
            </h2>
            <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
              We believe a successful family and partnership starts with honesty. Members who do not satisfy mandatory criteria regarding serious intent and respect do not enter the main platform.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">Exclusively for adults seeking serious long-term relationship commitment and marriage.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">Focus on financial responsibility, career growth, and healthy lifestyle choices.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">Confidential backend eligibility validation — no discriminatory or judgmental language.</span>
              </li>
            </ul>

            <div className="mt-8">
              <Link href="/eligibility">
                <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-6 py-3">
                  Take the Assessment
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-800/60 p-8 backdrop-blur-md">
            <h3 className="font-serif text-xl font-bold text-white mb-6">Assessment Topics Covered</h3>
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
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-700/60">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-semibold text-slate-200">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Transparency</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 text-base">How does OppositeTalk differ from typical dating apps?</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                OppositeTalk is specifically structured around long-term relationship readiness, financial responsibility, and family intentions. We require an initial eligibility assessment before accessing profile discovery.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 text-base">Is my personal information kept secure?</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Yes. Sensitive information is encrypted, and only details you explicitly choose to share in your profile wizard are visible to matched members.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 text-base">What happens if I do not meet eligibility criteria?</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                The platform provides factual, non-judgmental feedback explaining criteria gaps. Members can revisit assessment criteria as their relationship goals evolve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-slate-100 text-center border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-serif text-3xl font-bold text-slate-900">Ready for a relationship built on shared values?</h2>
          <p className="text-slate-600 text-sm mt-3 max-w-xl mx-auto">
            Join thousands of adults serious about building long-term partnerships, family life, and financial stability.
          </p>
          <div className="mt-8">
            <Link href="/eligibility">
              <Button size="lg" className="bg-slate-900 text-white font-bold px-8 py-4 text-base">
                Check Your Eligibility Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
