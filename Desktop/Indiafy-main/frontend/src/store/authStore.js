import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { id, role, name, email }
      token: null,
      isAuthenticated: false,

      login: (userData, token) => set({ 
        user: userData, 
        token: token, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'indiafy-auth-storage',
    }
  )
);
