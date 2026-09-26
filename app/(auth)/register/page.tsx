'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/schemas/authSchema';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { UserPlus, User, Mail, Lock, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const result = await authService.register(data);
      if (result.requireVerification) {
        router.push(`/verify?email=${encodeURIComponent(data.email)}`);
      } else {
        router.push('/eligibility');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please check your information.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-serif font-bold text-xl mb-3">
            O
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Create Your Account</h1>
          <p className="text-xs text-slate-500 mt-1">Begin your values-based membership journey</p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
              <input
                {...register('firstName')}
                type="text"
                placeholder="Alex"
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
              <input
                {...register('lastName')}
                type="text"
                placeholder="Morgan"
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              {...register('email')}
              type="email"
              placeholder="alex.m@example.com"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="At least 8 characters with numbers & uppercase"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              type="password"
              placeholder="Re-enter password"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              {...register('agreeTerms')}
              type="checkbox"
              id="agreeTerms"
              className="h-4 w-4 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
            />
            <label htmlFor="agreeTerms" className="text-xs text-slate-600 leading-normal">
              I agree to the{' '}
              <Link href="/terms" className="font-semibold text-slate-900 underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-semibold text-slate-900 underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {errors.agreeTerms && <p className="text-xs text-red-600">{errors.agreeTerms.message}</p>}

          <Button type="submit" size="lg" className="w-full bg-slate-900 text-white font-bold mt-2" isLoading={isLoading}>
            <UserPlus className="w-4 h-4 mr-2" />
            Create Account & Proceed
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-slate-900 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
