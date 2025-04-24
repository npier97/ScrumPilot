import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { DoorOpenIcon, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import OnBoarding from './OnBoarding';
import { useTranslation } from 'react-i18next';
import { useCreateRoom } from '@/hooks/useCreateRoom';
import ActiveRoom from './ActiveRoom';
import DashSidebar from './Sidebar';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from '@/firebase-config';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>('');
  const [activeRooms, setActiveRooms] = useState<DocumentData[]>([]);

  const { createNewRoom } = useCreateRoom();
  const { disconnectUser, isAuthenticated } = useAuth();

  const handleClick = () => createNewRoom();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/' });
    }

    const fetchUserRooms = async () => {
      try {
        const queryUserRooms = query(
          collection(db, 'rooms'),
          where('createdBy', '==', user?.uid)
        );
        const querySnapshot = await getDocs(queryUserRooms);
        const createdRooms = querySnapshot.docs.map((doc) => doc.data());

        setActiveRooms(createdRooms);
      } catch (err) {
        console.error('Error fetching user rooms:', err);
        setError(t('dashboard.noRoomsError'));
      }
    };

    fetchUserRooms();
  }, [isAuthenticated, navigate]);

  return (
    <>
      <OnBoarding />
      <DashSidebar />
      <div className='p-4 w-full flex flex-col'>
        <section className='mt-4'>
          <div className='flex justify-between'>
            <h1>{t('dashboard.welcome')}</h1>
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
          <div className='grid gap-2 grid-cols-1 sm:flex sm:flex-wrap'>
            {activeRooms.length !== 0 ? (
              activeRooms.map((room, index) => (
                <ActiveRoom key={`${room.name}-${index}`} roomData={room} />
              ))
            ) : (
              <p className={`pt-2 ${error && 'text-red-600'}`}>
                {error || t('dashboard.noRoomsCreated')}
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
