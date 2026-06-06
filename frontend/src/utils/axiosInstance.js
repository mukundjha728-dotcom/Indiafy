import axios from "axios";

// Dynamic resolution of backend API URL
const getBaseURL = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    // If running in production (not localhost), fallback to your Render production backend
    if (typeof window !== "undefined" && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("127.0.0.1")) {
        return "https://indiafy-1.onrender.com/api/v1/indiafy";
    }
    // Fallback for local development
    return "http://localhost:8000/api/v1/indiafy";
};

// Base instance
const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true, // Important for cookies (JWT)
    headers: {
        "Content-Type": "application/json",
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Fallback for mobile/cross-domain cookie issues: use Bearer token from localStorage
        try {
            const url = config.url || "";
            // Determine if request is intended for Seller or Wholesale routes
            const isSellerRoute = url.includes("/seller") || url.includes("/wholesale") || url.includes("/local");
            
            let token = null;

            const getSellerToken = () => {
                const sellerStorage = localStorage.getItem('indiafy-seller-auth-storage');
                if (sellerStorage) {
                    const { state } = JSON.parse(sellerStorage);
                    return state?.token || null;
                }
                return null;
            };

            const getCustomerToken = () => {
                const authStorage = localStorage.getItem('indiafy-auth-storage');
                if (authStorage) {
                    const { state } = JSON.parse(authStorage);
                    return state?.token || null;
                }
                return null;
            };

            if (isSellerRoute) {
                // Strictly use seller token for seller endpoints
                token = getSellerToken();
            } else {
                // Strictly use customer token for customer endpoints
                token = getCustomerToken();
            }

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (err) {
            // Silently fail if storage is corrupted or missing
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Handle Network Errors (Offline, CORS, Timeout)
        if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
            if (window.location.pathname !== '/network-error') {
                window.location.href = '/network-error';
            }
            return Promise.reject(error);
        }

        if (error.response) {
            const status = error.response.status;

            // Handle 401 Unauthorized
            if (status === 401) {
                // Don't redirect for auth/me or login/signup calls
                const isAuthCall = error.config.url.includes('/auth/me') || error.config.url.includes('/login') || error.config.url.includes('/signup');
                if (isAuthCall) return Promise.reject(error);

                const publicPaths = [
                    '/', '/about', '/product/', '/category/', '/search',
                    '/store/', '/cart', '/login', '/signup',
                    '/seller-auth', '/admin/login',
                ];
                const currentPath = window.location.pathname;
                const isPublicPage = publicPaths.some(path =>
                    path === '/' ? currentPath === '/' : currentPath.startsWith(path)
                );

                if (!isPublicPage && currentPath !== '/session-expired') {
                    window.location.href = '/session-expired';
                }
            }
            
            // Handle 403 Forbidden
            else if (status === 403) {
                if (window.location.pathname !== '/403') {
                    window.location.href = '/403';
                }
            }
            
            // Handle 500 Internal Server Error
            else if (status >= 500) {
                if (window.location.pathname !== '/500') {
                    window.location.href = '/500';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
