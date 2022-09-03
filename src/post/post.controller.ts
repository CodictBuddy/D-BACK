import { UserToken } from 'src/user/dto/usertoken.dto';
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SharedService } from './../shared/shared.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PostService } from './post.service';
@Controller(':organization_code/post')
export class PostController {
constructor(  private postService: PostService,
    private sservice: SharedService){}
   
    @UseGuards(JwtAuthGuard)
    @Post('my_posts')
    async myPostlist(
      @Res() res:Response,
      @GetToken() token: UserToken,
      @Param('organization_code') organization,
      @Body() body:any
    ) {
      try {
        let data = await this.postService.getMyPostList(
          +organization,
          token,
          body
        );
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
    @Post('all_posts')
    async list(
      @Res() res:Response,
      @GetToken() token: UserToken,
      @Param('organization_code') organization,
      @Body() body:any
    ) {
      try {
        let data = await this.postService.getAllPostList(
          +organization,
          token,
          body
        );
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
      let data = await this.postService.create(+organization, token, body);
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
    @Res() res:Response,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Body() body: any,
  ) {
    try {
      let data = await this.postService.update(+organization, token, body);
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
  @Get(':post_id')
  async getDetail(
    @Res() res:Response,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Param('post_id') post_id:string,
    
  ) {
    try {
      let data = await this.postService.getDetail(+organization, token,post_id);
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
  @Delete(':post_id')
  async remove(
    @Res() res:Response,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Param('post_id') post_id,
  ) {
    try {
      let data = await this.postService.remove(+organization, token, post_id);
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
