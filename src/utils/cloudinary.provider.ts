import { v2 } from 'cloudinary';
// import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'meanstackerr',
      api_key: '619575418734713',
      api_secret: 'MTVaIj1GNdH_ukOtNGrD11Nsb0Y',
      // cloud_name: process.env.Cloud_name,
      // api_key: process.env.API_Key,
      // api_secret: process.env.API_Secret,
    });
  },
};
