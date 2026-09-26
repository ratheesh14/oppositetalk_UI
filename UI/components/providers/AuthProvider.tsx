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
        logout();
      }
    } catch {
      logout();
    }
  }, [setAuth, logout]);

  return <>{children}</>;
}
