import { UserService } from './../user/user.service';
import { AppException } from './../shared/app-exception';
import { socketGateway } from './../utils/socket/socket-gateway.service';
import { SharedService } from 'src/shared/shared.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INotificationModel } from './schema/notification.schema';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('notification')
    private notificationModel: Model<INotificationModel>,
    private userService: UserService,
    private sservice: SharedService,
    private socket: socketGateway,
  ) {}

  async create(organization_code, token, body) {
    const fv = {
      organization_code,
      user_id: token.id,
      target_user_id: body.user_id,
      type: body.notification_type,
      notification_message: body.notification_message,
      isRead: false,
      isNewNotification: true,
    };

    const ob = await this.notificationModel.create(fv);
    if (ob) {
      this.socket.catchNotification({ roomId: fv.target_user_id });
      await this.triggerPushNotifications(
        fv.notification_message,
        fv.target_user_id,
        fv.organization_code,
      );
    }
  }

  async update(organization_code, token, body) {
    const fv = {
      isRead: body.isRead,
    };
    const fo = this.sservice.processCondition(
      organization_code,
      token.id,
      body.user_id,
      body.notification_type,
    );
    return await this.notificationModel.findOneAndUpdate(
      { _id: body.notification_id, ...fo },
      fv,
    );
  }

  async remove(organization_code, token, body) {
    const fo = this.sservice.processfetchMyRecordsCondition(
      organization_code,
      token.id,
      body.notification_type,
    );
    return await this.notificationModel.findOneAndRemove({
      ...fo,
    });
  }

  async getList(organization_code, token) {
    const fo = this.sservice.processfetchMyRecordsCondition(
      organization_code,
      token.id,
    );
    const notifications = await this.notificationModel.find(fo);
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

    return { notifications };
  }

  async getUnreadList(organization_code, token) {
    const fo = this.sservice.processfetchMyRecordsCondition(
      organization_code,
      token.id,
    );
    const notifications = await this.notificationModel.find({
      ...fo,
      isRead: false,
      isNewNotification: true,
    });

    return { notifications, count: notifications.length };
  }

  async triggerPushNotifications(
    notification_message,
    toUserId,
    organization_code,
  ) {
    const userData = await this.userService.getUserById(
      toUserId,
      organization_code,
    );
    const options = {
      priority: 'high',
      timeToLive: 60 * 60 * 24,
    };

    const message = {
      notification: {
        title: 'You have a new notification',
        body: notification_message,
        sound: 'default',
        click_action: 'FCM_PLUGIN_ACTIVITY',
      },
    };

    const notificationToken = userData?.user?.user_notification_token;
    if (notificationToken) {
      console.log('notification', notificationToken);
      console.log('notification message tracker here', notification_message);
      console.log(
        'notification message type  tracker here',
        typeof notification_message,
      );
      await admin
        .messaging()
        .sendToDevice(notificationToken, message, options)
        .then(res => {
          console.log(
            'response m getting her for sent successfully notification',
            res,
          );
        })
        .catch(err => {
          console.log('err in push notification here', err);
          throw new AppException('failed to send notification', 403);
        });
    }
  }
}
