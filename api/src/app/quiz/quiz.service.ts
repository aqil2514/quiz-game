import { Injectable, Logger } from '@nestjs/common';
import { FirestoreService } from '../../services/firestore.service';
import { QuizCategories, QuizQuestion, QuizScore } from './quiz.interface';

@Injectable()
export class QuizService {
  constructor(private firestoreService: FirestoreService) {}
  private logger = new Logger(QuizService.name);
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

  async deleteQuizQuestion(questId: string) {
    try {
      await this.quizQuestionRef.doc(questId).delete();
    } catch (error) {
      this.logger.error(`Gagal hapus soal`, error.stack);
      throw error;
    }
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

  async editQuizQuestion(data: QuizQuestion) {
    try {
      await this.quizQuestionRef.doc(data.id).update({ ...data });
    } catch (error) {
      this.logger.error('Terjadi error saat update data', error.stack);
      throw error;
    }
  }

  async postUserScore(data: QuizScore) {
    await this.quizScoreRef.add(data);
  }

  async getUserScore(userId: string) {
    const res = await this.quizScoreRef.where('userId', '==', userId).get();
    const score = res.docs.map((score) => ({ id: score.id, ...score.data() }));

    return { score };
  }

  async getAllCategory() {
    const snapshot = await this.quizCategoriesRef.get();
    const categories = snapshot.docs.map(
      (category) => ({ id: category.id, ...category.data() }) as QuizCategories,
    );

    return categories;
  }

  async getAllQuestions() {
    const snapshot = await this.quizQuestionRef.get();
    const questions = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as QuizQuestion,
    );

    return questions;
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

  async getQuestionById(id: string) {
    try {
      const snapshot = await this.quizQuestionRef.doc(id).get();
      const question: QuizQuestion = {
        id: snapshot.id,
        ...(snapshot.data() as QuizQuestion),
      };
      return question;
    } catch (error) {
      this.logger.error(
        'Terjadi kesalahan saat ambil data pertanyaan',
        error.stack,
      );
    }
  }
}
