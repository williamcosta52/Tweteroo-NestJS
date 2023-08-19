import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDTO, newTweet } from './dtos/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  private users: User[] = [];
  private tweets: newTweet[] = [];

  createUser(body: createUserDTO) {
    const user = new User(body.username, body.avatar);
    this.users.push(user);
    return user;
  }
  verifyUser(body: newTweet) {
    const foundUser = this.users.find(
      (user) => user.getUserName() === body.username,
    );
    if (!foundUser) {
      throw new UnauthorizedException(
        `User with username ${body.username} not found`,
      );
    }
    this.tweets.push(body);
    return this.tweets;
  }
}
