import mongoose, {Schema} from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const productSchema = new Schema({
    subCategoryId:{
        type: ObjectId,
        required: true
    },
    sellerId: {
        type: ObjectId,
        ref: "Seller",
        required: true
    },
    productName:{
        type: "String",
        required: true
    },
    productSkuId:{
        type:"String",
        required: true,
        unique:true
    },
    productImage:[{
        type:"String",
        required: true
    }],
    attribute:{
        salePrice:{
            type:"String",
            required:true
        },
        mrpPrice:{
            type: "String",
            required:true
        },
        weight:{
            type:"String",
            required: true
        },
        quantity:{
            type:"String",
            required:true
        }
    },
    shortDescription:{
        type:"String",
        required: true
    },
    description:{
        type: "String",
        required: true
    }
},
{timestamps: true}
);

productSchema.index({subCategoryId:1});

const productModel = mongoose.model("product", productSchema);

export default productModel;