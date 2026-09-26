'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { signInWithGoogleReal } from '@/lib/supabaseClient';
import {
  ShieldCheck,
  HeartHandshake,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  User as UserIcon,
  Calendar,
  Users,
  X,
  Check,
  Plus,
  Mail,
  ShieldAlert,
} from 'lucide-react';

function LandingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);

  // Auth Flow State: 'idle' | 'select_account' | 'authenticating' | 'basic_info' | 'complete'
  const [flowStep, setFlowStep] = useState<'idle' | 'select_account' | 'authenticating' | 'basic_info' | 'complete'>('idle');
  
  // Custom Email Input State
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Step 2 Form State (Name, Age, Gender)
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('Male');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if opened with ?auth=google query param from Navbar
  useEffect(() => {
    if (searchParams.get('auth') === 'google') {
      setFlowStep('select_account');
    }
  }, [searchParams]);

  // Handle Initiating Google Authentication for a specific email
  const executeGoogleAuth = (emailToAuth: string) => {
    const email = emailToAuth.trim().toLowerCase();
    if (!email) {
      setFormError('Please enter a valid Google email address');
      return;
    }

    setSelectedEmail(email);
    setFlowStep('authenticating');
    setFormError('');

    setTimeout(() => {
      const isAdmin = email === 'info.zentroax@zentroax.com';

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
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          createdAt: new Date().toISOString(),
        };

        const mockToken = 'mock_jwt_admin_zentroax_token_' + Date.now();
        setAuth(adminUser, mockToken);
        setFlowStep('complete');
        
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        // Pre-fill name from email prefix if custom, or default to Alex Morgan
        const emailPrefix = email.split('@')[0];
        const formattedName = emailPrefix
          .split(/[._-]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        setFullName(formattedName || 'Google User');
        setFlowStep('basic_info');
      }
    }, 1200);
  };

  // Submit Name, Age, and Gender
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

    if (numAge > 120) {
      setFormError('Please enter a realistic age.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || 'User';
      const lastName = nameParts.slice(1).join(' ') || '';

      const isAdmin = selectedEmail.trim().toLowerCase() === 'info.zentroax@zentroax.com';

      const userObject = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email: selectedEmail || 'google.user@example.com',
        firstName,
        lastName,
        role: isAdmin ? ('Admin' as const) : ('User' as const),
        isEligible: true,
        isProfileComplete: false,
        verificationStatus: 'Pending' as const,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock_jwt_google_auth_token_' + Date.now();
      setAuth(userObject, mockToken);
      
      setFlowStep('complete');
      setIsSubmitting(false);

      setTimeout(() => {
        if (isAdmin) {
          router.push('/admin/dashboard');
        } else {
          router.push('/eligibility');
        }
      }, 1000);
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0716] text-purple-100 relative overflow-hidden">
      {/* FUTURISTIC PURPLE RADIAL GLOW & BACKGROUND PATTERN */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-700/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#58218e_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-28 lg:pt-28 lg:pb-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Sparkle Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-950/80 px-4 py-1.5 text-xs font-bold text-fuchsia-300 border border-purple-500/40 mb-8 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Values-First Relationship & Family Platform</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-tight text-white">
          Find someone serious about{' '}
          <span className="gradient-text-purple">marriage, family & shared values.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-2xl text-purple-200/80 max-w-3xl mx-auto font-normal leading-relaxed">
          A deliberate community for adults seeking long-term commitment, personal growth, and financial responsibility.
        </p>

        {/* GOOGLE AUTHENTICATION HERO CARD */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="futuristic-card p-8 rounded-3xl border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.25)] backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-600" />
            
            <h3 className="text-xl font-bold text-white mb-2 font-serif">Get Started with OppositeTalk</h3>
            <p className="text-xs text-purple-300/80 mb-6">
              Sign in securely using your Google Account to begin setup.
            </p>

            {/* Primary Google Auth Button */}
            <button
              onClick={() => signInWithGoogleReal()}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-purple-50 text-slate-900 font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(232,121,249,0.5)] border border-purple-200 active:scale-[0.98] group cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-base tracking-tight">Continue with Google</span>
              <ArrowRight className="w-4 h-4 ml-auto text-purple-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Admin Quick Action */}
            <div className="mt-5 pt-4 border-t border-purple-900/60 flex flex-col items-center gap-2 text-xs">
              <span className="text-purple-300/60">Platform Administrator?</span>
              <button
                type="button"
                onClick={() => executeGoogleAuth('info.zentroax@zentroax.com')}
                className="text-fuchsia-300 font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Sign In as Admin (info.zentroax@zentroax.com)
              </button>
            </div>
          </div>
        </div>

        {/* TRUST HIGHLIGHTS */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-5xl mx-auto pt-12 border-t border-purple-900/40">
          <div className="futuristic-card p-5 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-fuchsia-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Identity Verification</h4>
            <p className="text-xs text-purple-300/70 mt-1">Screened for authentic intent</p>
          </div>
          <div className="futuristic-card p-5 rounded-2xl">
            <HeartHandshake className="w-6 h-6 text-fuchsia-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Marriage & Family Focus</h4>
            <p className="text-xs text-purple-300/70 mt-1">Clear long-term goals</p>
          </div>
          <div className="futuristic-card p-5 rounded-2xl">
            <Lock className="w-6 h-6 text-fuchsia-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Encrypted & Private</h4>
            <p className="text-xs text-purple-300/70 mt-1">SignalR real-time security</p>
          </div>
          <div className="futuristic-card p-5 rounded-2xl">
            <Award className="w-6 h-6 text-fuchsia-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Curated Community</h4>
            <p className="text-xs text-purple-300/70 mt-1">Values eligibility screened</p>
          </div>
        </div>
      </section>

      {/* STEP 1: GOOGLE ACCOUNT SELECTION MODAL */}
      {flowStep === 'select_account' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 animate-in fade-in duration-200">
          <div className="futuristic-card max-w-md w-full p-7 rounded-3xl border border-purple-500/50 relative shadow-[0_0_60px_rgba(217,70,239,0.35)]">
            <button
              onClick={() => {
                setFlowStep('idle');
                setShowCustomInput(false);
              }}
              className="absolute top-5 right-5 text-purple-400 hover:text-white p-1 rounded-full hover:bg-purple-900/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Choose a Google Account</h3>
              <p className="text-xs text-purple-300/70 mt-1">to continue to OppositeTalk</p>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs text-rose-200">
                {formError}
              </div>
            )}

            {/* Account List */}
            <div className="space-y-3">
              {/* Account 1: Admin */}
              <button
                type="button"
                onClick={() => executeGoogleAuth('info.zentroax@zentroax.com')}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-purple-950/80 hover:bg-purple-900/90 border border-purple-800/60 hover:border-purple-500 transition-all text-left cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center text-amber-400 font-bold border border-amber-500/40 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    Zentroax Admin
                    <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded-md">
                      SuperAdmin
                    </span>
                  </div>
                  <div className="text-xs text-purple-300/70 truncate">info.zentroax@zentroax.com</div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Account 2: Demo Member */}
              <button
                type="button"
                onClick={() => executeGoogleAuth('alex.morgan@gmail.com')}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-purple-950/80 hover:bg-purple-900/90 border border-purple-800/60 hover:border-purple-500 transition-all text-left cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-fuchsia-900/80 flex items-center justify-center text-fuchsia-300 font-bold border border-fuchsia-500/40 shrink-0">
                  AM
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white">Alex Morgan</div>
                  <div className="text-xs text-purple-300/70 truncate">alex.morgan@gmail.com</div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Custom Google Account Input Toggle */}
              {showCustomInput ? (
                <div className="pt-2">
                  <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-fuchsia-400" />
                    Enter Google Email Address
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      placeholder="e.g. your.email@gmail.com"
                      className="flex-1 rounded-xl bg-purple-950/90 border border-purple-700/60 px-3.5 py-2.5 text-xs text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                    <Button
                      type="button"
                      variant="neon"
                      size="sm"
                      onClick={() => executeGoogleAuth(customGoogleEmail)}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-purple-700/60 hover:border-fuchsia-500 hover:bg-purple-900/30 text-xs font-bold text-fuchsia-300 transition-all cursor-pointer mt-2"
                >
                  <Plus className="w-4 h-4" />
                  Use another Google Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: GOOGLE AUTHENTICATING SPINNER */}
      {flowStep === 'authenticating' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="futuristic-card max-w-md w-full p-8 rounded-3xl border border-purple-500/50 text-center relative shadow-[0_0_50px_rgba(217,70,239,0.3)]">
            <div className="relative mx-auto w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-purple-900 border-t-fuchsia-400 animate-spin" />
              <div className="absolute inset-2 rounded-full bg-purple-950 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Connecting to Google...</h3>
            <p className="text-xs text-purple-300/70 mt-2">
              Authenticating <span className="text-white font-bold">{selectedEmail}</span> securely
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: POST-GOOGLE AUTHENTICATION SETUP MODAL (NAME, AGE, GENDER) */}
      {(flowStep === 'basic_info' || flowStep === 'complete') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 animate-in fade-in duration-300">
          <div className="futuristic-card max-w-lg w-full p-8 rounded-3xl border border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.35)] relative overflow-hidden">
            <button
              onClick={() => setFlowStep('idle')}
              className="absolute top-5 right-5 text-purple-400 hover:text-white p-1 rounded-full hover:bg-purple-900/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {flowStep === 'complete' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-fuchsia-600/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-fuchsia-400 text-fuchsia-300">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Profile Basics Saved!</h3>
                <p className="text-xs text-purple-300/80 mt-2">
                  Welcome, <span className="font-bold text-white">{fullName}</span>. Redirecting you to the Values Eligibility Assessment...
                </p>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-purple-900/80 text-fuchsia-400 border border-purple-500/40 mb-3">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white">Welcome to OppositeTalk</h2>
                  <p className="text-xs text-purple-300/80 mt-1">
                    Google Sign-In successful (<span className="text-white font-semibold">{selectedEmail}</span>)! Please enter your basic profile details.
                  </p>
                </div>

                {/* Form Error Notification */}
                {formError && (
                  <div className="mb-5 p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs font-medium text-rose-200">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSaveBasicInfo} className="space-y-5 text-left">
                  {/* Name Input */}
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

                  {/* Age Input */}
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

                  {/* Gender Selector */}
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

                  {/* Submit Button */}
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
      )}
    </div>
  );
}

export default function RootLandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0b0716] flex items-center justify-center text-purple-200">
        Loading...
      </div>
    }>
      <LandingPageContent />
    </Suspense>
  );
}
