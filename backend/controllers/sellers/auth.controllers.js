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
            return res.status(400).json(new ApiError(400, "Please all required field."));
        }

        const encryptPassword = await passwordEncryption(password);

        const seller = new SellerModel({
            email,
            password: encryptPassword,
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

        const passwordDecryptionResult = await passwordDecryption(password, sellerDetails.password);

        if(!passwordDecryptionResult){
            return res.status(401).json(new ApiError(401, "In-correct Password"));
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

        const encryptPassword = await passwordEncryption(password);

        const sellerDetails = await SellerModel.findOneAndUpdate(
            {email:email},
            {password: encryptPassword}
        );

        if(!sellerDetails){
            return res.status(400).json(new ApiError(400, "Forget Password is failed"));
        }

        sellerDetails.password  = undefined;
        sellerDetails.securityKeyId = undefined;

        let tokenData = sellerDetails.toObject();

        tokenData.role = "Seller";

        await userCookies(res, tokenData);

        return res.status(200).json(new ApiResponse(200, ))
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name:err.name}]));
    }
}

const authOtp = async (req, res) => {
    try{
        const {email, type} = req.body;

        const otp = parseInt(Math.random()*10000)

        const emailResult = await bervo(email, "Verify Your Email", otp, type)

        if(!emailResult.message){
            return res.status(400).json(new ApiError(400, 'Email Sending Failed'));
        }

        return res.status(200).json(new ApiResponse(200, otp, "Email Send Successfully."));

    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

export {Signup, Login, forgetPassword, authOtp};