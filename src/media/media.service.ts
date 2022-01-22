import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMediaModel } from './schema/media.schema';

@Injectable()
export class MediaService {
  constructor(@InjectModel('media') private mediaModel: Model<IMediaModel>) {}

  async uploadMedia(body, organization_code) {
    const fv = {
      organization_code,
      public_id: body.public_id,
      user_id: body._id,
      url: body.secure_url,
      type: body.type,
      created_by: body._id,
    };

    return await this.mediaModel.create(fv);
  }

  async removeMedia(body, organization_code) {
    const data = await this.mediaModel.deleteOne({
      public_id: body.public_id,
      organization_code,
      user_id:body._id
    });
    if (data) {
      return { status: 'success', message: 'record removed successfully' };
    }
  }
}
