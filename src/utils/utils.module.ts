import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';

@Module({
  controllers: [UtilsController],
  providers: [CloudinaryProvider, UtilsService],
})
export class UtilsModule {}
