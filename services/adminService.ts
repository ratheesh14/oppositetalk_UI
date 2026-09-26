import { AdminDashboardStats, EligibilityRuleConfig, ModerationReport, VerificationRequest } from '@/types/admin';
import { apiRequest } from '@/lib/apiClient';

export const adminService = {
  async getDashboardStats(): Promise<AdminDashboardStats> {
    try {
      return await apiRequest<AdminDashboardStats>('/admin/stats');
    } catch {
      return {
        totalUsers: 14850,
        eligibleUsersCount: 11240,
        pendingVerifications: 42,
        activeReports: 7,
        totalMatches: 3890,
        totalCommunities: 14,
        systemHealth: 'Healthy',
      };
    }
  },

  async getReports(): Promise<ModerationReport[]> {
    try {
      return await apiRequest<ModerationReport[]>('/admin/reports');
    } catch {
      return [
        {
          id: 'rep_1',
          reporterId: 'u_10',
          reporterName: 'David K.',
          reportedUserId: 'u_88',
          reportedUserName: 'James W.',
          contentType: 'Message',
          contentId: 'msg_99',
          reason: 'Inappropriate language',
          details: 'User sent aggressive text contrary to community guidelines.',
          status: 'Pending',
          createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        },
      ];
    }
  },

  async getEligibilityRules(): Promise<EligibilityRuleConfig[]> {
    try {
      return await apiRequest<EligibilityRuleConfig[]>('/admin/eligibility-rules');
    } catch {
      return [
        {
          id: 'rule_1',
          ruleName: 'Mandatory Age Threshold (18+)',
          section: 'Basic eligibility',
          isMandatory: true,
          actionOnFail: 'Disqualify',
          isActive: true,
          version: '2.4',
        },
        {
          id: 'rule_2',
          ruleName: 'Serious Intentions Mandate',
          section: 'Relationship intentions',
          isMandatory: true,
          actionOnFail: 'Disqualify',
          isActive: true,
          version: '2.4',
        },
      ];
    }
  },

  async getVerifications(): Promise<VerificationRequest[]> {
    try {
      return await apiRequest<VerificationRequest[]>('/admin/verifications');
    } catch {
      return [
        {
          id: 'ver_1',
          userId: 'user_1',
          userName: 'Elena Vance',
          documentType: 'Government ID + Selfie',
          submittedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
          status: 'Pending',
        },
      ];
    }
  },
};
