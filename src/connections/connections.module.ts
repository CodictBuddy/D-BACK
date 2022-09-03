import { NotificationModule } from './../notification/notification.module';
import { SharedModule } from './../shared/shared.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionsController } from './connections.controller';
import { ConnectionsService } from './connections.service';
import { connectionsSchema } from './schema/connections.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'connections', schema: connectionsSchema },
    ]),
    SharedModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule {}
