import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from '@/firebase-config';
// import { useNavigate } from '@tanstack/react-router';
import { LoginForm } from '../../zod.schemas';

export const useAuth = () => {
  // const navigate = useNavigate();
  const auth = getAuth(app);

  const connectUser = async ({ email, password }: LoginForm) => {
    try {
      // TODO: all connexion logic
      const login = await signInWithEmailAndPassword(auth, email, password);

      // FIXME: temporary return
      if (login?.user) {
        console.log(login.user);
        return { success: true, message: 'user connected' };
      }
      //     // navigate({ to: '/' });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Une erreur est survenue';
      return { success: false, message: errorMessage };
    }
  };

  return { connectUser };
};
