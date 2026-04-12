import mongoose, { Schema } from "mongoose";
import { passwordEncryption } from "../../utils/bcrypt.js";

const {ObjectId} = mongoose.Schema.Types;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    securityKeyId:{
        type: ObjectId,
        required: true
    }
},
    { timestamps: true }
);

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await passwordEncryption(this.password);

    next()
})

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel
