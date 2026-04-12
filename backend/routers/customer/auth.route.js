import {Router} from "express";
import {signupEmailPresent, customer} from "../../middlewares/emailPresent.middleware.js";
import {Signup, Login, forgetPassword, authOtp} from "../../controllers/customers/auth.controllers.js";


const router = Router();

router.route("/signup").post(Signup);
router.route("/signupOtp").post(signupEmailPresent, authOtp);
router.route("/login").post(customer, Login);
router.route("/fotgetPassword").put(forgetPassword);
router.route("/forgetpasswordOtp").post(customer, authOtp);

export default router;