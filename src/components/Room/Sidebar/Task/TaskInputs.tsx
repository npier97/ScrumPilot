import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useCurrentSidebar, useRoomStore, useTaskStore } from '@/store';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { TaskProps } from '@/types/Room';
import TaskField from './TaskFields';

const TaskInputs = () => {
  const { t } = useTranslation();
  const roomId = useRoomStore((state) => state.roomUid);
  const taskUid = useTaskStore((state) => state.taskUid);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const { openRoomSidebar, closeSidebar } = useCurrentSidebar();

  const handleSubmit = async () => {
    await updateDoc(doc(db, 'rooms', roomId, 'tasks', taskUid), {
      title: name,
      description: description,
      storyPoints: points
    });
    toast.success(t('room.sidebar.task.success'));
    closeSidebar();
  };

  useEffect(() => {
    if (!roomId) return;

    const taskRef = doc(db, 'rooms', roomId, 'tasks', taskUid);
    const unsubscribeTask = onSnapshot(taskRef, (docSnap) => {
      if (docSnap.exists()) {
        const task = { id: docSnap.id, ...docSnap.data() } as TaskProps;

        setName(task.title);
        setDescription(task.description);
        setPoints(task.storyPoints);
      }
    });

    return () => {
      unsubscribeTask();
    };
  }, [roomId, taskUid]);

  return (
    <div className='p-4 flex flex-col gap-4'>
      <TaskField label={t('room.sidebar.task.name')}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={200}
          placeholder=''
        />
      </TaskField>
      <TaskField label={t('room.sidebar.task.description')}>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={1000}
          placeholder=''
          className='resize-none'
        />
      </TaskField>
      <TaskField label={t('room.sidebar.task.storyPoints')}>
        <Input
          type='number'
          value={points}
          maxLength={3}
          onChange={(e) => {
            const val = e.target.value.slice(0, e.target.maxLength);
            setPoints(val);
          }}
        />
      </TaskField>
      <Button onClick={openRoomSidebar}>{t('room.sidebar.task.back')}</Button>
      <Button type='submit' onClick={handleSubmit}>
        {t('room.sidebar.task.submit')}
      </Button>
    </div>
  );
};

export default TaskInputs;
