import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (search = '', subCategory = '') => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('/products', {
        params: { search, subCategory }
      });
      set({ products: res.data?.data || [] });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch products' });
    } finally {
      set({ isLoading: false });
    }
  },

  getProductById: async (id) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data?.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}));
