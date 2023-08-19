import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { createUserDTO, newTweet } from './dtos/user.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sign-up')
  signUp(@Body() body: createUserDTO, @Res() res: Response) {
    const createdUser = this.appService.createUser(body);
    res.status(HttpStatus.OK).send(createdUser);
  }
  @Post('tweets')
  createTweet(@Body() body: newTweet, @Res() res: Response) {
    this.appService.verifyUser(body);
    res.sendStatus(HttpStatus.CREATED);
  }
}
