import { Button } from '@/components/ui/button';
import { Merge, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { useCreateRoom } from '@/hooks/useCreateRoom';
import { useNavigate } from '@tanstack/react-router';

const SubNav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');

  const { createNewRoom } = useCreateRoom();

  const handleCreateNewRoom = () => createNewRoom();
  const handleJoinRoom = () =>
    roomNumber && navigate({ to: `/join/${roomNumber}` });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`w-full px-6 pt-5 pb-4 sticky top-16 flex gap-2 items-center justify-between bg-gray-50  transition-transform duration-300 ${
        isScrolled ? 'translate-y-0 shadow-md' : '-translate-y-full'
      } duration-300 ease-in-out`}
    >
      <div className='flex gap-2'>
        <Input
          type='text'
          placeholder={t('subNavMessage1')}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
        <Button
          className='bg-blue-600 cursor-pointer hover:bg-blue-500 md:max-w-[300px]'
          onClick={handleJoinRoom}
        >
          {t('subNavMessage2')}
          <Merge aria-hidden='true' />
        </Button>
      </div>
      <Button
        className='bg-blue-600 cursor-pointer hover:bg-blue-500 md:max-w-[300px]'
        onClick={handleCreateNewRoom}
      >
        {t('heroCTAMessage')}
        <Plus aria-hidden='true' />
      </Button>
    </div>
  );
};

export default SubNav;
