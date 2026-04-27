import ApiError from "../utils/apiError.js";

/**
 * Middleware to restrict access based on user roles.
 * @param {string[]} allowedRoles - Array of roles allowed to access the route (e.g., ["Admin", "Seller"]).
 */
const roleGuard = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json(new ApiError(401, "Unauthorized: No user found. Please login."));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json(new ApiError(403, `Forbidden: Only ${allowedRoles.join(' or ')} can access this resource.`));
        }

        next();
    };
};

export default roleGuard;
