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
  Shield,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Heart,
  Settings,
  ShieldCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicPage = ['/', '/about', '/how-it-works', '/safety', '/privacy', '/terms'].includes(pathname);
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href={isAuthenticated ? '/discover' : '/'} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-serif font-bold text-lg shadow-sm">
            O
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight text-slate-900">OppositeTalk</span>
            <span className="block text-[10px] font-medium tracking-wide uppercase text-slate-500">Values & Family</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isAdminPage && (
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/discover"
                  className={`flex items-center gap-1.5 text-sm font-medium transition ${
                    pathname === '/discover' ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  Discover
                </Link>
                <Link
                  href="/matches"
                  className={`flex items-center gap-1.5 text-sm font-medium transition ${
                    pathname === '/matches' ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  Matches
                </Link>
                <Link
                  href="/messages"
                  className={`flex items-center gap-1.5 text-sm font-medium transition ${
                    pathname.startsWith('/messages') ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Messages
                </Link>
                <Link
                  href="/feed"
                  className={`flex items-center gap-1.5 text-sm font-medium transition ${
                    pathname === '/feed' ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Rss className="w-4 h-4" />
                  Feed
                </Link>
                <Link
                  href="/communities"
                  className={`flex items-center gap-1.5 text-sm font-medium transition ${
                    pathname.startsWith('/communities') ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Communities
                </Link>
              </>
            ) : (
              <>
                <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  How It Works
                </Link>
                <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  About
                </Link>
                <Link href="/safety" className="text-sm font-medium text-slate-600 hover:text-slate-900">
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
                  <Badge variant="warning" className="cursor-pointer hover:bg-amber-100 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Admin Hub
                  </Badge>
                </Link>
              )}
              <Link href="/settings" className="p-2 text-slate-600 hover:text-slate-900 transition">
                <Settings className="w-4 h-4" />
              </Link>
              <Link href="/profile/review" className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={user?.firstName}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <span className="text-xs font-semibold text-slate-800">{user?.firstName}</span>
              </Link>
              <button
                onClick={logout}
                title="Log out"
                className="p-2 text-slate-400 hover:text-slate-700 transition cursor-pointer"
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
                <Button size="sm" className="bg-slate-900 text-white">
                  Check Eligibility
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          {isAuthenticated ? (
            <>
              <Link href="/discover" className="block py-2 text-sm font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>
                Discover Profiles
              </Link>
              <Link href="/matches" className="block py-2 text-sm font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>
                Matches
              </Link>
              <Link href="/messages" className="block py-2 text-sm font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>
                Messages
              </Link>
              <Link href="/feed" className="block py-2 text-sm font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>
                Feed
              </Link>
              <Link href="/communities" className="block py-2 text-sm font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>
                Communities
              </Link>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-500">Signed in as {user?.email}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Log Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/eligibility" className="block text-sm font-semibold text-slate-900" onClick={() => setMobileMenuOpen(false)}>
                Check Eligibility
              </Link>
              <Link href="/login" className="block text-sm font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
              <Link href="/register" className="block text-sm font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
