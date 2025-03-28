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

const RoomPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname.includes('rooms') ? 'rooms' : 'join';
  const { roomId } = useParams({ from: `/${path}/$roomId` });
  const [room, setRoom] = useState<RoomType>(null);
  const [isModalVisible, setModalVisibility] = useState(true);

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
      <div className='pt-40 flex justify-center'>
        {room ? (
          <div className='flex flex-col items-center gap-2'>
            <h1>
              {t('room.welcome')} {roomId}!
            </h1>
            <p>
              {room.members.map((member) => (
                <span key={`${member}`}>{member}</span>
              ))}{' '}
              {t('room.joined')}
            </p>
            <Button className='cursor-pointer' onClick={handleInviteOnClick}>
              {t('room.invite')}
            </Button>
            {/* TODO: toaster translation */}
            <Toaster />
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
