import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from '@/firebase-config';
import { AuthFormSchemaType } from '../../zod.schemas';
import { t } from 'i18next';
import { useState, useEffect } from 'react';
import { db } from '@/firebase-config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const useAuth = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // keep sync user auth instance with user db critical datas
        const { uid, email } = currentUser;
        const userDoc = doc(db, 'users', uid);
        await setDoc(
          userDoc,
          {
            email,
            uid,
            lastUpdateTime: serverTimestamp()
          },
          { merge: true }
        );
      }
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const connectUser = async ({ email, password }: AuthFormSchemaType) => {
    try {
      const login = await signInWithEmailAndPassword(auth, email, password);
      if (login?.user) {
        return { success: true, message: 'user connected' };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: 'Invalid credentials' };
      }
    }
  };

  const createUser = async ({ email, password }: AuthFormSchemaType) => {
    try {
      if (email && password) {
        const create = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (create.user) {
          const { uid, email } = create.user;
          const newUserDoc = doc(db, 'users', uid);
          await setDoc(newUserDoc, {
            email,
            uid,
            createdAt: serverTimestamp(),
            rooms: []
          });
          return { success: true, message: 'new user created successfully' };
        } else throw Error(`${create.operationType} failed`);
      } else throw new Error('missing credentials');
    } catch (error) {
      if (error instanceof Error) {
        const parsedMessage = error.message.includes(
          'auth/email-already-in-use'
        )
          ? t('forms.errors.alreadyInUse')
          : t('forms.errors.error');

        return { success: false, message: parsedMessage };
      }
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
    }
  };

  return {
    connectUser,
    createUser,
    signOutUser,
    user,
    isAuthenticated
  };
};
