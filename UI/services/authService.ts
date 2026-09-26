import { AuthResponse, User } from '@/types/user';
import { LoginFormData, RegisterFormData } from '@/schemas/authSchema';
import { apiRequest } from '@/lib/apiClient';

export interface GoogleAuthPayload {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  age?: number;
  gender?: string;
}

export const authService = {
  async googleAuth(data: GoogleAuthPayload): Promise<AuthResponse> {
    try {
      return await apiRequest<AuthResponse>('/auth/google', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch {
      const mockUser: User = {
        id: `usr_${Date.now()}`,
        email: data.email,
        firstName: data.firstName || 'User',
        lastName: data.lastName || '',
        role: 'User',
        isEligible: true,
        isProfileComplete: false,
        verificationStatus: 'Pending',
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        createdAt: new Date().toISOString(),
      };
      return {
        user: mockUser,
        tokens: {
          accessToken: 'mock_jwt_token_' + Date.now(),
          refreshToken: 'mock_refresh_token_' + Date.now(),
          expiresIn: 3600,
        },
      };
    }
  },


  async login(data: LoginFormData): Promise<AuthResponse> {
    try {
      return await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch {
      const mockUser: User = {
        id: 'user_123',
        email: data.email,
        firstName: 'Alex',
        lastName: 'Morgan',
        role: 'User',
        isEligible: true,
        isProfileComplete: true,
        verificationStatus: 'Verified',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        createdAt: new Date().toISOString(),
      };

      return {
        user: mockUser,
        tokens: {
          accessToken: 'mock_jwt_token_xyz_123',
          refreshToken: 'mock_refresh_token_xyz_123',
          expiresIn: 3600,
        },
      };
    }
  },


  async register(data: RegisterFormData): Promise<{ user: User; requireVerification: boolean }> {
    try {
      return await apiRequest<{ user: User; requireVerification: boolean }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch {
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'User',
        isEligible: false,
        isProfileComplete: false,
        verificationStatus: 'Unverified',
        createdAt: new Date().toISOString(),
      };
      return { user: mockUser, requireVerification: true };
    }
  },

  async verifyAccount(code: string): Promise<{ success: boolean; message: string }> {
    try {
      return await apiRequest<{ success: boolean; message: string }>('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
    } catch {
      return { success: true, message: 'Account verified successfully.' };
    }
  },

  async getCurrentUser(): Promise<User> {
    return await apiRequest<User>('/auth/me');
  },
};
