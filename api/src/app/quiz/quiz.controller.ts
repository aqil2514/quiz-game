import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { QuizScore } from './quiz.interface';
import { QuizService } from './quiz.service';
import { Request } from 'express';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('/score')
  async postUserScore(@Body() body: QuizScore) {
    return await this.quizService.postUserScore(body);
  }

  @Get('/score')
  async getUserScore(@Req() req: Request) {
    const { userId } = req.query;

    return await this.quizService.getUserScore(userId as string);
  }
}
