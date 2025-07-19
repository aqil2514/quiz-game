import { Injectable } from '@nestjs/common';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private serviceAccount: ServiceAccount = {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
  };

  private app =
    getApps().length === 0
      ? initializeApp({
          credential: cert(this.serviceAccount),
        })
      : getApps()[0];

  public db = getFirestore(this.app);

  userCollection() {
    return this.db.collection('user');
  }
}
