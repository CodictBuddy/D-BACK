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

  async getConnectionList(
    organization_code,
    token,
    connection_status,
    type,
    view_type,
  ) {
    /**
   * 1. if status is Accepted : either you accepted or he/she accepted
   * 
   * 2.if status is Rejected : either you rejected or he/she rejected -we won't be using 
   * because we'll be removing record from collection
   * 
   * 3.if status is blocked : only you have blocked
   * 
   * 4.if status is pending : either you sent req is pending or you recieved request is pending
   * 
   * statuses available :
   *  connection_status: {
      type: String,
      default: 'Pending',
      example: 'Accepted/Rejected/Blocked',
      }

    other info 
    type: { type: String, example: 'connection /following /block' },
    user_id: { type: obj_id, ref: 'user' },
    target_user_id: { type: obj_id, ref: 'user' }
  */
    const filterObject = { organization_code, connection_status, type };
    let populateString = '';
    if (connection_status === 'Blocked') {
      filterObject['target_user_id'] = token.id;
      populateString = 'user_id';
    } else if (connection_status === 'Pending') {
      if (view_type === 1) {
        filterObject['target_user_id'] = token.id;
        populateString = 'user_id';
      } else if (view_type === 0) {
        filterObject['user_id'] = token.id;
        populateString = 'target_user_id';
      }
    } else if (connection_status === 'Accepted') {
      filterObject['$or'] = [
        { user_id: token.id },
        { target_user_id: token.id },
      ];
    }
    const connections = await this.connModel.find(filterObject);
    // .select({
    //   first_name: 1,
    //   last_name: 1,
    //   user_email: 1,
    //   user_headline: 1,
    //   user_profile_image: 1,
    // })
    // .populate('user_profile_image', {
    //   url: 1,
    //   type: 1,
    // });

    return { connections };
  }
}
