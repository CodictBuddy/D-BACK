import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class UtilsService {
    uploadImage(file: any): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteFile(public_id: string): Promise<unknown>;
    sendinblue(sendSmtpEmail: any): Promise<void>;
}
