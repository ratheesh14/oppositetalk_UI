'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProfileWizardStore, TOTAL_PROFILE_STEPS } from '@/store/useProfileWizardStore';
import { profileService } from '@/services/profileService';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  Coffee,
  Heart,
  Home,
  DollarSign,
  Globe,
  Sparkles,
  Camera,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Save,
} from 'lucide-react';

const STEP_TITLES = [
  'Basic Information',
  'Education',
  'Profession',
  'Location',
  'Lifestyle',
  'Relationship Goals',
  'Family Goals',
  'Financial Preferences',
  'Travel Preferences',
  'Interests',
  'Photos',
  'Review & Submit',
];

export default function ProfileWizardPage() {
  const router = useRouter();
  const { currentStep, draftProfile, setStep, updateDraft, nextStep, prevStep } = useProfileWizardStore();
  const updateUser = useAuthStore((s) => s.updateUser);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

  const progressPercentage = (currentStep / TOTAL_PROFILE_STEPS) * 100;

  const handleSaveDraft = () => {
    setSaveMessage(true);
    setTimeout(() => setSaveMessage(false), 2000);
  };

  const handleCompleteWizard = async () => {
    setIsSubmitting(true);
    try {
      await profileService.updateProfile(draftProfile);
      updateUser({ isProfileComplete: true });
      router.push('/profile/review');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-3xl bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl">
        {/* Wizard Header */}
        <div className="mb-8 border-b border-slate-100 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Step {currentStep} of {TOTAL_PROFILE_STEPS}</span>
              <h1 className="font-serif text-2xl font-bold text-slate-900">{STEP_TITLES[currentStep - 1]}</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSaveDraft} className="text-xs self-start sm:self-auto">
              <Save className="w-3.5 h-3.5 mr-1" /> Save & Exit
            </Button>
          </div>

          <ProgressBar progressPercentage={progressPercentage} label="Profile Completion" />
        </div>

        {/* Dynamic Step Forms */}
        <div className="py-2">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={draftProfile.basicInfo?.displayName || ''}
                  onChange={(e) =>
                    updateDraft({ basicInfo: { ...draftProfile.basicInfo!, displayName: e.target.value } })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={draftProfile.basicInfo?.age || 28}
                    onChange={(e) =>
                      updateDraft({ basicInfo: { ...draftProfile.basicInfo!, age: Number(e.target.value) } })
                    }
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={draftProfile.basicInfo?.gender || 'Male'}
                    onChange={(e) =>
                      updateDraft({ basicInfo: { ...draftProfile.basicInfo!, gender: e.target.value } })
                    }
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">About / Bio</label>
                <textarea
                  rows={4}
                  value={draftProfile.basicInfo?.bio || ''}
                  onChange={(e) =>
                    updateDraft({ basicInfo: { ...draftProfile.basicInfo!, bio: e.target.value } })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Highest Degree Level</label>
                <input
                  type="text"
                  value={draftProfile.education?.degreeLevel || ''}
                  onChange={(e) =>
                    updateDraft({ education: { ...draftProfile.education!, degreeLevel: e.target.value } })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Field of Study</label>
                <input
                  type="text"
                  value={draftProfile.education?.fieldOfStudy || ''}
                  onChange={(e) =>
                    updateDraft({ education: { ...draftProfile.education!, fieldOfStudy: e.target.value } })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={draftProfile.profession?.title || ''}
                  onChange={(e) =>
                    updateDraft({ profession: { ...draftProfile.profession!, title: e.target.value } })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Industry</label>
                <input
                  type="text"
                  value={draftProfile.profession?.industry || ''}
                  onChange={(e) =>
                    updateDraft({ profession: { ...draftProfile.profession!, industry: e.target.value } })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City & State</label>
                <input
                  type="text"
                  value={draftProfile.location?.city || ''}
                  onChange={(e) =>
                    updateDraft({ location: { ...draftProfile.location!, city: e.target.value } })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                <input
                  type="text"
                  value={draftProfile.location?.country || ''}
                  onChange={(e) =>
                    updateDraft({ location: { ...draftProfile.location!, country: e.target.value } })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>
            </div>
          )}

          {currentStep >= 5 && currentStep <= 10 && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <h3 className="font-semibold text-slate-900 text-base">{STEP_TITLES[currentStep - 1]} Settings</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Preferences loaded into your profile draft. You can customize them anytime in Settings.
              </p>
            </div>
          )}

          {currentStep === 11 && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Upload Photos</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {draftProfile.photos?.map((photo) => (
                  <div key={photo.id} className="relative rounded-2xl overflow-hidden border border-slate-200 group">
                    <img src={photo.url} alt="Profile" className="w-full h-36 object-cover" />
                    {photo.isMain && (
                      <span className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Main
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 12 && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-1" />
                <h4 className="font-semibold text-sm">Profile Ready for Final Verification</h4>
                <p className="text-xs mt-1">Review all entries before making your profile active.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 bg-white text-xs space-y-2">
                <p><strong>Name:</strong> {draftProfile.basicInfo?.displayName}</p>
                <p><strong>Age:</strong> {draftProfile.basicInfo?.age} years old</p>
                <p><strong>Profession:</strong> {draftProfile.profession?.title}</p>
                <p><strong>Location:</strong> {draftProfile.location?.city}, {draftProfile.location?.country}</p>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Controls */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t border-slate-100">
          <Button variant="outline" size="md" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>

          {currentStep === TOTAL_PROFILE_STEPS ? (
            <Button size="md" onClick={handleCompleteWizard} isLoading={isSubmitting} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
              Complete Profile
            </Button>
          ) : (
            <Button size="md" onClick={nextStep} className="bg-slate-900 text-white">
              Next Step <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>

        {saveMessage && (
          <div className="mt-4 p-2 rounded-xl bg-slate-900 text-white text-center text-xs animate-in fade-in">
            Draft saved successfully.
          </div>
        )}
      </div>
    </div>
  );
}
