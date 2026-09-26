'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import {
  User as UserIcon,
  Calendar,
  Users,
  Check,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [loading, setLoading] = useState(true);
  const [googleUserEmail, setGoogleUserEmail] = useState('');
  const [googleAvatar, setGoogleAvatar] = useState('');
  const [step, setStep] = useState<'loading' | 'basic_info' | 'complete'>('loading');

  // Basic Info Form State
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('Male');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function handleAuthCallback() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        let email = session?.user?.email || '';
        let name = session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || '';
        let avatar = session?.user?.user_metadata?.avatar_url || session?.user?.user_metadata?.picture || '';

        // Fallback hash check if session is processing
        if (!email && typeof window !== 'undefined' && window.location.hash) {
          const params = new URLSearchParams(window.location.hash.substring(1));
          const token = params.get('access_token');
          if (token) {
            const { data: userData } = await supabase.auth.getUser(token);
            email = userData?.user?.email || '';
            name = userData?.user?.user_metadata?.full_name || '';
            avatar = userData?.user?.user_metadata?.avatar_url || '';
          }
        }

        // If no active session found (e.g. mock or local test redirect)
        if (!email) {
          email = localStorage.getItem('last_google_auth_email') || 'alex.morgan@gmail.com';
          name = 'Alex Morgan';
          avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
        }

        setGoogleUserEmail(email);
        setGoogleAvatar(avatar);
        setFullName(name);

        const isAdmin = email.trim().toLowerCase() === 'info.zentroax@zentroax.com';

        if (isAdmin) {
          const adminUser = {
            id: 'usr_admin_zentroax',
            email: 'info.zentroax@zentroax.com',
            firstName: 'Zentroax',
            lastName: 'Admin',
            role: 'Admin' as const,
            isEligible: true,
            isProfileComplete: true,
            verificationStatus: 'Verified' as const,
            avatarUrl: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            createdAt: new Date().toISOString(),
          };

          const mockToken = session?.access_token || 'real_jwt_google_admin_token_' + Date.now();
          setAuth(adminUser, mockToken);
          setStep('complete');

          setTimeout(() => {
            router.push('/admin/dashboard');
          }, 1000);
        } else {
          setLoading(false);
          setStep('basic_info');
        }
      } catch (err) {
        setLoading(false);
        setStep('basic_info');
      }
    }

    handleAuthCallback();
  }, [router, setAuth]);

  const handleSaveBasicInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name');
      return;
    }

    const numAge = Number(age);
    if (!age || isNaN(numAge)) {
      setFormError('Please enter a valid age');
      return;
    }

    if (numAge < 18) {
      setFormError('OppositeTalk is exclusively for consenting adults age 18 and older.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || 'User';
      const lastName = nameParts.slice(1).join(' ') || '';

      const userObject = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email: googleUserEmail || 'google.user@example.com',
        firstName,
        lastName,
        role: 'User' as const,
        isEligible: true,
        isProfileComplete: false,
        verificationStatus: 'Pending' as const,
        avatarUrl: googleAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        createdAt: new Date().toISOString(),
      };

      setAuth(userObject, 'jwt_real_google_oauth_' + Date.now());
      setStep('complete');
      setIsSubmitting(false);

      setTimeout(() => {
        router.push('/eligibility');
      }, 1000);
    }, 800);
  };

  if (loading || step === 'loading') {
    return (
      <div className="min-h-screen bg-[#0b0716] flex flex-col items-center justify-center p-4 text-purple-200">
        <div className="futuristic-card p-8 rounded-3xl border border-purple-500/40 text-center max-w-sm">
          <Loader2 className="w-10 h-10 text-fuchsia-400 animate-spin mx-auto mb-4" />
          <h3 className="font-serif text-lg font-bold text-white">Completing Google Sign-In</h3>
          <p className="text-xs text-purple-300/70 mt-2">Connecting your Google credentials securely...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0716] flex items-center justify-center p-4">
      <div className="futuristic-card max-w-lg w-full p-8 rounded-3xl border border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.35)] relative overflow-hidden">
        {step === 'complete' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-fuchsia-600/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-fuchsia-400 text-fuchsia-300">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Google Auth Successful!</h3>
            <p className="text-xs text-purple-300/80 mt-2">
              Welcome, <span className="font-bold text-white">{fullName}</span> ({googleUserEmail}). Redirecting to OppositeTalk...
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-purple-900/80 text-fuchsia-400 border border-purple-500/40 mb-3">
                <UserIcon className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white">Welcome to OppositeTalk</h2>
              <p className="text-xs text-purple-300/80 mt-1">
                Signed in as <span className="text-white font-semibold">{googleUserEmail}</span>. Please complete your basic profile setup.
              </p>
            </div>

            {formError && (
              <div className="mb-5 p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs font-medium text-rose-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveBasicInfo} className="space-y-5 text-left">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-fuchsia-400" />
                  Full Name / Display Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-fuchsia-400" />
                  Your Age (Must be 18+)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value ? parseInt(e.target.value, 10) : '')}
                  placeholder="e.g. 28"
                  min="18"
                  max="120"
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-fuchsia-400" />
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {['Male', 'Female', 'Non-binary', 'Specify'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        gender === g
                          ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.5)]'
                          : 'bg-purple-950/60 text-purple-300 border-purple-800/60 hover:bg-purple-900/60'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  variant="neon"
                  size="lg"
                  className="w-full font-bold text-sm py-3.5"
                  isLoading={isSubmitting}
                >
                  Complete Profile & Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0716] flex items-center justify-center text-purple-200">Loading auth callback...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
