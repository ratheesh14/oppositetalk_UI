import { User } from './user';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  avatarUrl?: string;
  content: string;
  imageUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isVerified: boolean;
    onlineStatus: 'online' | 'offline' | 'away';
  };
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface TypingNotification {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}
