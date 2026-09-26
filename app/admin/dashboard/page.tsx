'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';
import { AdminDashboardStats } from '@/types/admin';
import { Badge } from '@/components/ui/Badge';
import {
  Users,
  CheckSquare,
  ShieldAlert,
  Heart,
  BadgeCheck,
  Activity,
  Layers,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-amber-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-xs text-slate-400">Platform operational metrics & governance overview</p>
        </div>
        <Badge variant="success" className="bg-emerald-950 text-emerald-400 border-emerald-800">
          <Activity className="w-3.5 h-3.5 mr-1" /> System Status: {stats.systemHealth}
        </Badge>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Total Members</span>
            <Users className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Eligible Members</span>
            <CheckSquare className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-3xl font-bold text-white">{stats.eligibleUsersCount.toLocaleString()}</span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Pending Verifications</span>
            <BadgeCheck className="w-5 h-5 text-sky-400" />
          </div>
          <span className="text-3xl font-bold text-white">{stats.pendingVerifications}</span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Active Reports</span>
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>
          <span className="text-3xl font-bold text-white">{stats.activeReports}</span>
        </div>
      </div>
    </div>
  );
}
