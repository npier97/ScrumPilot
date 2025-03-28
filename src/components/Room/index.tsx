import { db } from '@/firebase-config';
import { useLocation, useParams } from '@tanstack/react-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Room, RoomType } from '@/types/Room';
import Modal from './Modal';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import UsersCard from './UsersCard';
import Voting from './Voting';

const RoomPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname.includes('rooms') ? 'rooms' : 'join';
  const { roomId } = useParams({ from: `/${path}/$roomId` });
  const [room, setRoom] = useState<RoomType>(null);
  const [isModalVisible, setModalVisibility] = useState(false);

  const handleInviteOnClick = () => {
    const link = `${window.location.origin}/join/${roomId}`;
    navigator.clipboard.writeText(link);
    toast.success('Invite link copied to clipboard!');
  };

  useEffect(() => {
    if (!roomId) return;

    const roomRef = doc(db, 'rooms', roomId);
    const unsubscribe = onSnapshot(roomRef, (roomSnap) => {
      if (roomSnap.exists()) {
        setRoom(roomSnap.data() as Room);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  return (
    <>
      <div className='pt-20 flex justify-center'>
        {room ? (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col items-center gap-2'>
              <h1>
                {t('room.welcome')} {room.name}!
              </h1>
              <Button onClick={handleInviteOnClick}>{t('room.invite')}</Button>
              {/* TODO: toaster translation */}
              <Toaster />
            </div>
            <hr className='my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
            <Voting />
            <UsersCard members={room.members} />
          </div>
        ) : (
          <p>{t('room.loading')}</p>
        )}
      </div>
      {isModalVisible && (
        <Modal
          path={path}
          room={room}
          roomId={roomId}
          isOpen={isModalVisible}
          toggleVisibility={setModalVisibility}
        />
      )}
    </>
  );
};

export default RoomPage;
