'use client';

import React from 'react';
import { FileSpreadsheet, ShieldCheck } from 'lucide-react';

export default function AdminModerationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Content Moderation Audit</h1>
          <p className="text-xs text-slate-400">Automated keyword filters, moderation logs, and community enforcement</p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <p className="text-xs text-slate-300">
          All user-generated text and images undergo preliminary automated moderation before display. Internal moderation logs remain strictly confidential.
        </p>
      </div>
    </div>
  );
}
