import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useCurrentSidebar } from '@/store';

const TaskInputs = () => {
  const { t } = useTranslation();
  const { openRoomSidebar } = useCurrentSidebar();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = () => {
    const taskData = { name, description, points };
    toast.success(t('room.sidebar.task.success'));
    console.log('Task update:', taskData);
  };

  return (
    <div className='p-4 flex flex-col gap-4'>
      <div>
        <label className='font-medium mb-1'>{t('Name')}</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=''
          maxLength={200}
        />
      </div>

      <div>
        <label className='font-medium mb-1'>{t('Description')}</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=''
          className='resize-none'
          maxLength={1000}
        />
      </div>

      <div>
        <label className='font-medium mb-1'>{t('Story Points')}</label>
        <Input
          type='number'
          value={points}
          maxLength={3}
          onChange={(e) => {
            if (e.target.value.length > e.target.maxLength) {
              e.target.value = e.target.value.slice(0, e.target.maxLength);
            }
            setPoints(e.target.value);
          }}
        />
      </div>

      <Button onClick={openRoomSidebar}>{t('room.sidebar.task.back')}</Button>
      <Button onClick={handleSubmit}>{t('room.sidebar.task.submit')}</Button>
    </div>
  );
};

export default TaskInputs;
