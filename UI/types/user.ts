export type UserRole = 'User' | 'Admin' | 'Moderator' | 'SuperAdmin';

export type UserVerificationStatus = 'Unverified' | 'Pending' | 'Verified' | 'Rejected';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  gender?: string;
  role: UserRole;
  isEligible: boolean;
  isProfileComplete: boolean;
  verificationStatus: UserVerificationStatus;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
