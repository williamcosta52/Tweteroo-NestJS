import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { createUserDTO, newTweet } from './dtos/user.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  health() {
    return this.appService.health();
  }
  @Post('sign-up')
  signUp(@Body() body: createUserDTO, @Res() res: Response) {
    const createdUser = this.appService.createUser(body);
    res.status(HttpStatus.OK).send(createdUser);
  }
  @Post('tweets')
  createTweet(@Body() body: newTweet, @Res() res: Response) {
    const user = this.appService.verifyUser(body);
    const createTweet = this.appService.createTweet(body, user);
    res.status(HttpStatus.CREATED).send(createTweet);
  }
  @Get('tweets')
  getTweets(@Query('page') page: number, @Res() res: Response) {
    if (page <= 0) return res.sendStatus(HttpStatus.BAD_REQUEST);
    const tweetsPerPage = 15;
    const startIndex = (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;
    const tweets = this.appService.findTweets(startIndex, endIndex);
    res.status(HttpStatus.OK).send(tweets);
  }
  @Get('tweets/:username')
  getTweetsByUsername(@Param('username') username: string) {
    return this.appService.findUserTweets(username);
  }
}
