import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SharedService } from 'src/shared/shared.service';
import { UtilsService } from 'src/utils/utils.service';
import { IConnectionsModel } from './schema/connections.schema';

@Injectable()
export class ConnectionsService {

    constructor(
        @InjectModel('connections') private connModel: Model<IConnectionsModel>,
        private sservice: SharedService,
        private utilsService: UtilsService,
        private aservice: AuthService,
      ) {}

}
