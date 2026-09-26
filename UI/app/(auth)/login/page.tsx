'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/authSchema';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/useAuthStore';
import { isAdminUser } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { LogIn, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthenticated, setAuth } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUserStr = typeof window !== 'undefined' ? localStorage.getItem('oppositetalk_user') : null;
    let currentUser = user;
    if (!currentUser && storedUserStr) {
      try {
        currentUser = JSON.parse(storedUserStr);
      } catch {}
    }

    if ((isAuthenticated || currentUser) && isAdminUser(currentUser)) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await authService.login(data);

      const isUserAdmin = isAdminUser(response.user) || isAdminUser({ email: data.email });
      if (isUserAdmin) {
        response.user.role = 'SuperAdmin';
        response.user.isEligible = true;
        response.user.isProfileComplete = true;
      }

      setAuth(response.user, response.tokens.accessToken);

      if (isUserAdmin) {
        router.push('/admin/dashboard');
      } else if (!response.user.isEligible) {
        router.push('/eligibility');
      } else if (!response.user.isProfileComplete) {
        router.push('/profile');
      } else {
        router.push('/discover');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-serif font-bold text-xl mb-3">
            O
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Sign In to OppositeTalk</h1>
          <p className="text-xs text-slate-500 mt-1">Welcome back to your values-based community</p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-xs font-medium text-slate-600 hover:text-slate-900">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              {...register('rememberMe')}
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
            />
            <label htmlFor="rememberMe" className="text-xs text-slate-600">
              Remember this device
            </label>
          </div>

          <Button type="submit" size="lg" className="w-full bg-slate-900 text-white font-bold" isLoading={isLoading}>
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
          New to OppositeTalk?{' '}
          <Link href="/register" className="font-semibold text-slate-900 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
