import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../../services/firestore.service';
import { QuizScore } from './quiz.interface';

@Injectable()
export class QuizService {
  constructor(private firestoreService: FirestoreService) {}
  private quizScoreRef = this.firestoreService.quizScoreCollection();

  async postUserScore(data: QuizScore) {
    await this.quizScoreRef.add(data);
  }

  async getUserScore(userId: string) {
    const res = await this.quizScoreRef.where('userId', '==', userId).get();
    const score = res.docs.map((score) => ({ id: score.id, ...score.data() }));

    return { score };
  }
}
