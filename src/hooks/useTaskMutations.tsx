import { db } from '@/firebase-config';
import {
  useCurrentSidebar,
  useRoomStore,
  useTaskStore,
  useUsersCardsStore
} from '@/store';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  writeBatch
} from 'firebase/firestore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

type UpdateTaskParams = {
  title: string;
  description: string;
  storyPoints: string;
};

export const useTaskMutations = () => {
  const { t } = useTranslation();
  const roomId = useRoomStore((state) => state.roomUid);
  const taskUid = useTaskStore((state) => state.taskUid);
  const setTaskUid = useTaskStore((state) => state.setTaskUid);
  const setIsCardRevealed = useUsersCardsStore((state) => state.setIsRevealed);
  const { openRoomSidebar, closeSidebar } = useCurrentSidebar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateTask = async ({
    title,
    description,
    storyPoints
  }: UpdateTaskParams) => {
    if (!roomId || !taskUid) return;

    setIsSubmitting(true);

    try {
      await updateDoc(doc(db, 'rooms', roomId, 'tasks', taskUid), {
        title,
        description,
        storyPoints
      });
      toast.success(t('room.sidebar.task.success'));
      closeSidebar();
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error(t('room.sidebar.task.updateError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTask = async () => {
    if (!roomId || !taskUid) return;

    setIsDeleting(true);

    try {
      const batch = writeBatch(db);
      const participantsRef = collection(db, 'rooms', roomId, 'participants');
      const participantsSnapshot = await getDocs(participantsRef);

      batch.delete(doc(db, 'rooms', roomId, 'tasks', taskUid));
      batch.update(doc(db, 'rooms', roomId), {
        isVoteRevealed: false
      });

      participantsSnapshot.forEach((participantDoc) => {
        batch.update(participantDoc.ref, { vote: null });
      });

      await batch.commit();

      setIsCardRevealed(false);
      setTaskUid('');
      toast.success(t('room.sidebar.task.deleteSuccess'));
      openRoomSidebar();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error(t('room.sidebar.task.deleteError'));
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    updateTask,
    deleteTask,
    isSubmitting,
    isDeleting
  };
};
