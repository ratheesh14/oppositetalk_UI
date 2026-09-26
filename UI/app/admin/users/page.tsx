'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, Search, ShieldCheck } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">User Management</h1>
          <p className="text-xs text-slate-400">View and manage member accounts, verification, and eligibility flags</p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search users by name, email, or ID..."
            className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Member</th>
              <th className="p-4">Email</th>
              <th className="p-4">Eligibility</th>
              <th className="p-4">Verification</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <tr className="hover:bg-slate-800/50">
              <td className="p-4 font-semibold text-white flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  className="w-7 h-7 rounded-full object-cover"
                />
                Elena Vance
              </td>
              <td className="p-4">elena.vance@example.com</td>
              <td className="p-4">
                <Badge variant="success">Eligible</Badge>
              </td>
              <td className="p-4">
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </td>
              <td className="p-4">
                <Button size="sm" variant="outline" className="text-xs text-slate-200 border-slate-700">
                  Manage
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
