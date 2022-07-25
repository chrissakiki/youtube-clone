"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandleMiddleware = (err, req, res, next) => {
    const defaultError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, try again later",
    };
    if (err.name === "ValidationError") {
        defaultError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST; //400
        defaultError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
    }
    // if unique item is taken
    if (err.code && err.code === 11000) {
        defaultError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST; //400
        defaultError.message = `${Object.keys(err.keyValue)} has already been taken`;
    }
    res.status(defaultError.statusCode).json({ message: defaultError.message });
};
exports.default = errorHandleMiddleware;
