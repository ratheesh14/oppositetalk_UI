import { UserProfile } from './profile';

export interface DiscoverFilters {
  minAge: number;
  maxAge: number;
  location?: string;
  profession?: string;
  education?: string;
  relationshipGoals?: string;
  childrenPreference?: string;
  travelFrequency?: string;
  lifestyle?: string;
  interests?: string[];
}

export interface CompatibilityBreakdown {
  scorePercentage?: number;
  sharedValues: string[];
  disclaimer: string;
}

export interface MatchProfile {
  profile: UserProfile;
  compatibility: CompatibilityBreakdown;
  hasLiked: boolean;
  isMutualMatch: boolean;
}

export interface LikeResponse {
  isMutual: boolean;
  matchId?: string;
  matchedProfile?: UserProfile;
  sharedAreas?: string[];
}
