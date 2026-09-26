import { Community } from '@/types/community';
import { apiRequest } from '@/lib/apiClient';

const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'comm_1',
    name: 'Marriage & Long-term Commitment',
    slug: 'marriage',
    description: 'A community for individuals focused on building strong, enduring marriages and lifelong partnerships.',
    category: 'Marriage',
    icon: 'HeartHandshake',
    memberCount: 1420,
    isJoined: true,
    rules: [
      'Maintain respectful, constructive dialogue.',
      'Focus on long-term family principles and shared accountability.',
      'No harassment or derogatory political attacks.',
    ],
  },
  {
    id: 'comm_2',
    name: 'Family Life & Parenting',
    slug: 'family-life',
    description: 'Discussing family values, household leadership, and nurturing future generations.',
    category: 'Family Life',
    icon: 'Home',
    memberCount: 980,
    isJoined: false,
    rules: ['Respect diverse family backgrounds.', 'Focus on practical advice and encouragement.'],
  },
  {
    id: 'comm_3',
    name: 'Career & Financial Responsibility',
    slug: 'finance',
    description: 'Strategies for career growth, wealth building, home ownership, and family financial security.',
    category: 'Finance',
    icon: 'TrendingUp',
    memberCount: 2150,
    isJoined: true,
    rules: ['Share actionable insights.', 'No self-promotion or financial spam.'],
  },
];

export const communityService = {
  async getCommunities(): Promise<Community[]> {
    try {
      return await apiRequest<Community[]>('/communities');
    } catch {
      return MOCK_COMMUNITIES;
    }
  },

  async getCommunityById(id: string): Promise<Community> {
    try {
      return await apiRequest<Community>(`/communities/${id}`);
    } catch {
      return MOCK_COMMUNITIES.find((c) => c.id === id || c.slug === id) || MOCK_COMMUNITIES[0];
    }
  },

  async toggleJoinCommunity(id: string): Promise<{ isJoined: boolean; memberCount: number }> {
    try {
      return await apiRequest<{ isJoined: boolean; memberCount: number }>(`/communities/${id}/join`, { method: 'POST' });
    } catch {
      const comm = MOCK_COMMUNITIES.find((c) => c.id === id);
      const isJoined = !comm?.isJoined;
      const memberCount = (comm?.memberCount || 100) + (isJoined ? 1 : -1);
      return { isJoined, memberCount };
    }
  },
};
