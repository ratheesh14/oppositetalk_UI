import React from 'react';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
      <p className="text-xs text-slate-500 mb-8">Last updated: September 2026</p>

      <div className="prose prose-slate text-sm space-y-6">
        <section>
          <h2 className="font-bold text-slate-900 text-base mb-2">1. Acceptance of Terms</h2>
          <p className="text-slate-600 leading-relaxed">
            By creating an account on OppositeTalk, you confirm that you are at least 18 years of age and seeking serious long-term relationship commitments, marriage, or family building.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-900 text-base mb-2">2. Community Standards</h2>
          <p className="text-slate-600 leading-relaxed">
            Members must engage with dignity and respect. Any harassment, hate speech, or casual commercial solicitation will result in account suspension or termination.
          </p>
        </section>
      </div>
    </div>
  );
}
