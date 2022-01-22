import { SharedService } from 'src/shared/shared.service';
import { UtilsService } from './utils.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from 'src/media/media.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { UserToken } from 'src/user/dto/usertoken.dto';

@Controller(':organization_portal_name/utils')
export class UtilsController {
  constructor(
    private readonly utilsS: UtilsService,
    private readonly sservice: SharedService,
    private readonly mediaService: MediaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file,
    @GetToken() token: UserToken,
    @Res() res: any,
    @Param('organization_portal_name') organization_code,
  ) {
    try {
      const data = await this.utilsS.uploadImage(file);
      if (data) {
        const mediaData = await this.mediaService.uploadMedia(
          { ...data, _id: token.id, type: 'profile' },
          organization_code,
        );
        return res.json(mediaData);
      }
    } catch (e) {
      const { code, response } = this.sservice.processError(
        e,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('file')
  async deleteFile(
    @Body() body: { public_id: string },
    @Res() res: any,
    @GetToken() token: UserToken,
    @Param('organization_portal_name') organization_code,
  ) {
    try {
      const data = await this.utilsS.deleteFile(body.public_id);
      if (data) {
        const mediaData = await this.mediaService.removeMedia(
          { public_id: body.public_id, user_id: token.id },
          organization_code,
        );
        return res.json({ data, ...mediaData });
      }
    } catch (e) {
      const { code, response } = this.sservice.processError(
        e,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }
}
