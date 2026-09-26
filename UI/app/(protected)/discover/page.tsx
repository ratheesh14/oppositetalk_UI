'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { profileService } from '@/services/profileService';
import { matchingService } from '@/services/matchingService';
import { UserProfile } from '@/types/profile';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ReportModal } from '@/components/safety/ReportModal';
import { MatchModal } from '@/components/matching/MatchModal';
import {
  Compass,
  SlidersHorizontal,
  MapPin,
  Briefcase,
  Heart,
  ShieldCheck,
  Eye,
  Flag,
  Sparkles,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [likedProfiles, setLikedProfiles] = useState<Record<string, boolean>>({});

  // Safety & Matching Modals
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<UserProfile | null>(null);

  // Filters State
  const [minAge, setMinAge] = useState(24);
  const [maxAge, setMaxAge] = useState(40);
  const [relationshipGoal, setRelationshipGoal] = useState('All');
  const [childrenPref, setChildrenPref] = useState('All');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await profileService.getDiscoverProfiles();
        setProfiles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const currentProfile = profiles[selectedProfileIndex];

  const handleLike = async (profile: UserProfile) => {
    setLikedProfiles((prev) => ({ ...prev, [profile.id]: true }));
    try {
      const res = await matchingService.likeProfile(profile.id);
      if (res.isMutual) {
        setMatchedProfile(profile);
        setMatchModalOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !currentProfile) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6">
        <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Discover Profiles</h1>
          <p className="text-xs text-slate-500">Explore members aligned with long-term marriage & family values</p>
        </div>
        <Badge variant="info" className="flex items-center gap-1">
          <Compass className="w-3.5 h-3.5" /> Curated Recommendations
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: FILTERS */}
        <div className="lg:col-span-3 space-y-6 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-700" /> Filter Criteria
            </h3>
            <button
              onClick={() => {
                setMinAge(24);
                setMaxAge(40);
                setRelationshipGoal('All');
                setChildrenPref('All');
              }}
              className="text-[11px] text-slate-500 hover:text-slate-900 font-medium"
            >
              Reset
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Age Range: {minAge} - {maxAge}
            </label>
            <input
              type="range"
              min={18}
              max={65}
              value={maxAge}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Relationship Goal</label>
            <select
              value={relationshipGoal}
              onChange={(e) => setRelationshipGoal(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2 text-xs bg-slate-50 focus:bg-white"
            >
              <option value="All">All Serious Intentions</option>
              <option value="Marriage">Marriage Focused</option>
              <option value="Longterm">Long-Term Partnership</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Children Preference</label>
            <select
              value={childrenPref}
              onChange={(e) => setChildrenPref(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2 text-xs bg-slate-50 focus:bg-white"
            >
              <option value="All">Any Preference</option>
              <option value="Wants">Definitely Want Children</option>
              <option value="Open">Open to Children</option>
            </select>
          </div>
        </div>

        {/* CENTER COLUMN: RECOMMENDED PROFILE CARD */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xl transition-all">
            {/* Main Photo & Badges */}
            <div className="relative h-80 sm:h-96 w-full bg-slate-900">
              <img
                src={currentProfile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                alt={currentProfile.basicInfo.displayName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-black/20" />

              <div className="absolute top-4 left-4 flex gap-2">
                {currentProfile.isVerified && (
                  <Badge variant="success" className="bg-emerald-600 text-white border-0 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {currentProfile.verificationBadge}
                  </Badge>
                )}
              </div>

              <button
                onClick={() => setReportModalOpen(true)}
                title="Report profile"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-slate-300 hover:text-white hover:bg-black/60 transition"
              >
                <Flag className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <h2 className="font-serif text-3xl font-bold">
                  {currentProfile.basicInfo.displayName}, {currentProfile.basicInfo.age}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-200 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {currentProfile.basicInfo.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> {currentProfile.profession.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Content Body */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">About</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{currentProfile.basicInfo.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-semibold uppercase text-slate-400">Relationship Intent</span>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5">
                    {currentProfile.relationshipGoals.relationshipType}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-semibold uppercase text-slate-400">Family Vision</span>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5">
                    {currentProfile.familyGoals.wantsChildren}
                  </p>
                </div>
              </div>

              {/* Selected Interests */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Primary Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.hobbies.map((h, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-medium">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-4">
                <Link href={`/profile/${currentProfile.id}`}>
                  <Button variant="outline" size="md">
                    <Eye className="w-4 h-4 mr-2" /> View Full Profile
                  </Button>
                </Link>

                <Button
                  size="md"
                  onClick={() => handleLike(currentProfile)}
                  disabled={likedProfiles[currentProfile.id]}
                  className={
                    likedProfiles[currentProfile.id]
                      ? 'bg-rose-100 text-rose-800 border-rose-200'
                      : 'bg-slate-900 text-white font-bold'
                  }
                >
                  <Heart className={`w-4 h-4 mr-2 ${likedProfiles[currentProfile.id] ? 'fill-current' : ''}`} />
                  {likedProfiles[currentProfile.id] ? 'Expressed Interest' : 'Express Interest'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OPTIONAL COMPATIBILITY INFORMATION */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-amber-700 font-semibold text-xs mb-3">
              <Sparkles className="w-4 h-4" /> Algorithmic Compatibility
            </div>
            <div className="text-center py-4 border-b border-slate-100">
              <span className="font-serif text-4xl font-bold text-slate-900">94%</span>
              <p className="text-xs text-slate-500 mt-1">Stated Values Alignment</p>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span>Family Goals:</span>
                <span className="font-semibold text-emerald-700">Matched</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Financial Style:</span>
                <span className="font-semibold text-emerald-700">Matched</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Marriage Timeline:</span>
                <span className="font-semibold text-emerald-700">Matched</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-4 italic">
              Note: Compatibility estimates are algorithmic based on self-reported survey answers, not an absolute guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Report Modal */}
      {currentProfile && (
        <ReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          contentType="Profile"
          targetId={currentProfile.id}
          targetName={currentProfile.basicInfo.displayName}
        />
      )}

      {/* Mutual Match Modal */}
      {matchedProfile && (
        <MatchModal
          isOpen={matchModalOpen}
          onClose={() => setMatchModalOpen(false)}
          matchedProfile={matchedProfile}
        />
      )}
    </div>
  );
}
