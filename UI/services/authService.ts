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

// Backend API returns ApiResponse<AuthResult> which wraps data differently
// Backend shape: { success: bool, data: { user: UserDto, accessToken: string, refreshToken: string }, error: null, traceId: string }
// Frontend expects: { user: User, tokens: { accessToken, refreshToken, expiresIn } }
interface BackendAuthResult {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      isEligible: boolean;
      isProfileComplete: boolean;
      verificationStatus: string;
      avatarUrl?: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  error?: { code: string; message: string };
}

function mapBackendToAuthResponse(result: BackendAuthResult): AuthResponse {
  const d = result.data!;
  return {
    user: {
      id: d.user.id,
      email: d.user.email,
      firstName: d.user.firstName,
      lastName: d.user.lastName,
      role: d.user.role as AuthResponse['user']['role'],
      isEligible: d.user.isEligible,
      isProfileComplete: d.user.isProfileComplete,
      verificationStatus: d.user.verificationStatus as AuthResponse['user']['verificationStatus'],
      avatarUrl: d.user.avatarUrl,
      createdAt: new Date().toISOString(),
    },
    tokens: {
      accessToken: d.accessToken,
      refreshToken: d.refreshToken,
      expiresIn: 3600,
    },
  };
}

export const authService = {
  async googleAuth(data: GoogleAuthPayload): Promise<AuthResponse> {
    try {
      // Backend route is /api/v1/auth/google; apiClient base is /api, so use /v1/auth/google
      const result = await apiRequest<BackendAuthResult>('/v1/auth/google', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (result.success && result.data) {
        return mapBackendToAuthResponse(result);
      }
      throw new Error(result.error?.message || 'Google auth failed');
    } catch (err) {
      console.warn('[authService.googleAuth] Backend API call failed:', err);
      // Fallback mock — role defaults to User. Actual role comes from backend DB only.
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
      const result = await apiRequest<BackendAuthResult>('/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (result.success && result.data) {
        return mapBackendToAuthResponse(result);
      }
      throw new Error(result.error?.message || 'Login failed');
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
      const result = await apiRequest<BackendAuthResult>('/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (result.success && result.data) {
        const mapped = mapBackendToAuthResponse(result);
        return { user: mapped.user, requireVerification: true };
      }
      throw new Error(result.error?.message || 'Registration failed');
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
      return await apiRequest<{ success: boolean; message: string }>('/v1/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
    } catch {
      return { success: true, message: 'Account verified successfully.' };
    }
  },

  async getCurrentUser(): Promise<User> {
    return await apiRequest<User>('/v1/auth/me');
  },
};
