'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';
import { ModerationReport } from '@/types/admin';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await adminService.getReports();
        setReports(data);
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
          <h1 className="font-serif text-3xl font-bold text-white">Reports & Safety Moderation</h1>
          <p className="text-xs text-slate-400">Confidential queue of member-submitted content reports</p>
        </div>
      </div>

      <div className="space-y-4">
        {reports.map((rep) => (
          <div key={rep.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-400 uppercase">Target: {rep.contentType}</span>
              <Badge variant="warning">{rep.status}</Badge>
            </div>

            <div>
              <p className="text-sm font-bold text-white">Reporter: {rep.reporterName} → Reported: {rep.reportedUserName}</p>
              <p className="text-xs text-slate-300 mt-1">Reason: <strong>{rep.reason}</strong></p>
              {rep.details && <p className="text-xs text-slate-400 mt-1 italic">&ldquo;{rep.details}&rdquo;</p>}
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs">
                Dismiss Report
              </Button>
              <Button size="sm" variant="destructive" className="text-xs">
                Action Account / Warning
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
