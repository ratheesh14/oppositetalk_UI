'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Compass,
  MessageSquare,
  Users,
  Rss,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Heart,
  Settings,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/40 bg-[#0b0716]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Futuristic Glowing Brand Logo */}
        <Link href={isAuthenticated ? '/discover' : '/'} className="flex items-center gap-3 group">
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
            {isAuthenticated ? (
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
            ) : (
              <>
                <Link href="/how-it-works" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-purple-300 transition">
                  How It Works
                </Link>
                <Link href="/about" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-purple-300 transition">
                  About
                </Link>
                <Link href="/safety" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-purple-300 transition">
                  Safety & Ethics
                </Link>
              </>
            )}
          </nav>
        )}

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {user?.role === 'Admin' && (
                <Link href="/admin/dashboard">
                  <Badge variant="warning" className="cursor-pointer hover:bg-amber-900/60 flex items-center gap-1 text-amber-300 border-amber-500/40">
                    <ShieldCheck className="w-3 h-3" /> Admin Hub
                  </Badge>
                </Link>
              )}
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
              <button
                onClick={logout}
                title="Log out"
                className="p-2 text-purple-400 hover:text-purple-200 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/eligibility">
                <Button size="sm" variant="neon">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Check Eligibility
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-purple-300 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-900/60 bg-[#130b24] px-4 pt-3 pb-6 space-y-3 text-white">
          {isAuthenticated ? (
            <>
              <Link href="/discover" className="block py-2 text-sm font-semibold text-purple-200" onClick={() => setMobileMenuOpen(false)}>
                Discover Profiles
              </Link>
              <Link href="/matches" className="block py-2 text-sm font-semibold text-purple-200" onClick={() => setMobileMenuOpen(false)}>
                Matches
              </Link>
              <Link href="/messages" className="block py-2 text-sm font-semibold text-purple-200" onClick={() => setMobileMenuOpen(false)}>
                Messages
              </Link>
              <Link href="/feed" className="block py-2 text-sm font-semibold text-purple-200" onClick={() => setMobileMenuOpen(false)}>
                Feed
              </Link>
              <Link href="/communities" className="block py-2 text-sm font-semibold text-purple-200" onClick={() => setMobileMenuOpen(false)}>
                Communities
              </Link>
              <div className="pt-3 border-t border-purple-900/60 flex justify-between items-center">
                <span className="text-xs text-purple-400">Signed in as {user?.email}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Log Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/eligibility" className="block text-sm font-bold text-fuchsia-300" onClick={() => setMobileMenuOpen(false)}>
                Check Eligibility
              </Link>
              <Link href="/login" className="block text-sm font-semibold text-purple-200" onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
              <Link href="/register" className="block text-sm font-semibold text-purple-200" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
