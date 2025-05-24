import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

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
      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      // Then create the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: userData.full_name,
          role: userData.role,
        });

      if (profileError) {
        // If profile creation fails, we should clean up the auth user
        await supabase.auth.signOut();
        throw profileError;
      }

      set({ user: authData.user });
      
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An error occurred during sign up');
    }
  },
  
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      if (data.user) set({ user: data.user });
      
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An error occurred during sign in');
    }
  },
  
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
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