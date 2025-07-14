import { db } from '@/firebase-config';
import { useLocation, useParams } from '@tanstack/react-router';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ParticipantsType, RoomProps, RoomType, TaskProps } from '@/types/Room';
import Modal from './Modal';
import { useCurrentSidebar, useRoomStore, useUsersCardsStore } from '@/store';
import RoomSidebar from './Sidebar';
import TaskSidebar from './Sidebar/Task/TaskSidebar';
import SidebarToggle from './Sidebar/SidebarToggle';
import RoomOverview from './RoomOverview';

const RoomPage = () => {
  const location = useLocation();
  const path = location.pathname.includes('rooms') ? 'rooms' : 'join';
  const { roomId } = useParams({ from: `/${path}/$roomId` });
  const [room, setRoom] = useState<RoomType>(null);
  const [adminUserUid, setAdminUserUid] = useState<string>('');
  const [participants, setParticipants] = useState<ParticipantsType[]>([]);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const setIsCardRevealed = useUsersCardsStore((state) => state.setIsRevealed);
  const setRoomUid = useRoomStore((state) => state.setRoomUid);
  const { activeSidebar } = useCurrentSidebar();

  useEffect(() => {
    if (!roomId) return;

    const roomRef = doc(db, 'rooms', roomId);
    const participantsRef = collection(db, 'rooms', roomId, 'participants');
    const tasksRef = collection(db, 'rooms', roomId, 'tasks');

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
      }) as ParticipantsType[];
      setParticipants(updatedParticipants);
    });

    const unsubscribeTasks = onSnapshot(tasksRef, (snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as TaskProps[];
      setTasks(updatedTasks);
    });

    setRoomUid(roomId);

    return () => {
      unsubscribeTasks();
      unsubscribeRoom();
      unsubscribeParticipants();
    };
  }, [roomId]);

  return (
    <>
      <RoomOverview room={room} participants={participants} />
      <Modal
        path={path}
        room={room}
        participants={participants}
        roomUid={roomId}
        adminUserUid={adminUserUid}
      />
      <SidebarToggle />
      {activeSidebar === 'task' ? (
        <TaskSidebar />
      ) : (
        <RoomSidebar tasks={tasks} />
      )}
    </>
  );
};

export default RoomPage;
