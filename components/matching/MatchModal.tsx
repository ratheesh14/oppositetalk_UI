'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { UserProfile } from '@/types/profile';
import { Heart, MessageSquare, Check, Sparkles, X } from 'lucide-react';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedProfile: UserProfile;
  sharedAreas?: string[];
  compatibilityScore?: number;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  onClose,
  matchedProfile,
  sharedAreas = [
    'Both looking for marriage',
    'Both want children',
    'Both value financial responsibility',
    'Similar lifestyle preferences',
  ],
  compatibilityScore = 94,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-4">
          <Sparkles className="w-8 h-8" />
        </div>

        <h2 className="text-3xl font-serif font-bold text-slate-900">You&apos;re connected.</h2>
        <p className="text-sm text-slate-600 mt-1">
          You and <span className="font-semibold text-slate-900">{matchedProfile.basicInfo.displayName}</span> share mutual relationship intentions.
        </p>

        {/* Profile Avatars */}
        <div className="flex items-center justify-center gap-4 my-6">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="You"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-sm border border-rose-100">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <img
            src={matchedProfile.photos[0]?.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
            alt={matchedProfile.basicInfo.displayName}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>

        {/* Common Areas Box */}
        <div className="rounded-2xl bg-slate-50 p-4 text-left border border-slate-200/80 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Shared Alignment Areas
          </h4>
          <ul className="space-y-2">
            {sharedAreas.map((area, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-800">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{area}</span>
              </li>
            ))}
          </ul>

          <p className="text-[11px] text-slate-400 mt-3 border-t border-slate-200/60 pt-2 italic">
            Compatibility estimate ({compatibilityScore}%): Algorithmic estimate based on stated preferences, not an absolute truth.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2.5">
          <Link href={`/messages/conv_1`} onClick={onClose}>
            <Button size="lg" className="w-full bg-slate-900 text-white hover:bg-slate-800">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send a Message
            </Button>
          </Link>
          <Button variant="outline" onClick={onClose} className="w-full">
            Keep Browsing
          </Button>
        </div>
      </div>
    </div>
  );
};
