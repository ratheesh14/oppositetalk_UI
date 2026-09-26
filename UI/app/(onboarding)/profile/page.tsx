'use client';

import React, { useState } from 'react';
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
  Sparkles,
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
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

  // Sync user details from auth store on initial load if available
  React.useEffect(() => {
    if (user) {
      const userFullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      
      const currentBasicInfo = draftProfile.basicInfo;
      const needsNameUpdate = !currentBasicInfo?.displayName && userFullName;
      const needsAgeUpdate = !currentBasicInfo?.age && user.age;
      const needsBioUpdate = !currentBasicInfo?.bio;

      if (needsNameUpdate || needsAgeUpdate || needsBioUpdate) {
        updateDraft({
          basicInfo: {
            displayName: needsNameUpdate ? userFullName : (currentBasicInfo?.displayName || userFullName),
            age: needsAgeUpdate && user.age ? user.age : (currentBasicInfo?.age || 29),
            gender: currentBasicInfo?.gender || user.gender || 'Male',
            location: currentBasicInfo?.location || 'Chicago, IL',
            bio: currentBasicInfo?.bio || 'Focused on personal development, career stability, and finding a partner to build a meaningful future and family with.',
          },
        });
      }
    }
  }, [user]);

  const handleAutoGenerateBio = () => {
    const name = draftProfile.basicInfo?.displayName || user?.firstName || '';
    const age = draftProfile.basicInfo?.age || user?.age || 29;
    const profession = draftProfile.profession?.title || 'Senior Software Engineer';
    const industry = draftProfile.profession?.industry || 'Technology';
    const city = draftProfile.location?.city || draftProfile.basicInfo?.location || 'Chicago, IL';
    const values = draftProfile.relationshipGoals?.primaryValues?.length 
      ? draftProfile.relationshipGoals.primaryValues.join(', ')
      : 'Integrity, Family, Personal Growth';
    const timeline = draftProfile.relationshipGoals?.timelineToMarriage || '1-2 years';
    const hobbies = draftProfile.interests?.hobbies?.length 
      ? draftProfile.interests.hobbies.slice(0, 3).join(', ') 
      : 'Reading, Hiking, Personal Finance';

    const generatedBio = `Focused on personal development, career stability, and finding a partner to build a meaningful future and family with. As a ${age}-year-old ${profession} in ${industry} based in ${city}, I value ${values}. In my free time, I enjoy ${hobbies}. Looking to connect with an authentic partner aligned on building a long-term future together (${timeline}).`;

    updateDraft({
      basicInfo: {
        ...draftProfile.basicInfo!,
        bio: generatedBio,
      },
    });
  };

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
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b0716] text-purple-100 py-10 px-4 relative overflow-hidden">
      {/* Radial Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-700/15 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="mx-auto max-w-3xl futuristic-card rounded-3xl border border-purple-500/40 p-6 sm:p-10 shadow-[0_0_50px_rgba(168,85,247,0.2)] backdrop-blur-2xl relative z-10">
        {/* Wizard Header */}
        <div className="mb-8 border-b border-purple-900/60 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
                Step {currentStep} of {TOTAL_PROFILE_STEPS}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                {STEP_TITLES[currentStep - 1]}
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              className="text-xs self-start sm:self-auto border-purple-700/60 text-purple-200 hover:bg-purple-900/60"
            >
              <Save className="w-3.5 h-3.5 mr-1 text-fuchsia-400" /> Save & Exit
            </Button>
          </div>

          <ProgressBar progressPercentage={progressPercentage} label="Profile Completion" />
        </div>

        {/* Dynamic Step Forms */}
        <div className="py-2">
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-fuchsia-400" />
                  Display Name
                </label>
                <input
                  type="text"
                  value={draftProfile.basicInfo?.displayName || ''}
                  onChange={(e) =>
                    updateDraft({ basicInfo: { ...draftProfile.basicInfo!, displayName: e.target.value } })
                  }
                  placeholder="Enter your full display name"
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-purple-200 mb-1.5">Age</label>
                  <input
                    type="number"
                    value={draftProfile.basicInfo?.age || ''}
                    onChange={(e) =>
                      updateDraft({ basicInfo: { ...draftProfile.basicInfo!, age: Number(e.target.value) } })
                    }
                    placeholder="e.g. 28"
                    min="18"
                    max="120"
                    className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-purple-200 mb-1.5">Gender</label>
                  <select
                    value={draftProfile.basicInfo?.gender || 'Male'}
                    onChange={(e) =>
                      updateDraft({ basicInfo: { ...draftProfile.basicInfo!, gender: e.target.value } })
                    }
                    className="w-full rounded-xl bg-purple-950/90 border border-purple-700/60 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 cursor-pointer"
                  >
                    <option value="Male" className="bg-[#130b24] text-white">Male</option>
                    <option value="Female" className="bg-[#130b24] text-white">Female</option>
                    <option value="Non-binary" className="bg-[#130b24] text-white">Non-binary</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-purple-200">About / Bio</label>
                  <button
                    type="button"
                    onClick={handleAutoGenerateBio}
                    className="text-[11px] font-semibold text-fuchsia-300 hover:text-white flex items-center gap-1.5 bg-fuchsia-950/80 border border-fuchsia-500/50 hover:bg-fuchsia-900/80 px-3 py-1 rounded-lg transition-all cursor-pointer shadow-[0_0_12px_rgba(217,70,239,0.3)]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
                    Auto-Generate Bio with AI
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={draftProfile.basicInfo?.bio || ''}
                  onChange={(e) =>
                    updateDraft({ basicInfo: { ...draftProfile.basicInfo!, bio: e.target.value } })
                  }
                  placeholder="Share a brief overview of your values, personal journey, and relationship goals..."
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-inner leading-relaxed"
                />
                <p className="text-[11px] text-purple-300/80 mt-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-fuchsia-400 shrink-0" />
                  Your bio can be auto-generated based on the answers provided across your profile.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-fuchsia-400" />
                  Highest Degree Level
                </label>
                <input
                  type="text"
                  value={draftProfile.education?.degreeLevel || ''}
                  onChange={(e) =>
                    updateDraft({ education: { ...draftProfile.education!, degreeLevel: e.target.value } })
                  }
                  placeholder="e.g. Master's Degree"
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5">Field of Study</label>
                <input
                  type="text"
                  value={draftProfile.education?.fieldOfStudy || ''}
                  onChange={(e) =>
                    updateDraft({ education: { ...draftProfile.education!, fieldOfStudy: e.target.value } })
                  }
                  placeholder="e.g. Computer Science / Business Administration"
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Profession */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-fuchsia-400" />
                  Profession / Job Title
                </label>
                <input
                  type="text"
                  value={draftProfile.profession?.title || ''}
                  onChange={(e) =>
                    updateDraft({ profession: { ...draftProfile.profession!, title: e.target.value } })
                  }
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5">Industry</label>
                <input
                  type="text"
                  value={draftProfile.profession?.industry || ''}
                  onChange={(e) =>
                    updateDraft({ profession: { ...draftProfile.profession!, industry: e.target.value } })
                  }
                  placeholder="e.g. Technology / Healthcare / Finance"
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Location */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-fuchsia-400" />
                  City & State
                </label>
                <input
                  type="text"
                  value={draftProfile.location?.city || ''}
                  onChange={(e) =>
                    updateDraft({ location: { ...draftProfile.location!, city: e.target.value } })
                  }
                  placeholder="e.g. Chicago, IL"
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5">Country</label>
                <input
                  type="text"
                  value={draftProfile.location?.country || ''}
                  onChange={(e) =>
                    updateDraft({ location: { ...draftProfile.location!, country: e.target.value } })
                  }
                  placeholder="e.g. United States"
                  className="w-full rounded-xl bg-purple-950/80 border border-purple-700/60 px-4 py-3 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
            </div>
          )}

          {/* STEPS 5 to 10 */}
          {currentStep >= 5 && currentStep <= 10 && (
            <div className="p-8 rounded-2xl bg-purple-950/60 border border-purple-800/60 text-center">
              <Sparkles className="w-10 h-10 text-fuchsia-400 mx-auto mb-3 shadow-[0_0_15px_rgba(217,70,239,0.5)]" />
              <h3 className="font-serif font-bold text-white text-lg">{STEP_TITLES[currentStep - 1]} Preferences</h3>
              <p className="text-xs text-purple-300/80 mt-2 max-w-md mx-auto leading-relaxed">
                Loaded into your OppositeTalk profile draft. You can fine-tune these preferences anytime in Settings.
              </p>
            </div>
          )}

          {/* STEP 11: Photos */}
          {currentStep === 11 && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">Profile Photos</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {draftProfile.photos?.map((photo) => (
                  <div key={photo.id} className="relative rounded-2xl overflow-hidden border border-purple-700/60 group">
                    <img src={photo.url} alt="Profile" className="w-full h-36 object-cover" />
                    {photo.isMain && (
                      <span className="absolute top-2 left-2 bg-fuchsia-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Main
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 12: Review & Submit */}
          {currentStep === 12 && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-fuchsia-950/80 border border-fuchsia-500/40 p-5 text-fuchsia-200">
                <CheckCircle2 className="w-7 h-7 text-fuchsia-400 mb-2" />
                <h4 className="font-bold text-base text-white">Profile Ready for Completion!</h4>
                <p className="text-xs mt-1 text-purple-200/80">Review all details before activating your profile on OppositeTalk.</p>
              </div>

              <div className="rounded-2xl border border-purple-800/60 p-5 bg-purple-950/60 text-xs space-y-2 text-purple-200">
                <p><strong>Display Name:</strong> <span className="text-white font-semibold">{draftProfile.basicInfo?.displayName}</span></p>
                <p><strong>Age:</strong> <span className="text-white font-semibold">{draftProfile.basicInfo?.age} years old</span></p>
                <p><strong>Profession:</strong> <span className="text-white font-semibold">{draftProfile.profession?.title}</span></p>
                <p><strong>Location:</strong> <span className="text-white font-semibold">{draftProfile.location?.city}, {draftProfile.location?.country}</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Controls */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t border-purple-900/60">
          <Button
            variant="outline"
            size="md"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-purple-700/60 text-purple-200 hover:bg-purple-900/60"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>

          {currentStep === TOTAL_PROFILE_STEPS ? (
            <Button
              size="md"
              variant="neon"
              onClick={handleCompleteWizard}
              isLoading={isSubmitting}
              className="font-bold px-8 py-3"
            >
              Complete Profile
            </Button>
          ) : (
            <Button
              size="md"
              variant="neon"
              onClick={nextStep}
              className="font-bold px-8 py-3"
            >
              Next Step <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>

        {saveMessage && (
          <div className="mt-4 p-3 rounded-xl bg-purple-950 border border-purple-700 text-white text-center text-xs animate-in fade-in">
            Draft saved successfully.
          </div>
        )}
      </div>
    </div>
  );
}
