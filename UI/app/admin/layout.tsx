'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { isAdminUser } from '@/lib/utils';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { ShieldAlert, Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  const isAdmin = isAuthenticated && isAdminUser(user);


  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/');
    }
  }, [isLoading, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0716] flex items-center justify-center text-purple-200">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-fuchsia-400 animate-spin" />
          <p className="text-xs font-semibold">Verifying Admin Credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0b0716] flex items-center justify-center p-4">
        <div className="futuristic-card p-8 rounded-3xl border border-rose-500/40 text-center max-w-md">
          <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white font-serif">Access Denied</h2>
          <p className="text-xs text-purple-300/70 mt-2">
            You must be logged in with an Administrator account to view the Admin Control Hub.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#090514] text-slate-100">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-y-auto">{children}</div>
    </div>
  );
}
