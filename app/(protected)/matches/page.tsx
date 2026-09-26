'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { matchingService } from '@/services/matchingService';
import { MatchProfile } from '@/types/matching';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Heart, MessageSquare, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await matchingService.getMatches();
        setMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadMatches();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Your Connected Matches</h1>
          <p className="text-xs text-slate-500">Mutual interest confirmed with shared values alignment</p>
        </div>
        <Badge variant="success" className="flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 fill-current text-rose-500" /> {matches.length} Connected Member(s)
        </Badge>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8">
          <Sparkles className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900 text-lg">No Mutual Matches Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Keep discovering members and expressing interest in profiles aligned with your goals.
          </p>
          <Link href="/discover" className="inline-block mt-6">
            <Button size="md" className="bg-slate-900 text-white font-bold">
              Discover Profiles
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <div
              key={match.profile.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={match.profile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={match.profile.basicInfo.displayName}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        {match.profile.basicInfo.displayName}, {match.profile.basicInfo.age}
                      </h3>
                      {match.profile.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{match.profile.profession.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">📍 {match.profile.basicInfo.location}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200/80 mb-4 text-xs">
                  <span className="font-semibold text-slate-700 block mb-1">Shared Alignment:</span>
                  <ul className="space-y-1">
                    {match.compatibility.sharedValues.slice(0, 3).map((val, idx) => (
                      <li key={idx} className="text-slate-600 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                        {val}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <Link href={`/profile/${match.profile.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </Link>
                <Link href={`/messages/conv_1`} className="flex-1">
                  <Button size="sm" className="w-full bg-slate-900 text-white font-bold">
                    <MessageSquare className="w-3.5 h-3.5 mr-1" /> Chat Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
