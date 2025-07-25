import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { QuizQuestion, QuizScore } from './quiz.interface';
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

  @Get('/question/:id')
  async getQuestionById(@Param() params: { id: string }) {
    const { id } = params;

    return await this.quizService.getQuestionById(id);
  }

  @Get('/question/category/:category')
  async getQuestionsByCategory(@Param() params: { category: string }) {
    if (params.category === 'all')
      return await this.quizService.getAllQuestions();
    return await this.quizService.getQuestionsByCategory(params.category);
  }

  @Post('/question')
  async createNewQuestion(@Body() body: QuizQuestion) {
    return await this.quizService.createNewQuestion(body);
  }

  @Put('/question')
  async editQuestion(@Body() body: QuizQuestion) {
    return await this.quizService.editQuizQuestion(body);
  }

  @Delete('/question')
  async deleteQuestion(@Query() query: { id: string }) {
    const { id } = query;

    return await this.quizService.deleteQuizQuestion(id);
  }

  @Get('/all-categories')
  async getAllCategories() {
    return await this.quizService.getAllCategory();
  }

  
}
