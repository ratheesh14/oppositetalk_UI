'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CheckSquare,
  HelpCircle,
  Sliders,
  ShieldAlert,
  FileSpreadsheet,
  BadgeCheck,
  BarChart3,
  Settings,
  ArrowLeft,
} from 'lucide-react';

const ADMIN_LINKS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/eligibility', label: 'Eligibility', icon: CheckSquare },
  { href: '/admin/questions', label: 'Questions', icon: HelpCircle },
  { href: '/admin/rules', label: 'Eligibility Rules', icon: Sliders },
  { href: '/admin/verification', label: 'Verification', icon: BadgeCheck },
  { href: '/admin/reports', label: 'Reports', icon: ShieldAlert },
  { href: '/admin/moderation', label: 'Moderation', icon: FileSpreadsheet },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div>
        <div className="mb-6 px-3 py-2 border-b border-slate-800">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Admin Control Hub</span>
          <h3 className="text-sm font-bold text-white mt-0.5">OppositeTalk Console</h3>
        </div>

        <nav className="space-y-1">
          {ADMIN_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold border-l-4 border-amber-400'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-400" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <Link
          href="/discover"
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main Platform
        </Link>
      </div>
    </aside>
  );
};
