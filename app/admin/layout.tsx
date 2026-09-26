import React from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-y-auto">{children}</div>
    </div>
  );
}
