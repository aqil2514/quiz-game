import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirestoreService } from '../../services/firestore.service';

@Module({
  providers: [UserService, FirestoreService],
  controllers: [UserController]
})
export class UserModule {}
