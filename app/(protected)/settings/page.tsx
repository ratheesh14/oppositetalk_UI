'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Settings, User, Bell, Lock, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuthStore();
  const [savedToast, setSavedToast] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('PublicToEligible');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Account & Privacy Settings</h1>
          <p className="text-xs text-slate-500">Manage security, notifications, and profile visibility</p>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Account Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-700" /> Member Account
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Email</label>
              <input
                type="email"
                disabled
                value={user?.email || 'alex.m@example.com'}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-slate-700"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Verification Status</label>
              <div className="pt-1">
                <Badge variant="success" className="py-1.5 px-3">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {user?.verificationStatus || 'Verified Member'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Visibility Settings */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-700" /> Privacy & Visibility
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Profile Visibility Level</label>
              <select
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-slate-50 focus:bg-white"
              >
                <option value="PublicToEligible">Visible to all eligible community members</option>
                <option value="MatchesOnly">Visible only to mutual matches</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-700" /> Notification Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span>Email updates on new mutual matches</span>
              <input
                type="checkbox"
                checked={matchAlerts}
                onChange={(e) => setMatchAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span>Community feed digests</span>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button type="button" variant="outline" onClick={logout} className="text-red-600 border-red-200 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-1" /> Log Out
          </Button>

          <Button type="submit" size="md" className="bg-slate-900 text-white font-bold">
            Save Changes
          </Button>
        </div>

        {savedToast && (
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center text-xs font-semibold">
            Settings updated successfully!
          </div>
        )}
      </form>
    </div>
  );
}
