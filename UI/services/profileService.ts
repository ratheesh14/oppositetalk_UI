import { UserProfile } from '@/types/profile';
import { apiRequest } from '@/lib/apiClient';

const MOCK_PROFILES: UserProfile[] = [
  {
    id: 'prof_1',
    userId: 'user_1',
    isVerified: true,
    verificationBadge: 'ID & Income Verified',
    completionPercentage: 100,
    basicInfo: {
      displayName: 'Elena Vance',
      age: 28,
      gender: 'Female',
      location: 'New York, NY',
      bio: 'Architect passionate about sustainable urban housing, family traditions, weekend hiking, and meaningful conversations.',
    },
    education: {
      degreeLevel: "Master's Degree",
      fieldOfStudy: 'Architecture',
      institution: 'Columbia University',
    },
    profession: {
      title: 'Senior Project Architect',
      industry: 'Design & Construction',
      workStyle: 'In-office',
    },
    location: {
      city: 'New York',
      country: 'United States',
      openToRelocation: true,
    },
    lifestyle: {
      smokingPreference: 'Non-smoker',
      drinkingPreference: 'Socially',
      dietaryPreference: 'Mediterranean',
      fitnessRoutine: '4 times a week',
    },
    relationshipGoals: {
      timelineToMarriage: '1-2 years',
      relationshipType: 'Marriage & Family focused',
      primaryValues: ['Integrity', 'Family', 'Personal Growth', 'Financial Responsibility'],
    },
    familyGoals: {
      wantsChildren: 'Definitely want children',
      currentChildrenCount: 0,
      familyValuesDescription: 'Building a loving, grounded family environment with high educational standards and shared cultural appreciation.',
    },
    financialPreferences: {
      financialStyle: 'Disciplined Saver & Investor',
      budgetingApproach: 'Goal-oriented',
      homeOwnershipGoal: 'Currently owns home',
    },
    travelPreferences: {
      frequency: '3-4 times a year',
      style: 'Cultural & Historic exploration',
      favoriteDestinations: ['Italy', 'Japan', 'Switzerland'],
    },
    interests: {
      hobbies: ['Architecture', 'Classical Music', 'Tennis', 'Cooking', 'Gardening'],
      favoriteTopics: ['Urban Planning', 'History', 'Philosophy', 'Interior Design'],
    },
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', isMain: true },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', isMain: false },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prof_2',
    userId: 'user_2',
    isVerified: true,
    verificationBadge: 'Verified Member',
    completionPercentage: 95,
    basicInfo: {
      displayName: 'Marcus Brody',
      age: 32,
      gender: 'Male',
      location: 'Boston, MA',
      bio: 'Financial analyst looking for a grounded partner to share life, build a home, and start a family with mutual dedication.',
    },
    education: {
      degreeLevel: "Bachelor's Degree",
      fieldOfStudy: 'Finance & Economics',
      institution: 'Boston College',
    },
    profession: {
      title: 'Portfolio Manager',
      industry: 'Financial Services',
      workStyle: 'Hybrid',
    },
    location: {
      city: 'Boston',
      country: 'United States',
      openToRelocation: false,
    },
    lifestyle: {
      smokingPreference: 'Non-smoker',
      drinkingPreference: 'Rarely',
      dietaryPreference: 'Whole foods',
      fitnessRoutine: 'Daily workouts',
    },
    relationshipGoals: {
      timelineToMarriage: 'Within 2 years',
      relationshipType: 'Long-term / Marriage',
      primaryValues: ['Financial Responsibility', 'Family Security', 'Honesty'],
    },
    familyGoals: {
      wantsChildren: 'Wants 2-3 children',
      currentChildrenCount: 0,
      familyValuesDescription: 'Focus on raising well-rounded, responsible, and caring children in a stable environment.',
    },
    financialPreferences: {
      financialStyle: 'Proactive Investor',
      budgetingApproach: 'Structured',
      homeOwnershipGoal: 'Owns home',
    },
    travelPreferences: {
      frequency: '1-2 times a year',
      style: 'Road trips & Nature',
      favoriteDestinations: ['Maine', 'Canada', 'Scotland'],
    },
    interests: {
      hobbies: ['Golf', 'Stock Market', 'Reading', 'Woodworking'],
      favoriteTopics: ['Macroeconomics', 'Biographies', 'Fitness'],
    },
    photos: [
      { id: 'p3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', isMain: true },
    ],
    updatedAt: new Date().toISOString(),
  },
];

export const profileService = {
  async getProfileById(id: string): Promise<UserProfile> {
    try {
      return await apiRequest<UserProfile>(`/profiles/${id}`);
    } catch {
      return MOCK_PROFILES.find((p) => p.id === id || p.userId === id) || MOCK_PROFILES[0];
    }
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    try {
      return await apiRequest<UserProfile>('/profiles/me', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch {
      return { ...MOCK_PROFILES[0], ...data, updatedAt: new Date().toISOString() };
    }
  },

  async getDiscoverProfiles(): Promise<UserProfile[]> {
    try {
      return await apiRequest<UserProfile[]>('/discover');
    } catch {
      return MOCK_PROFILES;
    }
  },
};
