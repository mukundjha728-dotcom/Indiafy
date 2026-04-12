import {Router} from "express";
import {signupEmailPresent, admin} from "../../middlewares/emailPresent.middleware.js";
import {Signup, Login, forgetPassword, authOtp} from "../../controllers/admins/auth.controllers.js";


const router = Router();

router.route("/signup").post(Signup);
router.route("/signupOtp").post(signupEmailPresent, authOtp);
router.route("/login").post(admin, Login);
router.route("/fotgetPassword").put(forgetPassword);
router.route("/forgetpasswordOtp").post(admin, authOtp);

export default router;