import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

export const useOrderStore = create((set) => ({
  orders: [],
  sellerOrders: [],
  isLoading: false,
  error: null,

  createOrder: async (orderPayload) => {
    try {
      const res = await axiosInstance.post('/orders', orderPayload);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  fetchMyOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('/orders/myorders');
      set({ orders: res.data?.data || [] });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch orders' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSellerOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('/orders/sellerorders');
      set({ sellerOrders: res.data?.data || [] });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch seller orders' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      await axiosInstance.put(`/orders/${orderId}/status`, { status });
      // update state locally
      set((state) => ({
        sellerOrders: state.sellerOrders.map((o) =>
          o._id === orderId ? { ...o, status } : o
        ),
      }));
    } catch (err) {
      throw err;
    }
  }
}));
