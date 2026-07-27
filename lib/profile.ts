import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  provider: string;
  createdAt?: any;
}

export async function getUserProfile(uid: string) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as UserProfile;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
) {
  const docRef = doc(db, "users", uid);

  await updateDoc(docRef, data);
}

export async function createUserProfile(profile: UserProfile) {
  const docRef = doc(db, "users", profile.uid);

  await setDoc(docRef, {
    ...profile,
    createdAt: serverTimestamp(),
  });
}