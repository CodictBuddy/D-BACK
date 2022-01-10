import { UtilsService } from './utils.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(':organization_portal_name/utils')
export class UtilsController {
  constructor(private readonly utilsS: UtilsService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file,
    @Res() res: any,
    @Param('organization_portal_name') organization_code,
  ) {
    try {
      const data = await this.utilsS.uploadImage(file);
      return res.json({ organization_code, data });
    } catch (e) {
      throw e;
    }
  }

  @Delete('file')
  async deleteFile(@Body() body: { public_id: string }, @Res() res: any) {
    try {
      const data = await this.utilsS.deleteFile(body.public_id);
      return res.json({ data });
    } catch (e) {
      throw e;
    }
  }
}
