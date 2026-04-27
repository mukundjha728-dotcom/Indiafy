import { Router } from "express";
import { createOrder, getOrderById, getCustomerOrders, getSellerOrders, updateOrderStatus, uploadPackingVideo } from "../../controllers/orders/order.controllers.js";
import { uploadPackingVideoMiddleware } from "../../middlewares/uploadVideo.middleware.js";
import requiredLogin from "../../middlewares/requiredLogin.middleware.js";
import roleGuard from "../../middlewares/roleGuard.middleware.js";

const router = Router();

// All order routes are protected and require login
router.use(requiredLogin);

// Customer routes
router.route("/").post(roleGuard(["Customer"]), createOrder);
router.route("/myorders").get(roleGuard(["Customer"]), getCustomerOrders);

// Seller routes
router.route("/sellerorders").get(roleGuard(["Seller"]), getSellerOrders);
router.route("/:id/status").put(roleGuard(["Seller", "Admin"]), updateOrderStatus);
router.route("/:id/upload-video").post(roleGuard(["Seller"]), uploadPackingVideoMiddleware, uploadPackingVideo);

// Shared route (Security is handled inside the controller)
router.route("/:id").get(getOrderById);

export default router;
