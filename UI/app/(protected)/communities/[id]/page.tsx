'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { communityService } from '@/services/communityService';
import { Community } from '@/types/community';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ReportModal } from '@/components/safety/ReportModal';
import { Users, ShieldAlert, Flag, CheckCircle2, MessageSquare, Plus } from 'lucide-react';

export default function CommunityDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [community, setCommunity] = useState<Community | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await communityService.getCommunityById(id);
        setCommunity(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  const handleToggleJoin = async () => {
    if (!community) return;
    const res = await communityService.toggleJoinCommunity(community.id);
    setCommunity({ ...community, isJoined: res.isJoined, memberCount: res.memberCount });
  };

  if (!community) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6">
        <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Community Banner & Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-slate-900 text-white font-serif font-bold text-2xl flex items-center justify-center shrink-0">
              {community.name.substring(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-slate-900">{community.name}</h1>
                <Badge variant="info">{community.category}</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">{community.memberCount} Members enrolled</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="md"
              onClick={handleToggleJoin}
              variant={community.isJoined ? 'outline' : 'primary'}
            >
              {community.isJoined ? 'Leave Community' : 'Join Community'}
            </Button>

            <button
              onClick={() => setReportOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-700 transition"
              title="Report community"
            >
              <Flag className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-6">{community.description}</p>

        {/* Community Rules */}
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Community Rules</h4>
          <ul className="space-y-1 text-xs text-slate-700">
            {community.rules.map((rule, idx) => (
              <li key={idx}>• {rule}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Discussion Posts */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-slate-900">Community Discussions</h3>
          <Button size="sm" className="bg-slate-900 text-white font-bold">
            <Plus className="w-4 h-4 mr-1" /> Create Post
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Elena Vance"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold text-sm text-slate-900">Elena Vance</h4>
              <span className="text-[11px] text-slate-400">2 hours ago</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            What are your core principles when planning family budget allocations between savings, investment, and leisure?
          </p>
        </div>
      </div>

      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        contentType="Community"
        targetId={community.id}
        targetName={community.name}
      />
    </div>
  );
}
