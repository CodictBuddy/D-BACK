"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
class AppException extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
    getMessage() {
        return this.message;
    }
    getCode() {
        return this.code;
    }
}
exports.AppException = AppException;
//# sourceMappingURL=app-exception.js.map