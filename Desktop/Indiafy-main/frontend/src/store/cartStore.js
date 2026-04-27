import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

export const useCartStore = create((set, get) => ({
  cartItems: [],
  totalPrice: 0,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/customer/cart');
      if (res.data?.data) {
        set({
          cartItems: res.data.data.items || [],
          totalPrice: res.data.data.totalPrice || 0
        });
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await axiosInstance.post('/customer/cart/add', { productId, quantity });
      if (res.data?.data) {
        set({
          cartItems: res.data.data.items,
          totalPrice: res.data.data.totalPrice
        });
        toast.success("Added to cart!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart. Please Login.");
    }
  },

  removeFromCart: async (productId) => {
    try {
      const res = await axiosInstance.delete(`/customer/cart/remove/${productId}`);
      if (res.data?.data) {
        set({
          cartItems: res.data.data.items,
          totalPrice: res.data.data.totalPrice
        });
        toast.success("Item removed from cart");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  },

  clearCartStore: async () => {
    try {
      await axiosInstance.delete('/customer/cart/clear');
      set({ cartItems: [], totalPrice: 0 });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }
}));
