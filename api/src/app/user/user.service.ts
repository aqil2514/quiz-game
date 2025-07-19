import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  private async isDupplicateEmail(clientEmail: string) {
    const snapshot = await this.userRef
      .where('email', '==', clientEmail.toLowerCase().trim())
      .get();
    return !snapshot.empty;
  }

  private async isDupplicateUsername(clientUsername: string) {
    // Kalo ga ada username, berarti user login via Oauth. Lengkapinnya di Dashboard nanti
    if (!clientUsername) return false;
    const snapshot = await this.userRef
      .where('username', '==', clientUsername.toLowerCase().trim())
      .get();
    return !snapshot.empty;
  }

  // Public Variables

  async createNewUser(formData: UserFormData) {
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

    // Password kosong kalau si pengguna pertama kali login dengan Oauth. Nanti akan diminta untuk melengkapi semuanya di halaman dashboard
    const hashedPassword = password ? await this.hashPassword(password) : '';

    const data: User = {
      username,
      hashedPassword,
      email,
      name: formData.username,
      roles: formData.roles ?? ['user'],
    };
    await this.userRef.add(data);
    return { message: 'User berhasil dibuat' };
  }

  async getAllUsers() {
    const res = await this.userRef.get();
    const users: User[] = res.docs.map(
      (doc) => ({ id: doc.id, userId: doc.id, ...doc.data() }) as User,
    );
    return users;
  }

  async getUserByEmail(email: string) {
    const snapshot = await this.userRef.where('email', '==', email).get();
    const data: User = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          userId: doc.id,
          ...doc.data(),
        }) as User,
    )[0];

    if (!data) throw new NotFoundException('Akun tidak ditemukan');

    return data;
  }

  async getUserByUsername(username: string) {
    const snapshot = await this.userRef.where('username', '==', username).get();
    const data: User = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          userId: doc.id,
          ...doc.data(),
        }) as User,
    )[0];

    if (!data) throw new NotFoundException('Akun tidak ditemukan');

    return data;
  }
}
