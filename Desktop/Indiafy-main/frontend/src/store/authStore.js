import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { id, role, name, email, etc. }
      token: null,
      isAuthenticated: false,

      login: (userData, token) => set({
        user: {
          ...userData,
          // Normalize role to lowercase for routing
          role: userData?.role?.toLowerCase() || 'customer'
        },
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
