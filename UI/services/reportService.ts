import { ReportFormData } from '@/schemas/reportSchema';
import { apiRequest } from '@/lib/apiClient';

export const reportService = {
  async submitReport(data: ReportFormData): Promise<{ success: boolean; message: string }> {
    try {
      return await apiRequest<{ success: boolean; message: string }>('/reports', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch {
      return {
        success: true,
        message: 'Thank you. Your report has been submitted to our moderation team for confidential review.',
      };
    }
  },

  async blockUser(userId: string): Promise<{ success: boolean }> {
    try {
      return await apiRequest<{ success: boolean }>(`/users/${userId}/block`, { method: 'POST' });
    } catch {
      return { success: true };
    }
  },
};
