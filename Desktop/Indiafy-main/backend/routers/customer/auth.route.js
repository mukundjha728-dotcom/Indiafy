import {Router} from "express";
import {signupEmailPresent, customer} from "../../middlewares/emailPresent.middleware.js";
import {Signup, Login, forgetPassword, authOtp} from "../../controllers/customers/auth.controllers.js";
import { validateResult } from "../../middlewares/validate.middleware.js";
import { signupValidation, loginValidation, otpValidation } from "../../middlewares/validators/auth.validator.js";

const router = Router();

router.route("/signup").post(signupValidation, validateResult, Signup);
router.route("/signupOtp").post(otpValidation, validateResult, signupEmailPresent, authOtp);
router.route("/login").post(loginValidation, validateResult, customer, Login);
router.route("/fotgetPassword").put(loginValidation, validateResult, forgetPassword);
router.route("/forgetpasswordOtp").post(otpValidation, validateResult, customer, authOtp);

export default router;