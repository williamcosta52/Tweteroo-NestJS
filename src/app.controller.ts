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

  @Post('sign-up')
  signUp(@Body() body: createUserDTO, @Res() res: Response) {
    const createdUser = this.appService.createUser(body);
    res.status(HttpStatus.OK).send(createdUser);
  }
  @Post('tweets')
  createTweet(@Body() body: newTweet, @Res() res: Response) {
    const updatedTweets = this.appService.verifyUser(body);
    res.status(HttpStatus.CREATED).send(updatedTweets);
  }
  @Get('tweets')
  getTweets(@Query('page') page: number, @Res() res: Response) {
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
