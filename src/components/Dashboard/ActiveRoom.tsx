import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { DocumentData } from 'firebase/firestore';
import { Merge } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ActiveRoom = ({ roomData }: { roomData: DocumentData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleJoinRoom = () => navigate({ to: `/join/${roomData.uid}` });

  return (
    <div className='p-6 text-center rounded-xl border shadow-lg'>
      <div>{roomData.name}</div>
      <Button
        className='bg-blue-600 cursor-pointer hover:bg-blue-500 md:max-w-[300px]'
        onClick={handleJoinRoom}
      >
        {t('subNavMessage2')}
        <Merge aria-hidden='true' />
      </Button>
    </div>
  );
};

export default ActiveRoom;
