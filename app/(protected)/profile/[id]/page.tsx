'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { profileService } from '@/services/profileService';
import { UserProfile } from '@/types/profile';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ReportModal } from '@/components/safety/ReportModal';
import {
  ShieldCheck,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Home,
  DollarSign,
  Coffee,
  Globe,
  Flag,
  MessageSquare,
} from 'lucide-react';

export default function PublicProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'About' | 'Career' | 'Goals' | 'Lifestyle' | 'Interests'>('About');
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await profileService.getProfileById(id);
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6">
        <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner & Avatar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xl mb-8">
        <div className="h-48 bg-slate-900 relative">
          <button
            onClick={() => setReportOpen(true)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-slate-300 hover:text-white transition"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>

        <div className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 mb-6 gap-4">
            <img
              src={profile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={profile.basicInfo.displayName}
              className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-slate-100"
            />

            <div className="flex items-center gap-3">
              <Button size="md" className="bg-slate-900 text-white font-bold">
                <MessageSquare className="w-4 h-4 mr-2" /> Message
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl font-bold text-slate-900">
                {profile.basicInfo.displayName}, {profile.basicInfo.age}
              </h1>
              {profile.isVerified && (
                <Badge variant="success">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {profile.verificationBadge}
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-4">
              <span>📍 {profile.basicInfo.location}</span>
              <span>💼 {profile.profession.title}</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-t border-slate-100 px-8 bg-slate-50/50 overflow-x-auto">
          {(['About', 'Career', 'Goals', 'Lifestyle', 'Interests'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition ${
                activeTab === tab
                  ? 'border-slate-900 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
        {activeTab === 'About' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Biography</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{profile.basicInfo.bio}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="font-semibold text-slate-500">Gender:</span>
                <span className="ml-2 font-medium text-slate-900">{profile.basicInfo.gender}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500">Relocation:</span>
                <span className="ml-2 font-medium text-slate-900">
                  {profile.location.openToRelocation ? 'Open to relocation' : 'Prefers current location'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Career' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <Briefcase className="w-5 h-5 text-slate-700 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{profile.profession.title}</h4>
                <p className="text-slate-600 mt-0.5">{profile.profession.industry} • {profile.profession.workStyle}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <GraduationCap className="w-5 h-5 text-slate-700 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{profile.education.degreeLevel} in {profile.education.fieldOfStudy}</h4>
                <p className="text-slate-600 mt-0.5">{profile.education.institution}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Goals' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Relationship Goals</h4>
              <p className="text-slate-700 font-medium">{profile.relationshipGoals.relationshipType}</p>
              <p className="text-slate-500 mt-1">Timeline to marriage: {profile.relationshipGoals.timelineToMarriage}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Family Vision</h4>
              <p className="text-slate-700 font-medium">{profile.familyGoals.wantsChildren}</p>
              <p className="text-slate-500 mt-1">{profile.familyGoals.familyValuesDescription}</p>
            </div>
          </div>
        )}

        {activeTab === 'Lifestyle' && (
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500">Smoking:</span>
              <p className="font-semibold text-slate-900 mt-0.5">{profile.lifestyle.smokingPreference}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500">Fitness Routine:</span>
              <p className="font-semibold text-slate-900 mt-0.5">{profile.lifestyle.fitnessRoutine}</p>
            </div>
          </div>
        )}

        {activeTab === 'Interests' && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Hobbies & Passions</h4>
            <div className="flex flex-wrap gap-2">
              {profile.interests.hobbies.map((item, i) => (
                <span key={i} className="text-xs px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        contentType="Profile"
        targetId={profile.id}
        targetName={profile.basicInfo.displayName}
      />
    </div>
  );
}
