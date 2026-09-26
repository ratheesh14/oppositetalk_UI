'use client';

import React from 'react';
import { Sliders, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminRulesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Eligibility Rules Engine</h1>
          <p className="text-xs text-slate-400">Configure business logic triggers, age gates, and disclaimers</p>
        </div>
        <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
          <Plus className="w-4 h-4 mr-1" /> Create Rule Set
        </Button>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <h3 className="font-bold text-white text-base">Backend Rule Configuration Guidelines</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Rules defined here are evaluated dynamically by the backend API. The React frontend consumes question payloads and posts submissions for evaluation without embedding hard-coded rule decisions.
        </p>
      </div>
    </div>
  );
}
