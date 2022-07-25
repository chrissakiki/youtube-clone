"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// custom throw new error class with status code
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = CustomAPIError;
