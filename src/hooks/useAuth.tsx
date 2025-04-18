import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from '@/firebase-config';
// import { useNavigate } from '@tanstack/react-router';
import { AuthFormSchemaType } from '../../zod.schemas';
import { t } from 'i18next';

export const useAuth = () => {
  // const navigate = useNavigate();
  const auth = getAuth(app);

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

  return { connectUser, createUser };
};
