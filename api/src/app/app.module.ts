import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FirestoreService } from '../services/firestore.service';
import { AuthModule } from './auth/auth.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), AuthModule, QuizModule],
  controllers: [AppController],
  providers: [AppService, UserService, FirestoreService],
})
export class AppModule {}
