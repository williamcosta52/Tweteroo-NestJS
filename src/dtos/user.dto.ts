import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class createUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}
