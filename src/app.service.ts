import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDTO, newTweet } from './dtos/user.dto';
import { User, Tweet } from './entities/user.entity';

@Injectable()
export class AppService {
  private users: User[] = [];
  private tweets: Tweet[] = [];

  health() {
    return "I'm okay!";
  }
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
    return foundUser;
  }
  createTweet(body: newTweet, user: User) {
    const tweet = new Tweet(body.username, body.tweet, user.getAvatar());
    this.tweets.push(tweet);
  }
  findTweets(startIndex: number, endIndex: number) {
    const tweets = this.tweets;
    if (!tweets) return [];
    const totalTweets = tweets.length;
    if (!startIndex && !endIndex) {
      return tweets.slice(totalTweets - 15, totalTweets);
    }
    const limitedTweets = tweets.slice(startIndex, endIndex);
    return limitedTweets;
  }
  findUserTweets(username: string) {
    const tweets = this.tweets.filter(
      (user) => user.getUsername() === username,
    );
    if (!tweets) return [];
    return tweets;
  }
}
