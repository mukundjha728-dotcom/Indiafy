import { bervo } from '../../config/bervo.config.js';
import AuthModel from '../../models/admins/auth.model.js';
import SecurityKeyModel from "../../models/admins/securityKey.model.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import { passwordDecryption, passwordEncryption } from "../../utils/bcrypt.js"
import userCookies from '../../utils/userCookies.js';

const Signup = async (req, res) => {
    try {
        const { firstName, middleName, lastName, position, email, password, securityKey } = req.body;

        if (!firstName || !email || !password || !position || !securityKey) {
            return res.status(400).json(new ApiError(400, "Please all required field."));
        }

        const securityKeyObject = await SecurityKeyModel.findOne({ role: position });

        if (!securityKeyObject) {
            return res.status(400).json(new ApiError(400, "No Security Key is Available for this role"));
        }

        const decryptResult = await passwordDecryption(securityKey, securityKeyObject.key);

        if (!decryptResult) {
            return res.status(401).json(new ApiError(401, "In-correct Security Key"));
        }

        const encryptPassword = await passwordEncryption(password);

        const admin = new AuthModel({
            email,
            password: encryptPassword,
            firstName,
            middleName: middleName ? middleName : null,
            lastName: lastName ? lastName : null,
            role: position,
            securityKeyId: securityKeyObject._id
        })

        const adminDetails = await admin.save();

        if (!adminDetails) {
            return res.status(400).json(new ApiError(400, "New Admin registration failed"));
        }

        adminDetails.password = undefined;
        adminDetails.securityKeyId = undefined;

        const tokenData = adminDetails.toObject();
        tokenData.role = "Admin";

        await userCookies(res, tokenData)

        return res.status(200), json(new ApiResponse(200, tokenData, "New Admin registration Successful"));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const Login = async (req, res) => {
    try{
        const {email, password, securityKey} = req.body;
        
        const adminDetails = await AuthModel.findOne({email:email});

        if(!adminDetails){
            return res.status(404).json(new ApiError(404, "Email is not found"));
        }

        const securityKeyDetails = await SecurityKeyModel.findById(adminDetails.securityKeyId);

        const keyDecryptionResult = await passwordDecryption(securityKey, securityKeyDetails.key);
        const passwordDecryptionResult = await passwordDecryption(password, adminDetails.password);

        if(!keyDecryptionResult){
            return res.status(401).json(new ApiError(401, "In-correct Security Key"));
        }

        if(!passwordDecryptionResult){
            return res.status(401).json(new ApiError(401, "In-correct Password"));
        }

        adminDetails.password = undefined;
        adminDetails.securityKeyId = undefined;

        let tokenData = adminDetails.toObject();
        
        tokenData.role = 'Admin';

        await userCookies(res, tokenData);

        return res.status(200).json(new ApiResponse(200, tokenData, "Access Granted"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const forgetPassword = async (req, res) => {
    try{
        const {email, password, securityKey} = req.body;

        const admin = await AuthModel.findOne({email: email});

        const securityKeyValue = await SecurityKeyModel.findById(admin._id);

        const keyResult = await passwordDecryption(securityKey, securityKeyValue.key);

        if(!keyResult){
            return res.status(401).json(new ApiError(401, "In-correct Security key"));
        }

        const encryptPassword = await passwordEncryption(password);

        const adminDetails = await AuthModel.findOneAndUpdate(
            {email:email},
            {password: encryptPassword}
        );

        if(!adminDetails){
            return res.status(400).json(new ApiError(400, "Forget Password is failed"));
        }

        adminDetails.password  = undefined;
        adminDetails.securityKeyId = undefined;

        let tokenData = adminDetails.toObject();

        tokenData.role = "Admin";

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