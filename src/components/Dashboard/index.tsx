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
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { RoomProps } from '@/types/Room';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeRooms, setActiveRooms] = useState<RoomProps[]>([]);

  const { createNewRoom } = useCreateRoom();
  const { disconnectUser, isAuthenticated } = useAuth();

  const handleClick = () => createNewRoom();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/' });
    }

    const fetchUserRooms = async () => {
      try {
        const userRef = doc(db, 'users', 'eIcUdPdmqxWKfYFLYM1C1ccWux22');
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const roomRefs = userData.rooms || [];

          const roomDataList = await Promise.all(
            roomRefs.map((roomRef) => getDoc(roomRef))
          );

          // const allRooms = roomDataList.map((roomSnap) => ({
          //   id: roomSnap.id,
          //   ...roomSnap.data()
          // }));

          console.log(roomDataList);

          setActiveRooms([]);
        }
      } catch (err) {
        console.error('Error fetching user rooms:', err);
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
          {activeRooms.map((room) => (
            <ActiveRoom roomData={room} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
