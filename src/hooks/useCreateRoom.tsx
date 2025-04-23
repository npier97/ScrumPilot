import { useNavigate } from '@tanstack/react-router';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { useAuth } from './useAuth';

export const useCreateRoom = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const createNewRoom = async () => {
    try {
      const roomRef = await addDoc(collection(db, 'rooms'), {
        name: 'New Room',
        createdBy: user?.displayName || '',
        createdAt: serverTimestamp(),
        isVoteRevealed: false
      });
      navigate({ to: `/rooms/${roomRef.id}` });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return { createNewRoom };
};
