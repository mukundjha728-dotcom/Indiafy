import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

export const useProfileStore = create((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('/customer/profile');
      set({ profile: res.data.data });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch profile' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (profileData) => {
    try {
      const res = await axiosInstance.put('/customer/profile', profileData);
      set({ profile: { ...res.data.data, email: res.data.data.email } }); 
      // Re-fetch to ensure all populated fields (like email) are intact
      const freshRes = await axiosInstance.get('/customer/profile');
      set({ profile: freshRes.data.data });
    } catch (err) {
      throw err;
    }
  },

  addAddress: async (addressData) => {
    try {
      const res = await axiosInstance.post('/customer/profile/addresses', addressData);
      set((state) => ({
        profile: { ...state.profile, address: res.data.data }
      }));
    } catch (err) {
      throw err;
    }
  },

  deleteAddress: async (addressId) => {
    try {
      const res = await axiosInstance.delete(`/customer/profile/addresses/${addressId}`);
      set((state) => ({
        profile: { ...state.profile, address: res.data.data }
      }));
    } catch (err) {
      throw err;
    }
  }
}));
