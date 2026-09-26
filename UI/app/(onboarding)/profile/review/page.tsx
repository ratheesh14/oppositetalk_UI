'use client';

import React from 'react';
import Link from 'next/link';
import { useProfileWizardStore } from '@/store/useProfileWizardStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, ShieldCheck, Edit3, ArrowRight } from 'lucide-react';

export default function ProfileReviewPage() {
  const draftProfile = useProfileWizardStore((s) => s.draftProfile);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-3xl bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
          <div>
            <Badge variant="success" className="mb-2">Profile Complete</Badge>
            <h1 className="font-serif text-2xl font-bold text-slate-900">Profile Summary & Review</h1>
          </div>
          <Link href="/profile">
            <Button variant="outline" size="sm">
              <Edit3 className="w-4 h-4 mr-1" /> Edit Profile
            </Button>
          </Link>
        </div>

        {/* Profile Details Cards */}
        <div className="space-y-6 text-sm">
          <div className="flex items-center gap-4">
            <img
              src={draftProfile.photos?.[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt="Profile Avatar"
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{draftProfile.basicInfo?.displayName}, {draftProfile.basicInfo?.age}</h3>
              <p className="text-xs text-slate-500">{draftProfile.profession?.title} • {draftProfile.location?.city}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Relationship Goals</h4>
              <p className="font-medium text-slate-800">{draftProfile.relationshipGoals?.relationshipType}</p>
              <p className="text-xs text-slate-500 mt-1">Timeline: {draftProfile.relationshipGoals?.timelineToMarriage}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Family Vision</h4>
              <p className="font-medium text-slate-800">{draftProfile.familyGoals?.wantsChildren}</p>
              <p className="text-xs text-slate-500 mt-1">{draftProfile.familyGoals?.familyValuesDescription}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link href="/verification">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              <ShieldCheck className="w-4 h-4 mr-2 text-amber-600" /> Verify Identity Badge
            </Button>
          </Link>
          <Link href="/discover">
            <Button size="md" className="bg-slate-900 text-white font-bold w-full sm:w-auto">
              Go to Discover Profiles <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
