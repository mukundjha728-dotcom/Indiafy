import Razorpay from "razorpay";
import crypto from "crypto";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import OrderModel from "../../models/orders/order.model.js";

// @desc    Create Razorpay order
// @route   POST /api/v1/indiafy/payments/create-order
// @access  Private (Customer)
export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body; // Amount in INR

        if (!amount) {
            return res.status(400).json(new ApiError(400, "Amount is required"));
        }

        const instance = new Razorpay({
            key_id: process.env.Razorpay_Key_Id,
            key_secret: process.env.Razorpay_Key_Secret,
        });

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise (1 INR = 100 paise)
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return res.status(500).json(new ApiError(500, "Failed to create Razorpay order"));
        }

        return res.status(200).json(new ApiResponse(200, order, "Razorpay order created successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Verify Razorpay payment
// @route   POST /api/v1/indiafy/payments/verify
// @access  Private (Customer)
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.Razorpay_Key_Secret)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json(new ApiError(400, "Invalid payment signature"));
        }

        // If verification passes, update the Order in the database
        const order = await OrderModel.findById(orderId);
        
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: razorpay_payment_id,
                status: "success",
                update_time: new Date().toISOString(),
            };
            
            // Advance order status from Pending to Processing
            order.status = "Processing";

            await order.save();
        }

        return res.status(200).json(new ApiResponse(200, { verified: true }, "Payment verified successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};
