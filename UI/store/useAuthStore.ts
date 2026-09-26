import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  updateUser: (partialUser: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('oppositetalk_token', token);
      localStorage.setItem('oppositetalk_user', JSON.stringify(user));
    }
    set({ user, token, isAuthenticated: true, isLoading: false });
  },
  updateUser: (partialUser) =>
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...partialUser };
      if (typeof window !== 'undefined') {
        localStorage.setItem('oppositetalk_user', JSON.stringify(updatedUser));
      }
      return { user: updatedUser };
    }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oppositetalk_token');
      localStorage.removeItem('oppositetalk_user');
      localStorage.removeItem('last_google_auth_email');
      localStorage.removeItem('sb-uqddffqzhbbzmnaikayl-auth-token');
    }
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
}));
