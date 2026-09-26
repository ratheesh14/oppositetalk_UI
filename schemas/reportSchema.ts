import { z } from 'zod';

export const reportSchema = z.object({
  contentType: z.enum(['Profile', 'Message', 'Post', 'Comment', 'Community']),
  targetId: z.string().min(1, 'Target ID is required'),
  reason: z.string().min(1, 'Please select a reason'),
  details: z.string().max(500, 'Details cannot exceed 500 characters').optional(),
});

export type ReportFormData = z.infer<typeof reportSchema>;
