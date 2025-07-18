import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { ServiceAccount } from "firebase-admin";

const serviceAccount: ServiceAccount = {
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
  privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  projectId: process.env.FIREBASE_PROJECT_ID as string,
};

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApps()[0];

const db = getFirestore(app);

const userCollection = db.collection("user");

export { db, userCollection };
