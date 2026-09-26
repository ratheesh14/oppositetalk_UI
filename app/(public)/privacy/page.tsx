import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-xs text-slate-500 mb-8">Last updated: September 2026</p>

      <div className="prose prose-slate text-sm space-y-6">
        <section>
          <h2 className="font-bold text-slate-900 text-base mb-2">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed">
            We collect information you provide during account creation, eligibility assessment, profile wizard steps, and user communications. This includes basic contact details, life vision preferences, education, and profession.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-900 text-base mb-2">2. How Information is Used</h2>
          <p className="text-slate-600 leading-relaxed">
            Your data is used solely to evaluate eligibility, generate algorithmic compatibility estimates, facilitate mutual matches, and ensure platform safety. We do not sell user personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-900 text-base mb-2">3. Confidentiality of Moderation & Eligibility</h2>
          <p className="text-slate-600 leading-relaxed">
            Internal moderation details and backend eligibility algorithms remain confidential to protect community standards and member privacy.
          </p>
        </section>
      </div>
    </div>
  );
}
