import { Post } from '@/types/feed';
import { apiRequest } from '@/lib/apiClient';

export const postService = {
  async getFeedPosts(): Promise<Post[]> {
    try {
      return await apiRequest<Post[]>('/posts/feed');
    } catch {
      return [
        {
          id: 'post_1',
          authorId: 'user_1',
          authorName: 'Elena Vance',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          authorVerified: true,
          communityName: 'Marriage & Family',
          content: 'Aligning on financial goals and home budgeting before marriage is one of the strongest predictors of long-term partnership stability. What are your core non-negotiables when discussing shared finances?',
          likesCount: 24,
          commentsCount: 8,
          isLiked: false,
          isSaved: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        },
        {
          id: 'post_2',
          authorId: 'user_2',
          authorName: 'Marcus Brody',
          authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          authorVerified: true,
          communityName: 'Personal Finance',
          content: 'Working towards buying our first family home. Staying disciplined with a structured budget is key.',
          likesCount: 42,
          commentsCount: 14,
          isLiked: true,
          isSaved: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
        },
      ];
    }
  },

  async createPost(content: string, communityId?: string, imageUrl?: string): Promise<Post> {
    try {
      return await apiRequest<Post>('/posts', {
        method: 'POST',
        body: JSON.stringify({ content, communityId, imageUrl }),
      });
    } catch {
      return {
        id: `post_${Date.now()}`,
        authorId: 'user_123',
        authorName: 'Alex Morgan',
        authorVerified: true,
        content,
        imageUrl,
        likesCount: 0,
        commentsCount: 0,
        isLiked: false,
        isSaved: false,
        createdAt: new Date().toISOString(),
      };
    }
  },

  async toggleLikePost(postId: string): Promise<{ isLiked: boolean; likesCount: number }> {
    try {
      return await apiRequest<{ isLiked: boolean; likesCount: number }>(`/posts/${postId}/like`, { method: 'POST' });
    } catch {
      return { isLiked: true, likesCount: 25 };
    }
  },
};
