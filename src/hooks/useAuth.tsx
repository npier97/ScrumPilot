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
import { doc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { useUserStore } from '@/store';
import { useStore } from 'zustand';

export const useAuth = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const checkoutUser = useStore(useUserStore, (state) => state.checkoutUser);
  const setUserInfos = useStore(useUserStore, (state) => state.setUserInfos);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // keep sync user auth instance with user db critical datas
        // note: fired only on login and logout
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

    // observes user in DB so datas stay up to date
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const unsub = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserInfos(userData);
        } else {
          console.error('No user document found');
          checkoutUser();
        }
      });
      return () => unsub();
    } else {
      checkoutUser();
    }
    return () => {
      unsubscribe();
    };
  }, [auth, user]);

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
            rooms: [],
            isNewUser: true
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
      checkoutUser();
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
