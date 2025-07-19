import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { FirestoreService } from '../../services/firestore.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService, FirestoreService]
})
export class QuizModule {}
