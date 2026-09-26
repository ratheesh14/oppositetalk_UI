'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Heart } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Platform Analytics</h1>
          <p className="text-xs text-slate-400">Aggregate growth, match rate, and eligibility pass rates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <span className="text-xs text-slate-400 font-semibold uppercase">Assessment Pass Rate</span>
          <h3 className="text-3xl font-bold text-white mt-2">75.7%</h3>
          <p className="text-[11px] text-emerald-400 mt-1">↑ 2.3% from last month</p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <span className="text-xs text-slate-400 font-semibold uppercase">Mutual Match Conversion</span>
          <h3 className="text-3xl font-bold text-white mt-2">34.2%</h3>
          <p className="text-[11px] text-emerald-400 mt-1">High quality mutual intent</p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <span className="text-xs text-slate-400 font-semibold uppercase">Monthly Active Members</span>
          <h3 className="text-3xl font-bold text-white mt-2">11,240</h3>
          <p className="text-[11px] text-slate-400 mt-1">Verified & Active</p>
        </div>
      </div>
    </div>
  );
}
