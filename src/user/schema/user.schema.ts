import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
// import { IMedia } from 'src/media/schema/media.schema';

export interface ILanguageModel {
  description?: string;
  language?: string;
}

export const LanguageSchema = new mongoose.Schema({
  description: {
    type: String,
    description:
      'Description of the particular attribute in respective language',
  },
  language: {
    type: String,
    description:
      'Language code to represent description of the particular attribute',
  },
});

export interface IEmailModel {
  type?: string;
  email?: string;
  visibility?: string; //public, private, mutual
  addedOn?: string | Date;
  verification?: boolean;
  verifiedOn?: string | Date;
}
export const EmailSchema = new mongoose.Schema({
  type: {
    type: String,
    description: 'Types of the email',
    default: 'Primary',
  },
  email: {
    type: String,
    unique: [true, 'this email is already in use'],
    description: 'email id of the user',
  },
  visibility: {
    type: String,
    description: 'Privacy settings of email',
    default: 'Public',
  }, //public, private, mutual
  addedOn: {
    type: Date,
    default: new Date(),
    description: 'The date on which email was added',
  },
  verification: {
    type: Boolean,
    default: false,
    description: 'The date on which email was added',
  },
  verifiedOn: {
    type: Date,
    description: 'The date on which email was added',
  },
});

export interface IPhoneNumberModel {
  type?: string;
  country?: string;
  ext?: string;
  phone_number?: string;
  visibility?: string; //public, private, mutual
  addedOn?: string | Date;
  verification?: boolean;
  verifiedOn?: string | Date;
}
export const PhoneNumberSchema = new mongoose.Schema({
  type: {
    type: String,
    description: 'Types of the phone number',
  },
  country: {
    type: String,
    description: 'country of the user',
  },
  ext: {
    type: String,
    description: 'extension of phone number',
    example: '+91',
  },
  phone_number: {
    type: String,
    description: 'phone number of the user',
  },
  visibility: {
    type: String,
    description: 'Privacy settings of email',
    default: 'Public',
  }, //public, private, mutual
  addedOn: {
    type: Date,
    default: new Date(),
    description: 'The date on which email was added',
  },
  verification: {
    type: Boolean,
    default: false,
    description: 'The date on which email was added',
  },
  verifiedOn: {
    type: Date,
    description: 'The date on which email was added',
  },
});
export interface IAddressModel {
  type?: string;
  address_line_one?: string;
  address_line_two?: string;
  city?: string;
  state?: string;
  country?: string;
  visibility?: string;
  pincode?: string;
}
export const AddressSchema = new mongoose.Schema({
  type: {
    type: String,
    description: 'Types of the address',
  },
  address_line_one: {
    type: String,
    description: 'address of the user',
  },
  address_line_two: {
    type: String,
    description: 'address of the user',
  },
  city: {
    type: String,
    description: 'city of the user',
  },
  state: {
    type: String,
    description: 'state of the user',
  },
  country: {
    type: String,
    description: 'country of the user',
  },
  visibility: {
    type: String,
    description: 'Privacy settings of address',
    default: 'Public',
  }, //public, private, mutual
  pincode: {
    type: String,
    description: 'Privacy settings of address',
  },
});

export interface IPasswordHistoryModel {
  password?: string;
  updatedOn?: Date;
}

export const PasswordHistorySchema = new mongoose.Schema({
  password: {
    type: String,
    description:
      'The hashed string of the plain text password give by the user',
  },
  updatedOn: {
    type: Date,
    description: 'The password updated on by the user',
  },
});

export const MediaSchema = new mongoose.Schema({
  type: {
    type: String,
    description: 'Types of the media',
  },
  visibility: {
    type: String,
    description: 'Privacy settings of email',
    default: 'Public',
  }, //public, private, mutual
  media_id: {
    type: Schema.Types.ObjectId,
    ref: 'media',
  },
});

export interface IUserModel extends mongoose.Document {
  organization_code: Number;
  first_name?: ILanguageModel[];
  last_name?: ILanguageModel[];
  retry: number;
  code: number;

  user_profile_image?: string;
  user_background_image?: string;

  user_email?: any;
  user_role?: string;
  user_dob?: string;
  user_gender?: string;
  user_account_status?: string;
  user_account_verification?: boolean;
  user_password_history?: IPasswordHistoryModel[];
  user_password_secret?: number;
  user_password_secret_expires?: number;
  user_about?: ILanguageModel;
  user_headline?: ILanguageModel;
  // user_media?: IMedia[];

  password?: string;
  temp_password?: string;

  user_notification_token?: string;
}

export const UserSchema = new mongoose.Schema(
  {
    organization_code: { type: Number },
    first_name: [LanguageSchema],
    last_name: [LanguageSchema],
    code: { type: Number },
    retry: { type: Number, default: 0 },

    user_email: EmailSchema,

    user_profile_image: { type: String },
    user_background_image: { type: String },

    password: {
      type: String,
      description:
        'The hashed string of the plain text password give by the user',
    },
    temp_password: {
      type: String,
    },

    user_role: {
      type: Schema.Types.ObjectId,
      ref: 'role',
    },

    user_dob: {
      type: String,
    },
    user_gender: {
      type: String,
    },
    user_account_status: {
      type: String,
      default: 'Inactive',
      description: 'status of the user',
      example: 'Active , Inactive , Blocked',
    },
    user_account_verification: {
      type: Boolean,
      example: 'true/false',
    },
    user_password_history: [PasswordHistorySchema],
    user_about: LanguageSchema,
    user_headline: LanguageSchema,
    user_password_secret: {
      type: Number,
    },
    user_password_secret_expires: {
      type: Number,
    },
    created_by: { type: String },
    is_system: { type: Boolean },
   
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
    updated_by: {
      type: String,
    },
  
  },
  {
    collection: 'user',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

