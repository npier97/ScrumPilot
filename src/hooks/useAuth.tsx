import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from '@/firebase-config';
import { useNavigate } from '@tanstack/react-router';
import { LoginForm } from '../../zod.schemas';

export const useAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const connectUser = async ({ email, password }: LoginForm) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // TODO: all connexion logic
          const { user } = userCredential;
          // FIXME: temporary return
          return { success: true, user };
          // navigate({ to: '/' });
        }
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Une erreur est survenue';
      return { success: false, message: errorMessage };
    }
  };

  return { connectUser };
};
