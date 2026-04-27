class ApiError extends Error {
    constructor(statusCode, message = "Failed, Somthing went error", error = [], stack = "") {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.success = false;
        this.error = error

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        return {
            success: this.success,
            message: this.message,
            statusCode: this.statusCode,
            error: this.error,
            stack: this.stack
        }
    }
};

export default ApiError
