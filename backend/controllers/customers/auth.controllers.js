import { bervo } from '../../config/bervo.config.js';
import CustomerModel from '../../models/customers/auth.model.js';
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

        const customer = new CustomerModel({
            email,
            password: encryptPassword,
            firstName,
            middleName: middleName ? middleName : null,
            lastName: lastName ? lastName : null,
        })

        const customerDetails = await customer.save();

        if (!customerDetails) {
            return res.status(400).json(new ApiError(400, "New Customer registration failed"));
        }

        customerDetails.password = undefined;

        const tokenData = customerDetails.toObject();
        tokenData.role = "Customer";

        await userCookies(res, tokenData)

        return res.status(200), json(new ApiResponse(200, tokenData, "New Customer registration Successful"));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        
        const customerDetails = await CustomerModel.findOne({email:email});

        if(!customerDetails){
            return res.status(404).json(new ApiError(404, "Email is not found"));
        }

        const passwordDecryptionResult = await passwordDecryption(password, customerDetails.password);

        if(!passwordDecryptionResult){
            return res.status(401).json(new ApiError(401, "In-correct Password"));
        }

        customerDetails.password = undefined;
        customerDetails.securityKeyId = undefined;

        let tokenData = customerDetails.toObject();
        
        tokenData.role = "Customer";

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

        const customerDetails = await CustomerModel.findOneAndUpdate(
            {email:email},
            {password: encryptPassword}
        );

        if(!customerDetails){
            return res.status(400).json(new ApiError(400, "Forget Password is failed"));
        }

        customerDetails.password  = undefined;
        customerDetails.securityKeyId = undefined;

        let tokenData = customerDetails.toObject();

        tokenData.role = "Customer";

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