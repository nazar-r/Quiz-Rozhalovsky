import { QuizzesService } from './quizzes.service';
import { CreateQuizPipe } from '../src.validation.pipe/create-quiz.pipe';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzService: QuizzesService) {}

  @Get()
  getAllQuizzes() {
    return this.quizzService.findAllQuizzes();
  }

  @Post()
  postQuiz(@Body(new CreateQuizPipe()) body: any) {
    return this.quizzService.createQuiz(body);
  }

  @Get(':id')
  getQuiz(@Param('id') id: string) {
    return this.quizzService.findQuiz(id);
  }

  @Delete(':id')
  deleteQuiz(@Param('id') id: string) {
    return this.quizzService.removeQuiz(id);
  }
}