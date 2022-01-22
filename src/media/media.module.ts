import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaService } from './media.service';
import { mediaSchema } from './schema/media.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'media', schema: mediaSchema }]),
  ],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
