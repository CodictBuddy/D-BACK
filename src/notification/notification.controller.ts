import { UserToken } from 'src/user/dto/usertoken.dto';
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SharedService } from './../shared/shared.service';
import { NotificationService } from './notification.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

@Controller(':organization_code/notification')
export class NotificationController {
  constructor(
    private notiService: NotificationService,
    private sservice: SharedService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('unread')
  async unreadList(
    @Res() res: any,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
  ) {
    try {
      let data = await this.notiService.getUnreadList(+organization, token);
      return res.json(data);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Res() res: Response,
    @Body() body: any,
  ) {
    try {
      let data = await this.notiService.create(+organization, token, body);
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  async update(
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Res() res: Response,
    @Body() body: any,
  ) {
    try {
      let data = await this.notiService.update(+organization, token, body);
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':notification_type/:notification_id')
  async remove(
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Param('notification_id') notification_id,
    @Param('notification_type') notification_type,
    @Res() res: Response,
  ) {
    try {
      let data = await this.notiService.remove(+organization, token, {
        notification_id,
        notification_type,
      });
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async list(
    @Res() res: any,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
  ) {
    try {
      let data = await this.notiService.getList(+organization, token);
      return res.json(data);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }
}
