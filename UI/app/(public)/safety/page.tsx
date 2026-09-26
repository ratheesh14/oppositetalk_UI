import React from 'react';
import { ShieldCheck, Lock, Flag, UserX, AlertTriangle } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Ethics & Standards</span>
        <h1 className="font-serif text-4xl font-bold text-slate-900 mt-2">Safety, Privacy & Verification</h1>
        <p className="text-slate-600 text-sm mt-3 max-w-2xl mx-auto">
          Every user interaction on OppositeTalk is protected by confidential reporting, strict verification, and proactive moderation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-xs">
          <ShieldCheck className="w-8 h-8 text-emerald-600 mb-4" />
          <h3 className="font-bold text-slate-900 text-base">Identity Verification</h3>
          <p className="text-slate-600 text-xs mt-2 leading-relaxed">
            Multi-stage identity confirmation ensures that members are real adults with authentic intentions.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-xs">
          <Flag className="w-8 h-8 text-amber-600 mb-4" />
          <h3 className="font-bold text-slate-900 text-base">One-Click Reporting</h3>
          <p className="text-slate-600 text-xs mt-2 leading-relaxed">
            Report any inappropriate behavior, misrepresentation, or casual solicitations directly from profiles, posts, or messages.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-xs">
          <UserX className="w-8 h-8 text-slate-800 mb-4" />
          <h3 className="font-bold text-slate-900 text-base">Block & Mute</h3>
          <p className="text-slate-600 text-xs mt-2 leading-relaxed">
            Instantly block or mute accounts to restrict messaging and profile visibility without revealing actions to the blocked party.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900 text-white p-8">
        <h3 className="font-serif text-2xl font-bold mb-3">Community Anti-Harassment Policy</h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          OppositeTalk enforces a zero-tolerance policy against attacking, harassing, or excluding protected groups. All community members are expected to maintain dignified, constructive, and respectful discourse at all times. Internal moderation decisions are kept private to protect member confidentiality.
        </p>
      </div>
    </div>
  );
}
