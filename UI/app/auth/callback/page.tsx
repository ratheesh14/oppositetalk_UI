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

import { checkStrictAgeGenderEligibility } from '@/lib/eligibilityRules';
import { useEligibilityStore } from '@/store/useEligibilityStore';
import { isAdminUser } from '@/lib/utils';
import { authService } from '@/services/authService';


function AuthCallbackContent() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const setEligibilityResult = useEligibilityStore((s) => s.setResult);

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
    let mounted = true;

    async function handleAuthCallback() {
      try {
        // 1. Check existing Auth Store or localStorage backup
        const storedUserStr = typeof window !== 'undefined' ? localStorage.getItem('oppositetalk_user') : null;
        let existingUser = useAuthStore.getState().user;
        if (!existingUser && storedUserStr) {
          try {
            existingUser = JSON.parse(storedUserStr);
          } catch {}
        }

        if (isAdminUser(existingUser)) {
          if (mounted) setStep('complete');
          router.push('/admin/dashboard');
          return;
        }

        // 2. Fetch active session from Supabase
        let sessionRes = await supabase.auth.getSession().catch(() => ({ data: { session: null } }));
        let session = sessionRes.data?.session;

        if (!session) {
          await new Promise((res) => setTimeout(res, 400));
          sessionRes = await supabase.auth.getSession().catch(() => ({ data: { session: null } }));
          session = sessionRes.data?.session;
        }

        let email = session?.user?.email || '';
        let name = session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || '';
        let avatar = session?.user?.user_metadata?.avatar_url || session?.user?.user_metadata?.picture || '';

        // Fallback hash check if session is processing in URL hash
        if (!email && typeof window !== 'undefined' && window.location.hash) {
          const params = new URLSearchParams(window.location.hash.substring(1));
          const token = params.get('access_token');
          if (token) {
            try {
              const { data: userData } = await supabase.auth.getUser(token);
              email = userData?.user?.email || '';
              name = userData?.user?.user_metadata?.full_name || '';
              avatar = userData?.user?.user_metadata?.avatar_url || '';
            } catch {}
          }
        }

        if (email) {
          const nameParts = name.trim().split(' ');
          const firstName = nameParts[0] || 'User';
          const lastName = nameParts.slice(1).join(' ') || '';

          // Query backend DB to fetch user details and role directly from DB
          try {
            const authRes = await authService.googleAuth({
              email,
              firstName,
              lastName,
              avatarUrl: avatar,
            });

            if (mounted) {
              setAuth(authRes.user, authRes.tokens.accessToken);
              // If role is NOT 1 (User) e.g. Moderator (2), Admin (3), SuperAdmin (4), redirect to dashboard
              if (isAdminUser(authRes.user)) {
                setStep('complete');
                router.push('/admin/dashboard');
                return;
              }
            }
          } catch (apiErr) {
            console.warn('[Google Auth Callback] Backend API DB lookup warning:', apiErr);
          }

          setGoogleUserEmail(email);
          setGoogleAvatar(avatar);
          setFullName(name);
          setLoading(false);
          setStep('basic_info');
        } else {
          // Check if auth store or localStorage has existing user state
          const storedToken = typeof window !== 'undefined' ? localStorage.getItem('oppositetalk_token') : null;
          if (existingUser || storedToken) {
            const userToRedirect = existingUser || (storedUserStr ? JSON.parse(storedUserStr) : null);
            if (isAdminUser(userToRedirect)) {
              router.push('/admin/dashboard');
              return;
            }
          }
          // If no session from Supabase, allow basic info entry
          setLoading(false);
          setStep('basic_info');
        }


      } catch (err) {
        setLoading(false);
        setStep('basic_info');
      }
    }

    handleAuthCallback();

    return () => {
      mounted = false;
    };
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

    // STRICT AGE & GENDER ELIGIBILITY CHECK (Male > 26, Female > 24)
    const eligibilityCheck = checkStrictAgeGenderEligibility(numAge, gender);
    if (!eligibilityCheck.isEligible) {
      setFormError(eligibilityCheck.reason!);

      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || 'User';
      const lastName = nameParts.slice(1).join(' ') || '';

      const ineligibleUser = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email: googleUserEmail || 'google.user@example.com',
        firstName,
        lastName,
        age: numAge,
        gender,
        role: 'User' as const,
        isEligible: false,
        isProfileComplete: false,
        verificationStatus: 'Rejected' as const,
        avatarUrl: googleAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        createdAt: new Date().toISOString(),
      };

      setEligibilityResult({
        isEligible: false,
        status: 'NotEligible',
        reasons: [eligibilityCheck.reason!],
        evaluatedAt: new Date().toISOString(),
        assessmentVersion: 'v2.4-strict-age',
      });

      setAuth(ineligibleUser, 'jwt_real_google_oauth_' + Date.now());
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        router.push('/eligibility/result');
      }, 1000);
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
        age: numAge,
        gender,
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
                  placeholder="Enter your full name"
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
