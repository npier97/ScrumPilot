import { Button } from '@/components/ui/button';
import { ActiveRoomsProps } from '@/types/Dashboard';
import { useNavigate } from '@tanstack/react-router';
import { Merge } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RoomSettings from './RoomSettings';
import { useState } from 'react';

const ActiveRooms = ({ activeRooms, error }: ActiveRoomsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState<string | null>('');

  const handleJoinRoom = (uid: string) => navigate({ to: `/join/${uid}` });

  const handleToggleDropdown = (roomId: string) => {
    setActiveRoom(activeRoom === roomId ? null : roomId);
  };

  return (
    <section className='mt-8'>
      <h2 className='font-bold'>{t('dashboard.activeRooms.title')}</h2>
      <div className='grid gap-2 grid-cols-1 sm:flex sm:flex-wrap'>
        {activeRooms.length !== 0 ? (
          activeRooms.map((room, index) => (
            <div
              key={`${room.name}-${index}`}
              className='max-w-[250px] mt-4 p-6 rounded-xl border shadow-lg'
            >
              <div className='relative flex justify-between gap-2'>
                <h3 className='mb-4'>{room.name}</h3>
                <RoomSettings
                  roomId={room.uid}
                  activeRoom={activeRoom}
                  onToggle={handleToggleDropdown}
                />
              </div>
              <Button
                className='w-full px-20 bg-blue-600 cursor-pointer hover:bg-blue-500'
                onClick={() => handleJoinRoom(room.uid)}
              >
                {t('subNavMessage2')}
                <Merge aria-hidden='true' />
              </Button>
            </div>
          ))
        ) : (
          <p className={`pt-2 ${error && 'text-red-600'}`}>
            {error || t('dashboard.noRoomsCreated')}
          </p>
        )}
      </div>
    </section>
  );
};

export default ActiveRooms;
