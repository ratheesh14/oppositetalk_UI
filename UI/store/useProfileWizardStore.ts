import { create } from 'zustand';
import { UserProfile } from '@/types/profile';

interface ProfileWizardState {
  currentStep: number;
  draftProfile: Partial<UserProfile>;
  isSaved: boolean;
  setStep: (step: number) => void;
  updateDraft: (data: Partial<UserProfile>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const TOTAL_PROFILE_STEPS = 12;

export const useProfileWizardStore = create<ProfileWizardState>((set) => ({
  currentStep: 1,
  draftProfile: {
    basicInfo: {
      displayName: '',
      age: 28,
      gender: 'Male',
      location: 'Chicago, IL',
      bio: '',
    },
    education: {
      degreeLevel: "Master's Degree",
      fieldOfStudy: 'Computer Science',
      institution: 'Northwestern University',
    },
    profession: {
      title: 'Senior Software Engineer',
      industry: 'Technology',
      workStyle: 'Hybrid',
    },
    location: {
      city: 'Chicago',
      country: 'United States',
      openToRelocation: true,
    },
    lifestyle: {
      smokingPreference: 'Non-smoker',
      drinkingPreference: 'Socially',
      dietaryPreference: 'Balanced',
      fitnessRoutine: '3-4 times a week',
    },
    relationshipGoals: {
      timelineToMarriage: '1-2 years',
      relationshipType: 'Long-term / Marriage focused',
      primaryValues: ['Integrity', 'Family', 'Financial Responsibility', 'Growth'],
    },
    familyGoals: {
      wantsChildren: 'Definitely want children',
      currentChildrenCount: 0,
      familyValuesDescription: 'Building a stable, warm home environment centered on love, honesty, and shared accountability.',
    },
    financialPreferences: {
      financialStyle: 'Saver & Investor',
      budgetingApproach: 'Structured & Goal-oriented',
      homeOwnershipGoal: 'Plan to buy in 2 years',
    },
    travelPreferences: {
      frequency: '2-3 times per year',
      style: 'Cultural & Nature exploration',
      favoriteDestinations: ['Japan', 'National Parks', 'Italy'],
    },
    interests: {
      hobbies: ['Reading', 'Hiking', 'Cooking', 'Personal Finance', 'Baking'],
      favoriteTopics: ['Technology', 'Philosophy', 'Architecture', 'Health'],
    },
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', isMain: true },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', isMain: false },
    ],
  },
  isSaved: true,
  setStep: (step) => set({ currentStep: step }),
  updateDraft: (data) =>
    set((state) => ({
      draftProfile: { ...state.draftProfile, ...data },
      isSaved: false,
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, TOTAL_PROFILE_STEPS),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
}));
