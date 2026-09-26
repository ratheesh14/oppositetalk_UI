'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reportSchema, ReportFormData } from '@/schemas/reportSchema';
import { reportService } from '@/services/reportService';
import { Button } from '@/components/ui/Button';
import { Flag, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'Profile' | 'Message' | 'Post' | 'Comment' | 'Community';
  targetId: string;
  targetName?: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  contentType,
  targetId,
  targetName = 'this content',
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      contentType,
      targetId,
      reason: '',
      details: '',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: ReportFormData) => {
    setIsLoading(true);
    try {
      await reportService.submitReport(data);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900">Report Received</h3>
            <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
              Thank you for keeping OppositeTalk safe. Our confidential moderation team will review this report carefully.
            </p>
            <Button onClick={handleClose} className="mt-6">
              Done
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Safety & Integrity</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Report {contentType}</h3>
            <p className="text-sm text-slate-500 mt-1">
              Please share why you are reporting {targetName}. All reports are confidential.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Reason for report</label>
                <select
                  {...register('reason')}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="">Select a reason...</option>
                  <option value="Inappropriate language or behavior">Inappropriate language or behavior</option>
                  <option value="Misrepresentation or fake profile">Misrepresentation or fake profile</option>
                  <option value="Commercial spam or solicitation">Commercial spam or solicitation</option>
                  <option value="Casual / non-committed intentions">Casual / non-committed intentions</option>
                  <option value="Other concern">Other concern</option>
                </select>
                {errors.reason && <p className="text-xs text-red-600 mt-1">{errors.reason.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Additional details (optional)</label>
                <textarea
                  {...register('details')}
                  rows={3}
                  placeholder="Provide context to help our moderation team review this issue..."
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                {errors.details && <p className="text-xs text-red-600 mt-1">{errors.details.message}</p>}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="destructive" isLoading={isLoading}>
                  <Flag className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
