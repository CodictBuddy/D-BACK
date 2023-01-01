import { SharedService } from "src/shared/shared.service";
import { Response } from "express";
import { RoleService } from "./role.service";
export declare class RoleController {
    private readonly roleService;
    private sservice;
    constructor(roleService: RoleService, sservice: SharedService);
    roleCreate(res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    updaterole(id: string, body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleterole(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getRoleDetail(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getRoleList(res: Response): Promise<Response<any, Record<string, any>>>;
}
