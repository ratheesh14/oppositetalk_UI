'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('oppositetalk_token');
      const storedUser = localStorage.getItem('oppositetalk_user');

      if (storedToken && storedUser) {
        setAuth(JSON.parse(storedUser), storedToken);
      } else {
        // Hydrate mock default user for quick demo accessibility
        const defaultDemoUser = {
          id: 'user_123',
          email: 'alex.m@example.com',
          firstName: 'Alex',
          lastName: 'Morgan',
          role: 'User' as const,
          isEligible: true,
          isProfileComplete: true,
          verificationStatus: 'Verified' as const,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          createdAt: new Date().toISOString(),
        };
        setAuth(defaultDemoUser, 'mock_demo_jwt_token');
      }
    } catch {
      logout();
    }
  }, [setAuth, logout]);

  return <>{children}</>;
}
