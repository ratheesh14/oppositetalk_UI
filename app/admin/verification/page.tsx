'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';
import { VerificationRequest } from '@/types/admin';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BadgeCheck, Check, X } from 'lucide-react';

export default function AdminVerificationPage() {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await adminService.getVerifications();
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Identity Verification Queue</h1>
          <p className="text-xs text-slate-400">Review government IDs and credentials for verified member badges</p>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">{req.userName}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Document: {req.documentType}</p>
              <span className="text-[10px] text-slate-500">Submitted: {new Date(req.submittedAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-3">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold">
                <Check className="w-4 h-4 mr-1" /> Approve Badge
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-slate-700 text-slate-300">
                <X className="w-4 h-4 mr-1" /> Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
