'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { signInWithGoogleReal, signOutUserReal } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Compass,
  MessageSquare,
  Users,
  Rss,
  LogOut,
  Menu,
  X,
  Heart,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { isAdminUser } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show the main app menu (Discover, Matches, Messages, Feed, Communities)
  // ONLY after finishing eligibility questions when they are eligible for marriage (or admin)
  const isEligibleForMarriage = (isAuthenticated && !!user && user.isEligible === true) || isAdminUser(user);

  // During onboarding questionnaire or auth callback, keep the navigation focused and clean
  const isExcludedPage = pathname.startsWith('/eligibility') || pathname.startsWith('/auth');
  const showAppMenu = isEligibleForMarriage && !isExcludedPage;

  const handleLogout = async () => {
    await signOutUserReal();
    logout();
    setMobileMenuOpen(false);
    router.push('/');
  };

  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/40 bg-[#0b0716]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Futuristic Glowing Brand Logo */}
        <Link href={showAppMenu ? '/discover' : '/'} className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-700 via-violet-600 to-fuchsia-500 text-white font-serif font-bold text-xl shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-400/40 group-hover:scale-105 transition-all">
            O
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Opposite<span className="text-purple-400">Talk</span>
            </span>
            <span className="block text-[9px] font-bold tracking-widest uppercase text-purple-400/80">
              Values & Commitment
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isAdminPage && (
          <nav className="hidden md:flex items-center gap-6">
            {showAppMenu ? (
              <>
                <Link
                  href="/discover"
                  className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                    pathname === '/discover' ? 'text-purple-300 font-bold border-b-2 border-purple-500 pb-1' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Compass className="w-4 h-4 text-purple-400" />
                  Discover
                </Link>
                <Link
                  href="/matches"
                  className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                    pathname === '/matches' ? 'text-purple-300 font-bold border-b-2 border-purple-500 pb-1' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className="w-4 h-4 text-fuchsia-400 fill-current" />
                  Matches
                </Link>
                <Link
                  href="/messages"
                  className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                    pathname.startsWith('/messages') ? 'text-purple-300 font-bold border-b-2 border-purple-500 pb-1' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  Messages
                </Link>
                <Link
                  href="/feed"
                  className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                    pathname === '/feed' ? 'text-purple-300 font-bold border-b-2 border-purple-500 pb-1' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Rss className="w-4 h-4 text-purple-400" />
                  Feed
                </Link>
                <Link
                  href="/communities"
                  className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                    pathname.startsWith('/communities') ? 'text-purple-300 font-bold border-b-2 border-purple-500 pb-1' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 text-purple-400" />
                  Communities
                </Link>
              </>
            ) : !isExcludedPage ? (
              <>
                <Link href="/how-it-works" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-purple-300 transition">
                  How It Works
                </Link>
                <Link href="/about" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-purple-300 transition">
                  About Us
                </Link>
                <Link href="/safety" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-purple-300 transition">
                  Safety & Ethics
                </Link>
              </>
            ) : null}
          </nav>
        )}

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && !!user ? (
            <div className="flex items-center gap-3">
              {isAdminUser(user) && (
                <Link href="/admin/dashboard">
                  <Badge variant="warning" className="cursor-pointer hover:bg-amber-900/60 flex items-center gap-1 text-amber-300 border-amber-500/40">
                    <ShieldCheck className="w-3 h-3" /> Admin Hub
                  </Badge>
                </Link>
              )}
              {showAppMenu && (
                <>
                  <Link href="/settings" className="p-2 text-purple-300 hover:text-white transition">
                    <Settings className="w-4 h-4" />
                  </Link>
                  <Link href="/profile/review" className="flex items-center gap-2.5 pl-3 border-l border-purple-900/60">
                    <img
                      src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={user?.firstName}
                      className="w-8 h-8 rounded-full object-cover border border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                    />
                    <span className="text-xs font-bold text-white">{user?.firstName}</span>
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                title="Log out"
                className="p-2 text-purple-400 hover:text-purple-200 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          ) : (
            <>
              <Button onClick={() => signInWithGoogleReal()} variant="neon" size="sm" className="gap-2 font-bold text-xs">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Sign In with Google
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-purple-300 focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-900/60 bg-[#130b24] px-4 pt-3 pb-6 space-y-3 text-white animate-in slide-in-from-top-2">
          {showAppMenu ? (
            <>
              <Link href="/discover" className="block py-2 text-sm font-semibold text-purple-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                Discover Profiles
              </Link>
              <Link href="/matches" className="block py-2 text-sm font-semibold text-purple-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                Matches
              </Link>
              <Link href="/messages" className="block py-2 text-sm font-semibold text-purple-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                Messages
              </Link>
              <Link href="/feed" className="block py-2 text-sm font-semibold text-purple-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                Feed
              </Link>
              <Link href="/communities" className="block py-2 text-sm font-semibold text-purple-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                Communities
              </Link>
              <div className="pt-3 border-t border-purple-900/60 flex justify-between items-center">
                <span className="text-xs text-purple-400 truncate max-w-[180px]">Signed in as {user?.email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-purple-700 text-purple-200">
                  Log Out
                </Button>
              </div>
            </>
          ) : (
            <>
              {!isExcludedPage && (
                <>
                  <Link href="/how-it-works" className="block py-2 text-sm font-semibold text-purple-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                    How It Works
                  </Link>
                  <Link href="/about" className="block py-2 text-sm font-semibold text-purple-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                    About Us
                  </Link>
                  <Link href="/safety" className="block py-2 text-sm font-semibold text-purple-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                    Safety & Ethics
                  </Link>
                </>
              )}
              <div className="pt-3 border-t border-purple-900/60">
                {isAuthenticated && !!user ? (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-purple-400 truncate max-w-[180px]">{user?.email}</span>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="border-purple-700 text-purple-200">
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => { setMobileMenuOpen(false); signInWithGoogleReal(); }} variant="neon" size="sm" className="w-full gap-2 font-bold text-xs py-3">
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Sign In with Google
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};
