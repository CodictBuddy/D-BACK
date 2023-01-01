"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'meanstackerr',
            api_key: '619575418734713',
            api_secret: 'MTVaIj1GNdH_ukOtNGrD11Nsb0Y',
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map