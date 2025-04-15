import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from '@/firebase-config';
// import { useNavigate } from '@tanstack/react-router';
import { LoginFormType } from '../../zod.schemas';

export const useAuth = () => {
  // const navigate = useNavigate();
  const auth = getAuth(app);

  const connectUser = async ({ email, password }: LoginFormType) => {
    try {
      // TODO: all connexion logic
      const login = await signInWithEmailAndPassword(auth, email, password);

      // FIXME: temporary return
      if (login?.user) {
        console.log(login.user);
        return { success: true, message: 'user connected' };
      }
      //     // navigate({ to: '/' });
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: 'Invalid credentials' };
      }
    }
  };

  return { connectUser };
};
