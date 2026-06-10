import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import userCookies from "../utils/userCookies.js";

const requiredLogin = async (req, res, next) => {
  const securityKey = process.env.SecurityKey;
  try {
    const isSellerRoute = req.originalUrl.includes('/seller') || req.originalUrl.includes('/wholesale') || req.originalUrl.includes('/local');
    const isAdminRoute = req.originalUrl.includes('/admin');
    
    let rolePrefix = "Customer"; // default
    if (isSellerRoute) rolePrefix = "Seller";
    if (isAdminRoute) rolePrefix = "Admin";

    let accessToken =
      req?.cookies?.[`${rolePrefix}AccessToken`] || req.headers.authorization?.split(" ")[1];
    const refreshToken = req?.cookies?.[`${rolePrefix}RefreshToken`];

    if (accessToken) {
      try {
        const result = jwt.verify(accessToken, securityKey);
        if (result) {
          req.user = result;
          return next();
        }
      } catch (err) {
        return res
          .status(401)
          .set("Cache-Control", "no-store")
          .json(new ApiError(401, "Token Expired", [
            { message: err.message, name: err.name },
          ]));
      }
    }

    return res
      .status(401)
      .set("Cache-Control", "no-store")
      .json(new ApiError(401, "Please Login (No Token Found)"));
  } catch (err) {
    return res
      .status(401)
      .set("Cache-Control", "no-store")
      .json(
        new ApiError(401, "Please Login", [
          { message: err.message, name: err.name },
        ]),
      );
  }
};

export default requiredLogin;
