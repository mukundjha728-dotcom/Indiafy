import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../utils/axiosInstance';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { id, role, name, email, etc. }
      token: null,
      isAuthenticated: false,
      isBackendAvailable: true,

      login: (userData, token) => set({
        user: {
          ...userData,
          role: userData?.role?.toLowerCase() || 'customer'
        },
        token: token,
        isAuthenticated: true,
        isBackendAvailable: true
      }),

      logout: async () => {
        try {
          await axiosInstance.post('/customer/auth/logout');
        } catch (err) {
          console.error("Customer logout failed on backend:", err);
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      fetchMe: async (role, retries = 2) => {
        try {
          const res = await axiosInstance.get(`/${role.toLowerCase()}/auth/me`);
          // res = { statusCode, data: userData, message }
          const userData = res.data || res;
          set({
            user: {
              ...userData,
              role: userData?.role?.toLowerCase() || role.toLowerCase()
            },
            isAuthenticated: true,
            isBackendAvailable: true
          });
        } catch (err) {
          if (err.code === "ERR_NETWORK") {
            if (retries > 0) {
              console.log(`Retrying fetchMe... (${retries} attempts left)`);
              await new Promise(resolve => setTimeout(resolve, 1000));
              return get().fetchMe(role, retries - 1);
            }
            set({ user: null, isAuthenticated: false, isBackendAvailable: false });
            return;
          }
          
          if (err.response?.status === 401 || err.response?.status === 429) {
            set({ user: null, isAuthenticated: false, isBackendAvailable: true });
            return;
          }

          throw err;
        }
      }
    }),
    {
      name: 'indiafy-auth-storage',
    }
  )
);
