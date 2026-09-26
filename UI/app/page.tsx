'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';
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
} from 'lucide-react';

export default function RootLandingPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  // Auth Flow State: 'idle' | 'authenticating' | 'basic_info' | 'complete'
  const [flowStep, setFlowStep] = useState<'idle' | 'authenticating' | 'basic_info' | 'complete'>('idle');
  const [googleEmail, setGoogleEmail] = useState('');
  
  // Step 2 Form State (Name, Age, Gender)
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('Male');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trigger Google Auth Simulation
  const handleGoogleSignIn = (selectedEmail?: string) => {
    setFlowStep('authenticating');
    setFormError('');

    setTimeout(() => {
      const emailToUse = selectedEmail || 'info.zentroax@zentroax.com';
      const isAdmin = emailToUse.trim().toLowerCase() === 'info.zentroax@zentroax.com';

      setGoogleEmail(emailToUse);

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
        const mockGoogleName = 'Alex Morgan';
        setFullName(mockGoogleName);
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

      const isAdmin = googleEmail.trim().toLowerCase() === 'info.zentroax@zentroax.com';

      const userObject = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email: googleEmail || 'user@example.com',
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

      // Redirect to eligibility assessment or admin dashboard
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
              Sign in securely to begin your values eligibility and profile setup.
            </p>

            {/* Primary Google Auth Button */}
            <button
              onClick={() => handleGoogleSignIn()}
              disabled={flowStep === 'authenticating'}
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

            {/* Quick Admin Sign-In Link */}
            <div className="mt-5 pt-4 border-t border-purple-900/60 flex flex-col items-center gap-2 text-xs">
              <span className="text-purple-300/60">Platform Administrator?</span>
              <button
                type="button"
                onClick={() => handleGoogleSignIn('info.zentroax@zentroax.com')}
                className="text-fuchsia-300 font-bold hover:underline flex items-center gap-1.5"
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

      {/* STEP 1: GOOGLE AUTHENTICATING MODAL */}
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
            <p className="text-xs text-purple-300/70 mt-2">Authenticating your Google Account securely</p>
          </div>
        </div>
      )}

      {/* STEP 2: POST-GOOGLE AUTHENTICATION SETUP MODAL (NAME, AGE, GENDER) */}
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
                    Google Sign-In successful! Please enter your basic profile details to complete setup.
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
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
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

      {/* PLATFORM METHODOLOGY & FEATURES */}
      <section className="py-24 bg-[#0e071c] border-t border-purple-900/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">Methodology</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              A deliberate process for serious outcomes.
            </h2>
            <p className="text-purple-300/70 mt-4 text-sm sm:text-base">
              OppositeTalk replaces casual swipe mechanics with values compatibility, relationship intent, and mutual accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                01
              </div>
              <h3 className="font-bold text-white text-lg">Google Sign-In</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Seamless initial authentication capturing verified identity, full name, age, and gender preferences.
              </p>
            </div>

            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                02
              </div>
              <h3 className="font-bold text-white text-lg">Values Assessment</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                7-section confidential evaluation covering marriage intent, family timeline, and financial responsibility.
              </p>
            </div>

            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                03
              </div>
              <h3 className="font-bold text-white text-lg">Detailed Profile</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Share career goals, family vision, lifestyle habits, and financial priorities in a 12-step guided setup.
              </p>
            </div>

            <div className="futuristic-card p-6 rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold text-lg mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                04
              </div>
              <h3 className="font-bold text-white text-lg">Values Match & Chat</h3>
              <p className="text-purple-300/70 text-xs mt-3 leading-relaxed">
                Discover aligned partners and communicate securely in real-time SignalR chat without superficial distractions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
