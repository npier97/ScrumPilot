import { Button } from '@/components/ui/button';
import { Merge } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ActiveRoom = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  // const handleJoinRoom = () => navigate({ to: `/join/${roomNumber}` });

  return (
    <div className='p-6 text-center rounded-xl border shadow-lg'>
      <div>Room 1</div>
      <div>ads</div>
      <Button
        className='bg-blue-600 cursor-pointer hover:bg-blue-500 md:max-w-[300px]'
        // onClick={handleJoinRoom}
      >
        {t('subNavMessage2')}
        <Merge aria-hidden='true' />
      </Button>
    </div>
  );
};

export default ActiveRoom;
