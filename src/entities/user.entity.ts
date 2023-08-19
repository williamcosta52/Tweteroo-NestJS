export class User {
  private username: string;
  private avatar: string;

  constructor(username: string, avatar: string) {
    this.username = username;
    this.avatar = avatar;
  }
  getUserName(): string {
    return this.username;
  }
  getAvatar(): string {
    return this.avatar;
  }
}
export class Tweet {
  private username: string;
  private avatar: string;
  private tweet: string;

  constructor(username: string, avatar: string, tweet: string) {
    this.username = username;
    this.avatar = avatar;
    this.tweet = tweet;
  }
  getUsername() {
    return this.username;
  }
}
