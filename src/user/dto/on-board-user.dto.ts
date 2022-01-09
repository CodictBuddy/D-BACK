import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  IsOptional,
  ValidateIf,
} from "class-validator";
export class OnBoardUserDTO {
  @IsOptional()
  @IsString()
  temp_password: string;

  @IsOptional()
  @IsString()
  user_email: string;

  @ValidateIf((o) => o.temp_password)
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  condfirm_password: string;
}
