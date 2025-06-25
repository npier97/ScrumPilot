import { useNavigate } from '@tanstack/react-router';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useCreateRoom = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const createNewRoom = async () => {
    try {
      const guestUid = crypto.randomUUID();
      const roomRef = await addDoc(collection(db, 'rooms'), {
        name: 'New Room',
        createdBy: user?.uid || guestUid,
        createdAt: serverTimestamp(),
        isVoteRevealed: false
      });
      const tasksRef = collection(db, 'rooms', roomRef.id, 'tasks');

      if (user?.uid) {
        const userDoc = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const existingRooms = userSnapshot.data().rooms || [];

          const updatedRooms = [...existingRooms, roomRef.id];

          await updateDoc(userDoc, {
            rooms: updatedRooms
          });
        }
      }

      await addDoc(tasksRef, {
        title: '',
        description: '',
        storyPoint: 0
      });

      navigate({ to: `/rooms/${roomRef.id}` });
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('The room could not be created');
    }
  };

  return { createNewRoom };
};
