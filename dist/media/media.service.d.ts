import { Model } from 'mongoose';
import { IMediaModel } from './schema/media.schema';
export declare class MediaService {
    private mediaModel;
    constructor(mediaModel: Model<IMediaModel>);
    uploadMedia(body: any, organization_code: any): Promise<IMediaModel>;
    removeMedia(body: any, organization_code: any): Promise<{
        status: string;
        message: string;
    }>;
}
