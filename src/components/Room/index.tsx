import { db } from '@/firebase-config';
import { useLocation, useParams } from '@tanstack/react-router';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ParticipantsType, RoomProps, RoomType } from '@/types/Room';
import Modal from './Modal';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import UserCard from './UserCard';
import VotingPanel from './VotingPanel';
import { useCurrentSidebar, useRoomStore, useUsersCardsStore } from '@/store';
import RoomSidebar from './Sidebar';
import { useSidebar } from '../ui/sidebar';
import { PanelRight } from 'lucide-react';
import TaskSidebar from './Sidebar/Task/TaskSidebar';

const RoomPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname.includes('rooms') ? 'rooms' : 'join';
  const { roomId } = useParams({ from: `/${path}/$roomId` });
  const [room, setRoom] = useState<RoomType>(null);
  const [adminUserUid, setAdminUserUid] = useState<string>('');
  const [participants, setParticipants] = useState<ParticipantsType[]>([]);
  const setIsCardRevealed = useUsersCardsStore((state) => state.setIsRevealed);
  const setRoomUid = useRoomStore((state) => state.setRoomUid);
  const { toggleSidebar } = useSidebar();
  const { activeSidebar, toggleActiveSidebar } = useCurrentSidebar();

  const handleInviteOnClick = () => {
    const link = `${window.location.origin}/join/${roomId}`;
    navigator.clipboard.writeText(link);
    toast.success(t('room.copied'));
  };

  useEffect(() => {
    if (!roomId) return;

    const roomRef = doc(db, 'rooms', roomId);
    const participantsRef = collection(db, 'rooms', roomId, 'participants');

    const unsubscribeRoom = onSnapshot(roomRef, (roomSnap) => {
      if (roomSnap.exists()) {
        setRoom(roomSnap.data() as RoomProps);
        setIsCardRevealed(roomSnap.data().isVoteRevealed);
        setAdminUserUid(roomSnap.data().createdBy);
      }
    });

    const unsubscribeParticipants = onSnapshot(participantsRef, (snapshot) => {
      const updatedParticipants = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          uid: doc.id,
          name: data.name,
          avatar: data.avatar,
          vote: data.vote
        };
      });
      setParticipants(updatedParticipants);
    });

    setRoomUid(roomId);

    return () => {
      unsubscribeRoom();
      unsubscribeParticipants();
    };
  }, [roomId]);

  return (
    <>
      <div className='pt-20 pl-4 pb-4 flex justify-center m-auto'>
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
            <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
            <VotingPanel roomUid={roomId} />
            <UserCard participants={participants} />
          </div>
        ) : (
          <p>{t('room.loading')}</p>
        )}
      </div>
      <Modal
        path={path}
        room={room}
        participants={participants}
        roomUid={roomId}
        adminUserUid={adminUserUid}
      />
      <Button
        variant='ghost'
        onClick={() => {
          toggleActiveSidebar();
          toggleSidebar();
        }}
        className='flex flex-col items-center justify-center h-screen p-0'
      >
        <PanelRight />
        <span className='flex flex-col items-center leading-none text-xs'>
          {'TASKS'.split('').map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </span>
      </Button>
      {activeSidebar === 'task' ? <TaskSidebar /> : <RoomSidebar />}
    </>
  );
};

export default RoomPage;
