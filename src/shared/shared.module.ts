import { Module, Global } from '@nestjs/common';
import { SharedService } from './shared.service';
// import { LoggerModule } from 'src/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SequenceSchema } from './schema/sequence.schema';
@Global()
@Module({
  imports: [
    // LoggerModule,
    MongooseModule.forFeature([{ name: 'sequence', schema: SequenceSchema }]),
  ],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
