import { NotificationService } from './../notification/notification.service';
import { socketGateway } from './../utils/socket/socket-gateway.service';
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
    private socket: socketGateway,
    private notificationService: NotificationService,
  ) { }

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
    view_type  == 0 means i send  and 1 means i recieved
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
    } else if (view_type === 2 && connection_status === 'Accept') {
      filterObject['$or'] = [
        { user_id: token.id },
        { target_user_id: token.id },
      ];
      populateString = 'target_user_id user_id'
    }

   
    const connections = await this.connModel
      .find(filterObject)
      .populate({
        path: populateString,
        select: {
          url: 1,
          type: 1,
          first_name: 1,
          last_name: 1,
          user_headline: 1,
          user_profile_image: 1,
        },
        populate: {
          path: 'user_profile_image',
          model: 'media',
          select: {
            url: 1,
          },
        },
      })
      .select('-organization_code').lean()

    if (view_type === 2 && connection_status === 'Accept') {
      connections.forEach(el => {
        if (el.user_id['_id'].toString() == token.id.toString()) {
          el['connected_user'] = el.target_user_id
        } else if (el.target_user_id['_id'].toString() == token.id.toString()) {
          el['connected_user'] = el.user_id
        }
        el.user_id = el.user_id['_id']
        el.target_user_id = el.target_user_id['_id']
      })
    }

    return { connections };
  }

  async getDetail(organization_code, token, body) {
    const fo = this.sservice.processCondition(
      organization_code,
      token.id,
      body.user_id,
      body.connection_type,
    );

    return await this.connModel.findOne(fo);
  }

  async create(organization_code, token, body) {
    const fv = {
      organization_code,
      user_id: token.id,
      target_user_id: body.user_id,
      type: body.type,
    };

    const doc = await this.connModel.create(fv);
    if (doc) {
      const notificationObj = {
        user_id: body.user_id,
        notification_type: body.type,
        notification_title: body.notification_title,
        navigation_url: body.navigation_url,
        notification_message: body.message,
      };
      await this.notificationService.create(
        organization_code,
        token,
        notificationObj,
      );
    }
    return doc;
  }
  async update(organization_code, token, body) {
    const fo = this.sservice.processCondition(
      organization_code,
      token.id,
      body.user_id,
      body.connection_type,
    );
    const doc = await this.connModel.findOneAndUpdate(
      { _id: body.conn_id, ...fo },
      { connection_status: body.connection_status },
      { new: true },
    );
    if (doc) {
      const notificationObj = {
        user_id: body.user_id,
        notification_type: body.connection_type,
        notification_title: body.notification_title,
        notification_message: body.message,
        navigation_url: body.navigation_url,
      };
      await this.notificationService.create(
        organization_code,
        token,
        notificationObj,
      );
    }
    return doc;
  }

  async remove(organization_code, token, body) {
    const fo = this.sservice.processCondition(
      organization_code,
      token.id,
      body.user_id,
      body.connection_type,
    );

    return await this.connModel.findOneAndRemove({
      ...fo,
      type: body.connection_type,
    });
  }
}
