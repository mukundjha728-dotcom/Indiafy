import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

import adminAuthRoutes from "./routers/admin/auth.route.js";
import customerAuthRoutes from "./routers/customer/auth.route.js";
import sellerAuthRoutes from "./routers/seller/auth.route.js";
import productRoutes from "./routers/product/product.route.js";
import orderRoutes from "./routers/order/order.route.js";
import paymentRoutes from "./routers/payment/payment.route.js";
import customerCartRoutes from "./routers/customer/cart.route.js";
import customerProfileRoutes from "./routers/customer/profile.route.js";

const app = express();

// Security Headers
app.use(helmet());

// Global Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", // Define strict origin in production
    credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent HTTP parameter pollution
app.use(hpp());

// Auth Rate Limiting (Brute Force Protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 login/signup attempts
    message: "Too many authentication attempts from this IP, please try again after 15 minutes."
});

// Routes
app.use("/api/v1/indiafy/admin/auth", authLimiter, adminAuthRoutes);
app.use("/api/v1/indiafy/customer/auth", authLimiter, customerAuthRoutes);
app.use("/api/v1/indiafy/seller/auth", authLimiter, sellerAuthRoutes);
app.use("/api/v1/indiafy/products", productRoutes);
app.use("/api/v1/indiafy/orders", orderRoutes);
app.use("/api/v1/indiafy/payments", paymentRoutes);
app.use("/api/v1/indiafy/customer/cart", customerCartRoutes);
app.use("/api/v1/indiafy/customer/profile", customerProfileRoutes);

export default app;