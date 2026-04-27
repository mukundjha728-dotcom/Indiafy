import OrderModel from "../../models/orders/order.model.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";

// @desc    Create new order
// @route   POST /api/v1/indiafy/orders
// @access  Private (Customer)
export const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        if (req.user.role !== "Customer") {
            return res.status(403).json(new ApiError(403, "Only customers can place orders"));
        }

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json(new ApiError(400, "No order items"));
        }

        const order = new OrderModel({
            customer: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        return res.status(201).json(new ApiResponse(201, createdOrder, "Order placed successfully"));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Get order by ID
// @route   GET /api/v1/indiafy/orders/:id
// @access  Private (Customer/Seller/Admin)
export const getOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id)
            .populate('customer', 'firstName lastName email')
            .populate('orderItems.product', 'productName productImage')
            .populate('orderItems.seller', 'businessName email');

        if (!order) {
            return res.status(404).json(new ApiError(404, "Order not found"));
        }

        // Add security: check if this user is allowed to view this order
        // Admin can view all. Customer can view their own. Seller can view orders containing their products.
        let isAuthorized = false;
        
        if (req.user.role === "Admin") {
            isAuthorized = true;
        } else if (req.user.role === "Customer" && order.customer._id.toString() === req.user._id.toString()) {
            isAuthorized = true;
        } else if (req.user.role === "Seller") {
            // Check if seller has items in this order
            const sellerHasItems = order.orderItems.some(item => item.seller._id.toString() === req.user._id.toString());
            if (sellerHasItems) isAuthorized = true;
        }

        if (!isAuthorized) {
            return res.status(403).json(new ApiError(403, "Not authorized to view this order"));
        }

        return res.status(200).json(new ApiResponse(200, order, "Order fetched successfully"));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Get logged in customer orders
// @route   GET /api/v1/indiafy/orders/myorders
// @access  Private (Customer)
export const getCustomerOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ customer: req.user._id })
            .populate('orderItems.product', 'productName productImage attribute')
            .populate('orderItems.seller', 'firstName lastName businessName')
            .sort({ createdAt: -1 });
        return res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Get seller's orders
// @route   GET /api/v1/indiafy/orders/sellerorders
// @access  Private (Seller)
export const getSellerOrders = async (req, res) => {
    try {
        // Find orders that contain at least one item from this seller
        const orders = await OrderModel.find({ "orderItems.seller": req.user._id })
            .populate('customer', 'firstName lastName email')
            .sort({ createdAt: -1 });
        return res.status(200).json(new ApiResponse(200, orders, "Seller orders fetched successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Update order status (Shipping, Delivered)
// @route   PUT /api/v1/indiafy/orders/:id/status
// @access  Private (Seller/Admin)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await OrderModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json(new ApiError(404, "Order not found"));
        }

        // Verify seller is updating their own order or is an Admin
        if (req.user.role === "Seller") {
            const sellerHasItems = order.orderItems.some(item => item.seller.toString() === req.user._id.toString());
            if (!sellerHasItems) {
                return res.status(403).json(new ApiError(403, "Not authorized to update this order"));
            }
        }

        order.status = status;
        
        if (status === "Delivered") {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();
        return res.status(200).json(new ApiResponse(200, updatedOrder, "Order status updated successfully"));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Upload packing video for an order
// @route   POST /api/v1/indiafy/orders/:id/upload-video
// @access  Private (Seller)
export const uploadPackingVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json(new ApiError(400, "No video file provided"));
        }

        const order = await OrderModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json(new ApiError(404, "Order not found"));
        }

        // Verify seller
        const sellerHasItems = order.orderItems.some(item => item.seller.toString() === req.user._id.toString());
        if (!sellerHasItems) {
            return res.status(403).json(new ApiError(403, "Not authorized to upload video for this order"));
        }

        // Update order status to shipped automatically?
        order.status = "Shipped";

        // Mongoose doesn't have a packingVideo field explicitly defined unless I add it or just use mixed/set.
        // Let's explicitly save the video url if the schema supports it. If not, I should update the schema too.
        // I'll update the schema in another chunk.
        order.packingVideoUrl = req.file.path;

        await order.save();

        return res.status(200).json(new ApiResponse(200, { videoUrl: req.file.path }, "Packing video uploaded successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};
