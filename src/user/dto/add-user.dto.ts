import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsISO8601,
  IsObject,
  IsNotEmptyObject,
} from "class-validator";
import { Type } from "class-transformer";

export class AddUserDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Language)
  first_name: Language;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Language)
  @IsString()
  last_name: Language;

  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  user_designation: string;

  @IsOptional()
  user_department: string[];

  @IsOptional()
  user_groups: any;

  @IsNotEmpty()
  @IsString()
  user_location: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Email)
  user_email: Email;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Email)
  alternate_email: Email[];

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PhoneNumber)
  user_phone_number: PhoneNumber;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhoneNumber)
  alternate_phone_number: PhoneNumber[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Address)
  user_address: any;

  @IsNotEmpty()
  @IsString()
  user_role: string[];

  @IsNotEmpty()
  @IsString()
  user_dob: string;

  @IsNotEmpty()
  @IsString()
  user_gender: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Language)
  user_about: Language[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Media)
  user_media: Media[];

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
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class PhoneNumber {
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  ext: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;
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
  address_line_one: string;

  @IsOptional()
  @IsString()
  address_line_two: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  pincode: string;
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
