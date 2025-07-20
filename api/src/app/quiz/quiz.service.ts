import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../../services/firestore.service';
import { QuizCategories, QuizQuestion, QuizScore } from './quiz.interface';

@Injectable()
export class QuizService {
  constructor(private firestoreService: FirestoreService) {}
  private quizScoreRef = this.firestoreService.quizScoreCollection();
  private quizQuestionRef = this.firestoreService.quisQuestionsCollection();
  private quizCategoriesRef = this.firestoreService.quizCategories();

  private async createNewCategory(data: QuizCategories) {
    await this.quizCategoriesRef.add(data);
  }
  private async getQuizCategoryByName(categoryName: string) {
    const snapshot = await this.quizCategoriesRef
      .where('name', '==', categoryName)
      .limit(1)
      .get();

    if (snapshot.empty) return undefined;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as QuizCategories;
  }

  async postUserScore(data: QuizScore) {
    await this.quizScoreRef.add(data);
  }

  async getUserScore(userId: string) {
    const res = await this.quizScoreRef.where('userId', '==', userId).get();
    const score = res.docs.map((score) => ({ id: score.id, ...score.data() }));

    return { score };
  }

  async createNewQuestion(data: QuizQuestion) {
    const isAvailableCategory = await this.getQuizCategoryByName(data.category);

    if (!isAvailableCategory) {
      await this.createNewCategory({
        name: data.category,
        createdAt: new Date().toISOString(),
        isActive: true,
      });
    }

    await this.quizQuestionRef.add(data);
  }

  async getAllCategory() {
    const snapshot = await this.quizCategoriesRef.get();
    const categories = snapshot.docs.map(
      (category) => ({ id: category.id, ...category.data() }) as QuizCategories,
    );

    return categories;
  }

  async getQuestionsByCategory(categoryName: string) {
    const snapshot = await this.quizQuestionRef
      .where('category', '==', categoryName)
      .get();
    const questions = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as QuizQuestion,
    );

    return questions;
  }
}
