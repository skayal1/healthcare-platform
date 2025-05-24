import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { signIn, signUp, signOut } from '../lib/supabase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  
  setUser: (user) => set({ user, loading: false }),
  
  signUp: async (email, password, userData) => {
    try {
      const { user } = await signUp(email, password, userData);
      set({ user });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An error occurred during sign up');
    }
  },
  
  signIn: async (email, password) => {
    try {
      const { user } = await signIn(email, password);
      set({ user });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An error occurred during sign in');
    }
  },
  
  signOut: async () => {
    try {
      await signOut();
      set({ user: null });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An error occurred during sign out');
    }
  },
}));

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setUser(session?.user ?? null);
});