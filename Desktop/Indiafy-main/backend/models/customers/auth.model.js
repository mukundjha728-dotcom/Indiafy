import mongoose, { Schema } from "mongoose";
import {passwordEncryption} from "../../utils/bcrypt.js"

const authSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
},
    { timestamps: true }
)

authSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    const result = await passwordEncryption(this.password);
    this.password = result;
    return next();
});

const authModel = mongoose.model("customer", authSchema);

export default authModel;