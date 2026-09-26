'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Upload, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export default function VerificationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-4">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <h1 className="font-serif text-2xl font-bold text-slate-900">Member Verification</h1>
        <p className="text-xs text-slate-500 mt-1">
          Verification earns a gold checkmark badge on your profile and increases trust in the community.
        </p>

        {submitted ? (
          <div className="my-8 p-6 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-base">Verification Submitted</h3>
            <p className="text-xs text-emerald-700 mt-1">
              Our backend verification team is reviewing your details. Verification status updates within 24 hours.
            </p>
            <Link href="/discover" className="inline-block mt-6">
              <Button size="md" className="bg-slate-900 text-white font-bold">
                Continue to Discover <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitVerification} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Verification Document Type</label>
              <select className="w-full rounded-xl border border-slate-300 p-2.5 text-sm bg-white focus:ring-2 focus:ring-slate-900">
                <option value="id">Government-issued Photo ID / Passport</option>
                <option value="professional">Professional License / Degree Verification</option>
              </select>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">Click to upload document photo</p>
              <p className="text-[10px] text-slate-400 mt-1">JPG, PNG or PDF (Max 10MB)</p>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Your document is encrypted and never shared publicly or visible to other members.
            </p>

            <Button type="submit" size="lg" className="w-full bg-slate-900 text-white font-bold mt-2" isLoading={isLoading}>
              Submit Verification Request
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
