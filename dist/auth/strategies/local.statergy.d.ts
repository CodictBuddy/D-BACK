import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { SharedService } from "src/shared/shared.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private sservice;
    constructor(authService: AuthService, sservice: SharedService);
    validate(user_email: string, password: string): Promise<any>;
}
export {};
