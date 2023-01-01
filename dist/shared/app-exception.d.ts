import { HttpStatus } from "@nestjs/common";
export declare class AppException extends Error {
    readonly message: string;
    readonly code: HttpStatus;
    constructor(message: string, code: HttpStatus);
    getMessage(): string;
    getCode(): HttpStatus;
}
