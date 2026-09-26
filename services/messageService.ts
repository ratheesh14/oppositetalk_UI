import { Conversation, Message } from '@/types/message';
import { apiRequest } from '@/lib/apiClient';

export const messageService = {
  async getConversations(): Promise<Conversation[]> {
    try {
      return await apiRequest<Conversation[]>('/messages/conversations');
    } catch {
      return [
        {
          id: 'conv_1',
          participant: {
            id: 'user_1',
            displayName: 'Elena Vance',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            isVerified: true,
            onlineStatus: 'online',
          },
          lastMessage: {
            id: 'm_1',
            conversationId: 'conv_1',
            senderId: 'user_1',
            senderName: 'Elena Vance',
            content: 'I really appreciated your thoughts on financial planning and family values.',
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          },
          unreadCount: 1,
          updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
      ];
    }
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    try {
      return await apiRequest<Message[]>(`/messages/${conversationId}`);
    } catch {
      return [
        {
          id: 'm_0',
          conversationId,
          senderId: 'user_123',
          senderName: 'You',
          content: 'Hello Elena! It is great to connect with someone who shares similar long-term family goals.',
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        },
        {
          id: 'm_1',
          conversationId,
          senderId: 'user_1',
          senderName: 'Elena Vance',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          content: 'I really appreciated your thoughts on financial planning and family values.',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
      ];
    }
  },

  async sendMessage(conversationId: string, content: string, imageUrl?: string): Promise<Message> {
    try {
      return await apiRequest<Message>(`/messages/${conversationId}`, {
        method: 'POST',
        body: JSON.stringify({ content, imageUrl }),
      });
    } catch {
      return {
        id: `m_${Date.now()}`,
        conversationId,
        senderId: 'user_123',
        senderName: 'You',
        content,
        imageUrl,
        isRead: true,
        createdAt: new Date().toISOString(),
      };
    }
  },
};
