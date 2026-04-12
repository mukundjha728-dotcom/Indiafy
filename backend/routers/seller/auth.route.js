import {Router} from "express";
import {signupEmailPresent, seller} from "../../middlewares/emailPresent.middleware.js";
import {Signup, Login, forgetPassword, authOtp} from "../../controllers/sellers/auth.controllers.js";


const router = Router();

router.route("/signup").post(Signup);
router.route("/signupOtp").post(signupEmailPresent, authOtp);
router.route("/login").post(seller, Login);
router.route("/fotgetPassword").put(forgetPassword);
router.route("/forgetpasswordOtp").post(seller, authOtp);

export default router;