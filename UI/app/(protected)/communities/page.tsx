'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { communityService } from '@/services/communityService';
import { Community } from '@/types/community';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Users, HeartHandshake, Home, TrendingUp, Compass, ArrowRight } from 'lucide-react';

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await communityService.getCommunities();
        setCommunities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Value Communities</h1>
          <p className="text-xs text-slate-500">Group discussions focused on marriage, parenting, wealth building, and self-growth</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communities.map((comm) => (
            <div
              key={comm.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold">
                    <Users className="w-6 h-6" />
                  </div>
                  <Badge variant={comm.isJoined ? 'success' : 'outline'}>
                    {comm.isJoined ? 'Member' : 'Public'}
                  </Badge>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{comm.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{comm.description}</p>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-4 border-t border-slate-100 pt-3 flex justify-between">
                  <span>Category: {comm.category}</span>
                  <span>{comm.memberCount} members</span>
                </div>

                <Link href={`/communities/${comm.id}`}>
                  <Button size="sm" className="w-full bg-slate-900 text-white font-bold">
                    View Community <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
