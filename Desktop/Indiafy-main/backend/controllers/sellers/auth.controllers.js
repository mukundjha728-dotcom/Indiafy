import crypto from "crypto";
import { bervo } from '../../config/bervo.config.js';
import SellerModel from '../../models/sellers/auth.model.js';
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import { passwordDecryption, passwordEncryption } from "../../utils/bcrypt.js"
import userCookies from '../../utils/userCookies.js';

const Signup = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, password} = req.body;

        if (!firstName || !email || !password) {
            return res.status(400).json(new ApiError(400, "All fields are required."));
        }

        // Password validation: 8+ chars, one letter, one number
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json(new ApiError(400, "Password must be at least 8 characters long and include at least one letter and one number."));
        }

        const seller = new SellerModel({
            email,
            password, // Model pre-save hook will hash this
            firstName,
            middleName: middleName ? middleName : null,
            lastName: lastName ? lastName : null,
        })

        const sellerDetails = await seller.save();

        if (!sellerDetails) {
            return res.status(400).json(new ApiError(400, "New Seller registration failed"));
        }

        sellerDetails.password = undefined;

        const tokenData = sellerDetails.toObject();
        tokenData.role = "Seller";

        await userCookies(res, tokenData)

        return res.status(200), json(new ApiResponse(200, tokenData, "New Seller registration Successful"));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        
        const sellerDetails = await SellerModel.findOne({email:email});

        if(!sellerDetails){
            return res.status(404).json(new ApiError(404, "Email is not found"));
        }

        const isMatch = await passwordDecryption(password, sellerDetails.password);

        if(!isMatch){
            return res.status(401).json(new ApiError(401, "Incorrect Password"));
        }

        sellerDetails.password = undefined;
        sellerDetails.securityKeyId = undefined;

        let tokenData = sellerDetails.toObject();
        
        tokenData.role = "Seller";

        await userCookies(res, tokenData);

        return res.status(200).json(new ApiResponse(200, tokenData, "Access Granted"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const forgetPassword = async (req, res) => {
    try{
        const {email, password} = req.body;

        const seller = await SellerModel.findOne({ email });
        if (!seller) {
            return res.status(404).json(new ApiError(404, "Seller not found"));
        }

        seller.password = password;
        const sellerDetails = await seller.save();

        if(!sellerDetails){
            return res.status(400).json(new ApiError(400, "Password reset failed"));
        }

        sellerDetails.password  = undefined;
        sellerDetails.securityKeyId = undefined;

        let tokenData = sellerDetails.toObject();

        tokenData.role = "Seller";

        await userCookies(res, tokenData);

        return res.status(200).json(new ApiResponse(200, null, "Password reset successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name:err.name}]));
    }
}

const authOtp = async (req, res) => {
    try{
        const {email, type} = req.body;

        const otp = crypto.randomInt(100000, 999999).toString();
        
        // Hash OTP before storing
        const hashedOtp = await passwordEncryption(otp);

        const seller = await SellerModel.findOne({ email });
        if (seller) {
            seller.otp = hashedOtp;
            seller.otpExpires = Date.now() + 5 * 60 * 1000;
            await seller.save();
        }

        const emailResult = await bervo(email, "Verify Your Email", otp, type)

        if(!emailResult.message){
            return res.status(400).json(new ApiError(400, 'Email Sending Failed'));
        }

        return res.status(200).json(new ApiResponse(200, null, "Email sent successfully."));

    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

export {Signup, Login, forgetPassword, authOtp};