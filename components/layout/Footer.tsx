import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white font-serif font-bold text-sm">
                O
              </div>
              <span className="font-serif text-base font-bold text-slate-900">OppositeTalk</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              A values-based social and relationship platform for adults serious about long-term relationships, marriage, family, personal growth, and shared lifestyle goals.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/how-it-works" className="hover:text-slate-900 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/eligibility" className="hover:text-slate-900 transition">
                  Eligibility Assessment
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-slate-900 transition">
                  Safety & Ethics
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-900 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">Trust & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-slate-900 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-slate-900 transition">
                  Community Standards
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">Community Principles</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              OppositeTalk is focused on individual character, family commitment, and economic responsibility without harassment or exclusion of protected groups.
            </p>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified Adult Platform
            </span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} OppositeTalk UI. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};
