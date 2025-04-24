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
    <div className='max-w-[250px] mt-4 p-6 rounded-xl border shadow-lg'>
      <h3 className='mb-4'>{roomData.name}</h3>
      <Button
        className='w-full px-20 bg-blue-600 cursor-pointer hover:bg-blue-500'
        onClick={handleJoinRoom}
      >
        {t('subNavMessage2')}
        <Merge aria-hidden='true' />
      </Button>
    </div>
  );
};

export default ActiveRoom;
