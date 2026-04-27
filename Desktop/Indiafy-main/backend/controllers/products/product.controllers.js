import ProductModel from "../../models/products/product.model.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";

// @desc    Create a new product
// @route   POST /api/v1/indiafy/products
// @access  Private (Seller only)
export const createProduct = async (req, res) => {
    try {
        const { subCategoryId, productName, productSkuId, attribute, shortDescription, description } = req.body;

        // Ensure user is a seller
        if (req.user.role !== "Seller") {
            return res.status(403).json(new ApiError(403, "Only sellers can create products"));
        }

        const existingProduct = await ProductModel.findOne({ productSkuId });
        if (existingProduct) {
            return res.status(400).json(new ApiError(400, "Product with this SKU already exists"));
        }

        // Extract image URLs from multer req.files
        const productImage = req.files ? req.files.map(file => file.path) : [];

        if (productImage.length === 0) {
            return res.status(400).json(new ApiError(400, "At least one product image is required"));
        }

        const product = new ProductModel({
            sellerId: req.user._id,
            subCategoryId,
            productName,
            productSkuId,
            productImage,
            attribute: typeof attribute === "string" ? JSON.parse(attribute) : attribute, // Handle FormData parsing
            shortDescription,
            description
        });

        const savedProduct = await product.save();
        return res.status(201).json(new ApiResponse(201, savedProduct, "Product created successfully"));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Get all products (with optional filtering)
// @route   GET /api/v1/indiafy/products
// @access  Public / Customer
export const getAllProducts = async (req, res) => {
    try {
        const { subCategory, search } = req.query;
        let query = {};

        if (subCategory) {
            query.subCategoryId = subCategory;
        }

        if (search) {
            query.productName = { $regex: search, $options: "i" };
        }

        const products = await ProductModel.find(query).populate("sellerId", "firstName lastName email").limit(50);
        
        return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Get product by ID
// @route   GET /api/v1/indiafy/products/:id
// @access  Public / Customer
export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).populate("sellerId", "firstName lastName email");

        if (!product) {
            return res.status(404).json(new ApiError(404, "Product not found"));
        }

        return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Update a product
// @route   PUT /api/v1/indiafy/products/:id
// @access  Private (Seller only)
export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json(new ApiError(404, "Product not found"));
        }

        // Only the seller who created the product (or an admin) can update it
        if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
            return res.status(403).json(new ApiError(403, "Not authorized to update this product"));
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// @desc    Delete a product
// @route   DELETE /api/v1/indiafy/products/:id
// @access  Private (Seller/Admin only)
export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json(new ApiError(404, "Product not found"));
        }

        if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
            return res.status(403).json(new ApiError(403, "Not authorized to delete this product"));
        }

        await ProductModel.findByIdAndDelete(req.params.id);

        return res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};
