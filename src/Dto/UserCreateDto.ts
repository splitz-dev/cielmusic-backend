import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  nickname!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirmation!: string;

  @IsUrl()
  photo!: string;
}
