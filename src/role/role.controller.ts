import { SharedService } from "src/shared/shared.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { response, Response } from "express";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private sservice: SharedService
  ) {}

  @Post("role-create")
  async roleCreate(
    @Res() res: Response,
    @Body() body: any
  ) {
    try {
      let data = await this.roleService.roleCreate(body);
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name
      );
      return res.status(code).json(response);
    }
  }

  @Patch("role-update/:id")
  async updaterole(
    @Param("id") id: string,
    @Body() body: any,
    @Res() res: Response
  ) {
    try {
      let data = await this.roleService.roleUpdate(id, body);
      return res.json(data);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name
      );
      return res.status(code).json(response);
    }
  }

  @Delete("role-delete/:id")
  async deleterole(@Param("id") id: string, @Res() res: Response) {
    try {
      let data = await this.roleService.roleDelete(id);
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name
      );
      return res.status(code).json(response);
    }
  }

  @Get("role-detail/:id")
  async getRoleDetail(@Param("id") id: string, @Res() res: Response) {
    try {
      let data = await this.roleService.roleDetail(id);
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name
      );
      return res.status(code).json(response);
    }
  }

  @Get("get-list")
  async getRoleList(@Res() res: Response) {
    try {
      let data = await this.roleService.roleList();
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name
      );
      return res.status(code).json(response);
    }
  }
}
