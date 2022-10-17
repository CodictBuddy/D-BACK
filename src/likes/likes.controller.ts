import { SharedService } from 'src/shared/shared.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { UserToken } from 'src/user/dto/usertoken.dto';
import { LikesService } from './likes.service';

@Controller(':organization_code/likes')
export class LikesController {

  constructor(
    private likesService: LikesService,
    private sservice: SharedService,
  ) { }


  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(
    @Res() res: any,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Body() body: any,
  ) {
    try {
      let data = await this.likesService.create(+organization, token, body);
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
  @Get(':content_id')
  async list(
    @Res() res: any,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Param('content_id') content_id: string,
  ) {
    try {
      let data = await this.likesService.list(+organization, token, content_id);
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
  @Delete(':id')
  async remove(
    @Res() res: any,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Param('id') id,
  ) {
    try {
      let data = await this.likesService.remove(+organization, token,
        id);
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
