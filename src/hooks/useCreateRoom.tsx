import { useNavigate } from '@tanstack/react-router';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase-config';

export const useCreateRoom = () => {
  const navigate = useNavigate();

  const createNewRoom = async () => {
    try {
      const roomRef = await addDoc(collection(db, 'rooms'), {
        name: 'New Room',
        createdBy: '',
        createdAt: serverTimestamp(),
        revealVotes: false
      });
      navigate({ to: `/rooms/${roomRef.id}` });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return { createNewRoom };
};
