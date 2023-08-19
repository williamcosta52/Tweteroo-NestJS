import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class createUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'All fields are required!' })
  avatar: string;
}
export class newTweet {
  @IsString({
    message: 'All fields are required!',
  })
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  username: string;

  @IsString({
    message: 'All fields are required!',
  })
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  tweet: string;
}
