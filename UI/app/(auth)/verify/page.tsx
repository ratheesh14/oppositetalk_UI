'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySchema, VerifyFormData } from '@/schemas/authSchema';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/Button';
import { KeyRound, CheckCircle2 } from 'lucide-react';

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: VerifyFormData) => {
    setIsLoading(true);
    try {
      await authService.verifyAccount(data.code);
      setSuccess(true);
      setTimeout(() => {
        router.push('/eligibility');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-4">
        <KeyRound className="w-7 h-7" />
      </div>

      <h1 className="font-serif text-2xl font-bold text-slate-900">Verify Your Email</h1>
      <p className="text-xs text-slate-500 mt-1">
        We sent a 6-digit confirmation code to <span className="font-semibold text-slate-900">{email}</span>.
      </p>

      {success ? (
        <div className="my-8 p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Account Verified!</h3>
          <p className="text-xs text-emerald-700 mt-1">Redirecting to your Eligibility Assessment...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <input
              {...register('code')}
              type="text"
              maxLength={6}
              placeholder="123456"
              className="w-full tracking-widest text-center text-2xl font-mono rounded-xl border border-slate-300 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            {errors.code && <p className="text-xs text-red-600 mt-1">{errors.code.message}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full bg-slate-900 text-white font-bold" isLoading={isLoading}>
            Confirm Code & Proceed
          </Button>
        </form>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <Suspense fallback={
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full mx-auto" />
        </div>
      }>
        <VerifyForm />
      </Suspense>
    </div>
  );
}
