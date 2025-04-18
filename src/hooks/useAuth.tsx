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

export const useAuth = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const connectUser = async ({ email, password }: AuthFormSchemaType) => {
    try {
      // TODO: all connexion logic
      const login = await signInWithEmailAndPassword(auth, email, password);

      // FIXME: temporary return
      if (login?.user) {
        console.log(login.user);
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
          return { success: true, message: 'new user created successfully' };
        }
      } else throw new Error('missing credentials');
    } catch (error) {
      if (error instanceof Error) {
        let parsedMessage: string | null = null;

        switch (true) {
          case error.message.includes('auth/email-already-in-use'):
            parsedMessage = t('forms.errors.alreadyInUse');
            break;
          default:
            parsedMessage = t('forms.errors.error');
            break;
        }
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
  const getUser = () => user || null;
  return { connectUser, createUser, signOutUser, getUser };
};
