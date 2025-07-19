import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Module({
  exports: [FirestoreService],
  providers: [FirestoreService],
})
export class FirestoreModule {}
