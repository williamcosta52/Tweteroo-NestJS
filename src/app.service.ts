import { Injectable } from '@nestjs/common';
import { createUserDTO } from './dtos/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  private users: User[] = [];

  createUser(body: createUserDTO) {
    const user = new User(body.username, body.avatar);
    this.users.push(user);
    return user;
  }
}
