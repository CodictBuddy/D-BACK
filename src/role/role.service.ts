import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { IRoleModel } from "./schema/role.schema";

@Injectable()
export class RoleService {
  constructor(
    @InjectModel("role")
    private readonly roleModel: Model<IRoleModel>
  ) {}

  async roleCreate(body: any) {
    try {
      await this.roleModel.create(body);
      return { message: "record created successfully" };
    } catch (err) {
      throw err;
    }
  }

  async roleUpdate(id: string, body: any) {
    try {
      await this.roleModel.findByIdAndUpdate(id, body, { new: true });
      let updatedData = await this.roleModel.findById(id);
      return updatedData;
    } catch (err) {
      throw err;
    }
  }

  async roleDelete(id: string) {
    try {
      await this.roleModel.findByIdAndDelete(id);
      return { message: "record deleted successfully" };
    } catch (err) {
      throw err;
    }
  }

  async roleList() {
    try {
      let data = await this.roleModel.find();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async roleDetail(id: string) {
    try {
      let data = await this.roleModel.findById(id);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
