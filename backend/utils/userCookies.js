import ApiError from "./apiError.js";
import jwtToken from "./jwt.js";

const userCookies = async (res, user) => {
    try{
        const {message, accessToken, refreshToken} = await jwtToken(user);

        if(!message){
            return res.status(401).json(new ApiError(401, "Cookies generation failed"));
        }

        res.cookie(accessToken, "AccessToken", {
            httpOnly:true,
            secure: true,
            same:"Strict",
            max:15*60*1000
        });

        res.cookie(refreshToken, "RefreshToken",{
            httpOnly:true,
            secure:true,
            same:"Strict",
            max: 24*60*60*1000
        })
    }
    catch(err){
        return res.status(500).json(new ApiError(500, "Token generation failed"));
    }
}

export default userCookies;