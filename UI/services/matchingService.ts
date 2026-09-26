import { LikeResponse, MatchProfile } from '@/types/matching';
import { apiRequest } from '@/lib/apiClient';

export const matchingService = {
  async likeProfile(profileId: string): Promise<LikeResponse> {
    try {
      return await apiRequest<LikeResponse>(`/matches/like/${profileId}`, {
        method: 'POST',
      });
    } catch {
      // Mock mutual match response for demonstration
      return {
        isMutual: true,
        matchId: `match_${Date.now()}`,
        sharedAreas: [
          'Both looking for marriage',
          'Both want children',
          'Both value financial responsibility',
          'Both enjoy traveling and outdoor activities',
        ],
      };
    }
  },

  async getMatches(): Promise<MatchProfile[]> {
    try {
      return await apiRequest<MatchProfile[]>('/matches');
    } catch {
      return [
        {
          profile: {
            id: 'prof_1',
            userId: 'user_1',
            isVerified: true,
            verificationBadge: 'Verified Member',
            completionPercentage: 100,
            basicInfo: {
              displayName: 'Elena Vance',
              age: 28,
              gender: 'Female',
              location: 'New York, NY',
              bio: 'Architect passionate about sustainable urban housing, family traditions, and hiking.',
            },
            education: { degreeLevel: "Master's Degree", fieldOfStudy: 'Architecture' },
            profession: { title: 'Senior Project Architect', industry: 'Design', workStyle: 'In-office' },
            location: { city: 'New York', country: 'USA', openToRelocation: true },
            lifestyle: { smokingPreference: 'Non-smoker', drinkingPreference: 'Socially', dietaryPreference: 'Balanced', fitnessRoutine: 'Regular' },
            relationshipGoals: { timelineToMarriage: '1-2 years', relationshipType: 'Marriage focused', primaryValues: ['Family', 'Growth'] },
            familyGoals: { wantsChildren: 'Yes', currentChildrenCount: 0, familyValuesDescription: 'Warm family environment' },
            financialPreferences: { financialStyle: 'Saver', budgetingApproach: 'Structured', homeOwnershipGoal: 'Plan to buy' },
            travelPreferences: { frequency: 'Frequent', style: 'Cultural', favoriteDestinations: ['Italy'] },
            interests: { hobbies: ['Architecture', 'Tennis'], favoriteTopics: ['Design'] },
            photos: [{ id: 'p1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', isMain: true }],
            updatedAt: new Date().toISOString(),
          },
          compatibility: {
            scorePercentage: 94,
            sharedValues: ['Marriage Intentions', 'Family Building', 'Financial Responsibility', 'Health & Fitness'],
            disclaimer: 'Algorithmic estimate based on stated preferences.',
          },
          hasLiked: true,
          isMutualMatch: true,
        },
      ];
    }
  },
};
