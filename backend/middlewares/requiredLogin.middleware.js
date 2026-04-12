import { ApiError } from "../utils/apiError.js";
import userCookies from "../utils/userCookies.js";

const securityKey = process.env.SecurityKey

const requiredLogin = async (req, res, next) => {
    try {
        const accessToken = req?.cookies?.AccessToken;
        const refreshToken = req?.cookies?.RefreshToken;

        if(accessToken){
            const result = jwt.verify(accessToken,securityKey);

            if(!result){
                return res.status(401).json(new ApiError(401, "Please Login"));
            }

            req.user = result.user;
            return next();
        }
        else if(refreshToken){
            const result = jwt.verify(refreshToken, securityKey);

            if(!result){
                return res.status(401).json(new ApiError(401, "Please Login"));
            }

            req.user = result.user;

            await userCookies(res, result.user);

            return next();
        }
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, "Please Login", [{ message: err.message, name: err.name }]));
    }
}

export default requiredLogin;