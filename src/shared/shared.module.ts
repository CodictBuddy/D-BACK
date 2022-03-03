import { socketGateway } from './../utils/socket/socket-gateway.service';
import { UtilsService } from './../utils/utils.service';
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
  providers: [SharedService, UtilsService, socketGateway],
  exports: [SharedService, UtilsService, socketGateway],
})
export class SharedModule {}
