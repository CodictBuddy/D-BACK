import { Model } from "mongoose";
import { IRoleModel } from "./schema/role.schema";
export declare class RoleService {
    private readonly roleModel;
    constructor(roleModel: Model<IRoleModel>);
    roleCreate(body: any): Promise<{
        message: string;
    }>;
    roleUpdate(id: string, body: any): Promise<IRoleModel>;
    roleDelete(id: string): Promise<{
        message: string;
    }>;
    roleList(): Promise<IRoleModel[]>;
    roleDetail(id: string): Promise<IRoleModel>;
}
