import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { UserInfos } from '@/types/User';

export const updateUserInDataBase = async (
  uid: string,
  updatedFields: Partial<UserInfos>
) => {
  try {
    if (uid && updatedFields) {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, updatedFields);
    } else
      throw new Error(
        'Unable to update user: missing user ID or update fields'
      );
  } catch (error) {
    console.log(error.message);
  }
};
