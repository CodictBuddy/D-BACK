import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { SharedService } from 'src/shared/shared.service';
import { UserToken } from 'src/user/dto/usertoken.dto';
import { CommentsService } from './comments.service';

@Controller(':organization_code/comments')
export class CommentsController {

    constructor(
        private commentsService: CommentsService,
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
        let data = await this.commentsService.create(+organization, token, body);
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
    @Patch(':id')
    async update(
      @Res() res: any,
      @GetToken() token: UserToken,
      @Param('organization_code') organization,
      @Param('id') id,
      @Body() body: any,
    ) {
      try {
        let data = await this.commentsService.update(+organization, token, {id,...body});
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
        let data = await this.commentsService.list(+organization, token, content_id);
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
        let data = await this.commentsService.remove(+organization, token,
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
