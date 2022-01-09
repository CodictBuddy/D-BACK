import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsISO8601,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Language)
  first_name: Language[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Language)
  last_name: Language[];

  @IsNotEmpty()
  designation: any;

  @IsNotEmpty()
  email: any;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Email)
  alternate_email: Email[];

  @IsNotEmpty()
  phone_number: any;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhoneNumber)
  alternate_phone_number: PhoneNumber[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: any;

  @IsNotEmpty()
  @IsString()
  roles: string[];

  @IsNotEmpty()
  @IsString()
  date_of_birth: string;

  @IsNotEmpty()
  gender: any;

  @IsOptional()
  @IsString()
  account_verification: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PasswordHistory)
  password_history: PasswordHistory[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Language)
  about: Language[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Media)
  media: Media[];

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class Language {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  language: string;
}

export class Email {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  visibility: string; //public, private, mutual

  @IsOptional()
  addedOn: any;

  @IsOptional()
  @IsBoolean()
  verification: boolean;

  @IsOptional()
  verifiedOn: any;
}

export class PhoneNumber {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  ext: string;

  @IsOptional()
  @IsString()
  phone_number: string;

  @IsOptional()
  @IsString()
  visibility: string; //public, private, mutual

  @IsOptional()
  addedOn: any;

  @IsOptional()
  @IsBoolean()
  verification: boolean;

  @IsOptional()
  verifiedOn: any;
}

export class Address {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  ext: string;

  @IsOptional()
  @IsString()
  phone_number: string;

  @IsOptional()
  @IsString()
  visibility: string; //public, private, mutual

  @IsOptional()
  addedOn: any;

  @IsOptional()
  @IsBoolean()
  verification: boolean;

  @IsOptional()
  verifiedOn: any;
}

export class PasswordHistory {
  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @IsISO8601()
  updatedOn: Date;
}

export class Media {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  visibility: string;

  @IsOptional()
  media_id: any;
}
