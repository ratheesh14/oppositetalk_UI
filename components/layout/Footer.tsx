import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-purple-900/40 bg-[#07040e] text-purple-300/80 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-700 to-fuchsia-500 text-white font-serif font-bold text-sm shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                O
              </div>
              <span className="font-serif text-lg font-bold text-white">
                Opposite<span className="text-purple-400">Talk</span>
              </span>
            </div>
            <p className="text-xs text-purple-300/70 leading-relaxed">
              A values-based relationship platform for adults serious about long-term commitment, marriage, family growth, financial responsibility, and shared life goals.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/eligibility" className="hover:text-white transition">
                  Eligibility Assessment
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white transition">
                  Safety & Ethics
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-3">Trust & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white transition">
                  Community Standards
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-3">Community Principles</h4>
            <p className="text-xs text-purple-300/70 leading-relaxed mb-4">
              Focusing on individual character, family commitment, and economic responsibility with dignified, respectful interactions.
            </p>
            <span className="text-[11px] font-bold text-fuchsia-300 bg-fuchsia-950/60 px-3 py-1.5 rounded-full border border-fuchsia-500/30 shadow-[0_0_10px_rgba(217,70,239,0.2)]">
              Verified Adult Community
            </span>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-purple-900/40 flex flex-col sm:flex-row justify-between items-center text-xs text-purple-400/60">
          <p>© {new Date().getFullYear()} OppositeTalk UI. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Sleek Futuristic Design • Next.js & TypeScript</p>
        </div>
      </div>
    </footer>
  );
};
