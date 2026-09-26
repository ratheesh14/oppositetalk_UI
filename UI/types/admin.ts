import { User } from './user';

export interface AdminDashboardStats {
  totalUsers: number;
  eligibleUsersCount: number;
  pendingVerifications: number;
  activeReports: number;
  totalMatches: number;
  totalCommunities: number;
  systemHealth: 'Healthy' | 'Degraded' | 'Critical';
}

export interface ModerationReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  contentType: 'Profile' | 'Message' | 'Post' | 'Comment' | 'Community';
  contentId: string;
  reason: string;
  details?: string;
  status: 'Pending' | 'UnderReview' | 'Resolved' | 'Dismissed';
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  documentType: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
}

export interface EligibilityRuleConfig {
  id: string;
  ruleName: string;
  section: string;
  isMandatory: boolean;
  actionOnFail: 'Disqualify' | 'FlagForReview';
  isActive: boolean;
  version: string;
}
