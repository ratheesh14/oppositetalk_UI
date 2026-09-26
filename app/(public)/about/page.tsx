import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">About OppositeTalk</span>
        <h1 className="font-serif text-4xl font-bold text-slate-900 mt-2">Built for Purposeful Connections</h1>
        <p className="text-slate-600 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
          OppositeTalk was created to provide a respectful, mature space for adults who are serious about marriage, family life, personal development, and financial responsibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="rounded-2xl border border-slate-200 p-8 bg-white shadow-xs">
          <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Our Core Philosophy</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Modern relationship platforms often prioritize rapid swipes and surface-level aesthetics over genuine life vision alignment. We believe long-term partnership success depends on shared values, clear expectations regarding children and family, and mutual economic accountability.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-8 bg-white shadow-xs">
          <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Community Integrity</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Our platform strictly prohibits harassment, derogatory attacks, or exclusion of protected groups. The focus remains squarely on members&apos; positive life goals, individual readiness, and constructive dialogue.
          </p>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-slate-200">
        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Ready to begin your journey?</h3>
        <Link href="/eligibility">
          <Button size="lg" className="bg-slate-900 text-white font-semibold">
            Check Your Eligibility
          </Button>
        </Link>
      </div>
    </div>
  );
}
