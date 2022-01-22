import { Module } from '@nestjs/common';
import { MediaModule } from 'src/media/media.module';
import { SharedModule } from 'src/shared/shared.module';
import { CloudinaryProvider } from './cloudinary.provider';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';

@Module({
  imports: [MediaModule, SharedModule],
  controllers: [UtilsController],
  providers: [CloudinaryProvider, UtilsService],
})
export class UtilsModule {}
