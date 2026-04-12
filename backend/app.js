import express from "express";
import adminAuthRoutes from "./routers/admin/auth.route.js";
import customerAuthRoutes from "./routers/customer/auth.route.js";
import sellerAuthRoutes from "./routers/seller/auth.route.js";

const app = express();

app.use("/api/v1/indiafy/admin/auth", adminAuthRoutes);
app.use("/api/v1/indiafy/customer/auth", customerAuthRoutes);
app.use("/api/v1/indiafy/seller/auth", sellerAuthRoutes);

export default app;