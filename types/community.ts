import { Post } from './feed';

export interface CommunityMember {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  role: 'Member' | 'Moderator' | 'Admin';
  joinedAt: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'Marriage' | 'Family Life' | 'Parenting' | 'Career' | 'Finance' | 'Fitness' | 'Travel' | 'Relationships' | 'Local';
  icon: string;
  memberCount: number;
  isJoined: boolean;
  rules: string[];
  bannerUrl?: string;
  posts?: Post[];
  members?: CommunityMember[];
}
