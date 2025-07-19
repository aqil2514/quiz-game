import { ConflictException, Injectable } from '@nestjs/common';
import { FirestoreService } from '../../services/firestore.service';
import { User, UserFormData } from './user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private firestoreService: FirestoreService) {}
  // Private Variables & Methods

  private userRef = this.firestoreService.userCollection();

  private async hashPassword(rawPassword: string) {
    const saltOrRounds = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(rawPassword, saltOrRounds);

    return hash;
  }

  private async isDupplicateUsername(clientUsername: string) {
    const users = await this.getAllUsers();
    const username = users.find(
      (user) =>
        user.username.toLowerCase().trim() ===
        clientUsername.toLowerCase().trim(),
    );
    if (username) return true;
    return false;
  }

  private async isDupplicateEmail(clientEmail: string) {
    const users = await this.getAllUsers();
    const email = users.find(
      (user) =>
        user.email.toLowerCase().trim() === clientEmail.toLowerCase().trim(),
    );
    if (email) return true;
    return false;
  }

  // Public Variables

  async createNewUSer(formData: UserFormData) {
    const { username, email, password } = formData;
    const [isDupplicateEmail, isDupplicateUsername] = await Promise.all([
      this.isDupplicateEmail(email),
      this.isDupplicateUsername(username),
    ]);

    if (isDupplicateUsername) {
      throw new ConflictException('Username sudah digunakan');
    }

    if (isDupplicateEmail) {
      throw new ConflictException('Email sudah digunakan');
    }

    const hashedPassword = await this.hashPassword(password);

    const data: User = {
      username,
      hashedPassword,
      email,
      roles: ['user'],
    };
    await this.userRef.add(data);
    return { message: 'User berhasil dibuat' };
  }

  async getAllUsers() {
    const res = await this.userRef.get();
    const users: User[] = res.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as User,
    );
    return users;
  }
}
