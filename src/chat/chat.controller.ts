import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { UserToken } from './../user/dto/usertoken.dto';
import { GetToken } from './../shared/decorator/getuser.decorator';
import { SharedService } from './../shared/shared.service';
import { ChatService } from './chat.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Res,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { Response } from 'express';

@Controller(':organization_code/chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private sservice: SharedService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @Post('search-room')
  // async searchRoom(
  //   @GetToken() token: UserToken,
  //   @Res() res: Response,
  //   @Body() body: any,
  // ) {
  //   try {
  //     let data = {}; // await this.chatService.searchRoom(body, token);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = await this.sservice.processError(
  //       err,
  //       this.constructor.name,
  //     );
  //     return res.status(code).json(response);
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  @Post('new-message')
  async newMessage(
    @GetToken() token: UserToken,
    @Res() res: Response,
    @Param('organization_code') organization,
    @Body() body: any,
  ) {
    try {
      let data = await this.chatService.newMessage(+organization, token, body);
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }

  // update existing message api

  @UseGuards(JwtAuthGuard)
  @Post('create-room')
  async createRoom(
    @GetToken() token: UserToken,
    @Res() res: Response,
    @Param('organization_code') organization,
    @Body() body: any,
  ) {
    try {
      let data = await this.chatService.createRoom(+organization, token, body);
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
  @Post('get-room-detail')
  async getRoomDetail(
    @Res() res: Response,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Body() body: any,
  ) {
    try {
      let data = await this.chatService.getRoomDetail(
        +organization,
        token,
        body,
      );
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
  @Get('get-chat-list/:roomId')
  async getChatList(
    @Res() res: Response,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Param('roomId') roomId,
  ) {
    try {
      let data = await this.chatService.getChatList(
        +organization,
        token,
        roomId,
      );
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
  @Get('get-my-rooms-list')
  async getRoomList(
    @Res() res: Response,
    @Param('organization_code') organization,
    @Query('skip') skip,
    @Query('limit') limit,
    @GetToken() token: UserToken,
  ) {
    try {
      let data = await this.chatService.getMyRoomList(
        +organization,
        token,
        +skip,
        +limit,
      );
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
  @Post('get-message-list')
  async getMessageList(
    @GetToken() token: UserToken,
    @Res() res: Response,
    @Param('organization_code') organization,
    @Body() body: any,
  ) {
    try {
      let data = await this.chatService.getMessageList(
        +organization,
        token,
        body,
      );
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
  @Post('update-message')
  async updateMessage(
    @GetToken() token: UserToken,
    @Res() res: Response,
    @Param('organization_code') organization,
    @Body() body: any,
  ) {
    try {
      let data = await this.chatService.updateMessage(
        +organization,
        token,
        body,
      );
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
  @Post('delete-message')
  async deleteMessage(
    @GetToken() token: UserToken,
    @Res() res: Response,
    @Param('organization_code') organization,
    @Body() body: any,
  ) {
    try {
      let data = await this.chatService.deleteMessage(
        +organization,
        token,
        body,
      );
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }

  // @Post('add-room-members')
  // async addRoomMembers(@Res() res: Response, @Body() body: any) {
  //   try {
  //     let data = {}; //await this.chatService.addRoomMembers(body);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = await this.sservice.processError(
  //       err,
  //       this.constructor.name,
  //     );
  //     return res.status(code).json(response);
  //   }
  // }

  // @Post('remove-room-member')
  // async removeRoomMember(@Res() res: Response, @Body() body: any) {
  //   try {
  //     let data = {}; // await this.chatService.removeRoomMember(body);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = await this.sservice.processError(
  //       err,
  //       this.constructor.name,
  //     );
  //     return res.status(code).json(response);
  //   }
  // }

  @Delete('delete-room/:id')
  async deleteRoom(
    @Res() res: Response,
    @Param('organization_code') organization,
    @Param('id') id: string,
  ) {
    try {
      let data = await this.chatService.removeRoom(+organization, id);
      return res.json(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }
}
