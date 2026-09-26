'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';
import { EligibilityRuleConfig } from '@/types/admin';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sliders, Plus, CheckCircle2 } from 'lucide-react';

export default function AdminEligibilityPage() {
  const [rules, setRules] = useState<EligibilityRuleConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await adminService.getEligibilityRules();
        setRules(data);
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
          <h1 className="font-serif text-3xl font-bold text-white">Eligibility Management</h1>
          <p className="text-xs text-slate-400">Configure mandatory backend assessment criteria & version control</p>
        </div>
        <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
          <Plus className="w-4 h-4 mr-1" /> Add New Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rules.map((rule) => (
          <div key={rule.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{rule.section}</span>
              <Badge variant={rule.isActive ? 'success' : 'outline'}>
                {rule.isActive ? 'Active Rule' : 'Inactive'}
              </Badge>
            </div>

            <h3 className="font-bold text-white text-base">{rule.ruleName}</h3>
            <p className="text-xs text-slate-400">Action on Disqualification: <strong className="text-rose-400">{rule.actionOnFail}</strong></p>
            <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800 flex justify-between">
              <span>Rule Engine Version: {rule.version}</span>
              <span className="text-amber-300 font-semibold cursor-pointer">Configure</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
