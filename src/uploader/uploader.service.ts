// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// // import * as AWS from "aws-sdk";
// // import { CustomLogger } from 'src/logger/customlogger.service';

// @Injectable()
// export class UploaderService {
//   constructor(
//     private configService: ConfigService // private logger: CustomLogger,
//   ) {}
//   async UploadFile(file: any): Promise<BucketFile> {
//     try {
//       let uploaderACL = this.configService.get("UPLOADER_ACL");
//       let filename =
//         (Math.floor(Math.random() * 9999) + Date.now()).toString() +
//         file.originalname;
//       var s3bucket = new AWS.S3({
//         endpoint: `${this.configService.get("UPLOADER_ORIGIN")}/${uploaderACL}`,
//         accessKeyId: this.configService.get("UPLOADER_KEY"),
//         secretAccessKey: this.configService.get("UPLOADER_SECRET"),
//       });
//       let params = {
//         Bucket: this.configService.get("UPLOADER_BUCKET_NAME"),
//         ACL: uploaderACL,
//         Key: filename,
//         Body: file.buffer,
//       };
//       let uploadedImage = await s3bucket.upload(params).promise();
//       let fileLocation = uploadedImage.Location;
//       return {
//         type: file.mimetype,
//         name: file.originalname,
//         location: fileLocation,
//         key: uploadedImage.Key,
//         acl: uploaderACL,
//       };
//     } catch (err) {
//       // this.logger.error(err, { label: 'File Uploader' });
//       throw err;
//     }
//   }
// }

// export interface BucketFile {
//   type: string;
//   name: string;
//   location: string;
//   key: string;
//   acl: string;
// }
