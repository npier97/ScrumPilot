import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { DoorOpenIcon, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import OnBoarding from './OnBoarding';
import { useTranslation } from 'react-i18next';
import { useCreateRoom } from '@/hooks/useCreateRoom';
import ActiveRoom from './ActiveRoom';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createNewRoom } = useCreateRoom();
  const { disconnectUser, isAuthenticated } = useAuth();

  const handleClick = () => createNewRoom();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/' });
    }

    // const roomRef = doc(db, 'users', user.uid, 'rooms');
  }, [isAuthenticated, navigate]);

  return (
    <>
      <OnBoarding />
      <Sidebar />
      <div className='p-4 w-full flex flex-col'>
        <section className='mt-4'>
          <div className='flex justify-between'>
            <h1>Welcome on your dashboard</h1>
            <Button onClick={() => disconnectUser()} variant='link'>
              {' '}
              signOut
              <DoorOpenIcon size={22} />
            </Button>
          </div>
          <Button
            className='bg-blue-600 hover:bg-blue-500 md:max-w-[300px]'
            aria-label={t('heroCTAMessage')}
            onClick={handleClick}
          >
            {t('heroCTAMessage')}
            <Plus aria-hidden='true' />
          </Button>
        </section>
        <section className='mt-8'>
          <h2>Your Active Rooms</h2>
          <ActiveRoom />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
