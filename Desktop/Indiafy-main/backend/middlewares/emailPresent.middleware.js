import adminAuthModel from "../models/admins/auth.model.js";
import customerAuthModel from "../models/customers/auth.model.js";
import sellerAuthModel from "../models/sellers/auth.model.js";
import ApiError from "../utils/apiError.js";

const signupEmailPresent = async (req, res, next ) => {
    try{
        const {email} = req.body;

        const admin = await adminAuthModel.findOne({email: email});
        const customer = await customerAuthModel.findOne({email: email});
        const seller = await sellerAuthModel.findOne({email: email});

        if(admin || customer || seller){
            return res.status(401).json(new ApiError(401, "Email already registration"));
        }

        return next();
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const admin = async (req, res, next) => {
    try{
        const {email} = req.body

        const isEmail = await adminAuthModel.findOne({email: email});

        if(!isEmail){
            return res.status(404).json(new ApiError(404, "Email is not found"));
        }

        return next();
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const customer = async (req, res, next) => {
    try{
        const {email} = req.body

        const isEmail = await customerAuthModel.findOne({email: email});

        if(!isEmail){
            return res.status(404).json(new ApiError(404, "Email is not found"));
        }

        return next();
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const seller = async (req, res, next) => {
    try{
        const {email} = req.body

        const isEmail = await sellerAuthModel.findOne({email: email});

        if(!isEmail){
            return res.status(404).json(new ApiError(404, "Email is not found"));
        }

        return next();
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

export {signupEmailPresent, admin, customer, seller};