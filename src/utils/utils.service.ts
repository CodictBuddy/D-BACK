import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

// sendin blue
var SibApiV3Sdk = require('sib-api-v3-typescript');
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// Configure API key authorization: api-key
var apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey =
  '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';
// Configure API key authorization: partner-key
var partnerKey = apiInstance.authentications['partnerKey'];
partnerKey.apiKey =
  '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';

@Injectable()
export class UtilsService {
  async uploadImage(
    file, //: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteFile(public_id: string) {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(public_id, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async sendinblue(sendSmtpEmail) {
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function(data) {
        console.log('data for email', data);
        return true;
      },
      function(error) {
        console.error(error);
        return false;
      },
    );
  }
}
