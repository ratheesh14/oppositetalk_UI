import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Step-by-Step Guide</span>
        <h1 className="font-serif text-4xl font-bold text-slate-900 mt-2">How OppositeTalk Works</h1>
        <p className="text-slate-600 text-sm mt-3 max-w-2xl mx-auto">
          A structured 10-step journey from initial values screening to meaningful connection.
        </p>
      </div>

      <div className="space-y-8 max-w-3xl mx-auto">
        {[
          { step: '01', title: 'Registration', text: 'Create an account with email verification to ensure real user identity.' },
          { step: '02', title: 'Eligibility Assessment', text: 'Answer a 7-section values screening evaluated confidentially by backend rules.' },
          { step: '03', title: 'Eligibility Result', text: 'Receive instant confirmation or factual feedback on requirements.' },
          { step: '04', title: 'Profile Creation Wizard', text: 'Fill out 12 detailed steps covering career, family vision, financial style, and lifestyle.' },
          { step: '05', title: 'Verification', text: 'Verify identity credentials to earn a verified member badge.' },
          { step: '06', title: 'Values Discovery', text: 'Filter profiles based on goals, location, education, and children preferences.' },
          { step: '07', title: 'Mutual Expression of Interest', text: 'Send likes to profiles that align with your vision for long-term commitment.' },
          { step: '08', title: 'Mutual Match & Connection', text: 'When both members express interest, connection is unlocked with transparent shared values.' },
          { step: '09', title: 'Real-time SignalR Chat', text: 'Communicate securely in a private, encrypted messaging environment.' },
          { step: '10', title: 'Communities & Social Feed', text: 'Engage in structured discussions on Marriage, Parenting, Finance, and Personal Growth.' },
        ].map((item, index) => (
          <div key={index} className="flex items-start gap-6 p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <span className="font-serif text-2xl font-bold text-slate-400 shrink-0">{item.step}</span>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">{item.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link href="/eligibility">
          <Button size="lg" className="bg-slate-900 text-white font-bold px-8">
            Start Your Eligibility Check
          </Button>
        </Link>
      </div>
    </div>
  );
}
