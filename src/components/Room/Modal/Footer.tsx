import { ModalFooterProps, RoomType } from '@/types/Room';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import LanguageDropdown from '@/components/LanguageDropdown';
import { useState } from 'react';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useParticipantStore } from '@/store';
import { db } from '@/firebase-config';
import { useTranslation } from 'react-i18next';

const Footer = ({
  isAdmin,
  adminUserUid,
  room,
  roomUid,
  roomName,
  participantName,
  setModalVisibility
}: ModalFooterProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const setParticipantId = useParticipantStore(
    (state) => state.setParticipantUid
  );

  const handleJoinRoom = async (room: RoomType, newParticipantName: string) => {
    if (!room) return;
    if (isAdmin && !roomName.trim()) {
      setError(t('room.modal.error.roomName'));
      return;
    }
    if (!newParticipantName.trim()) {
      setError(t('room.modal.error.username'));
      return;
    }
    setError('');

    const roomRef = doc(db, 'rooms', roomUid);
    const adminRef = doc(db, 'rooms', roomRef.id, 'participants', adminUserUid);

    if (isAdmin) {
      await updateDoc(roomRef, {
        uid: roomUid,
        name: roomName
      });
      await setDoc(adminRef, {
        uid: adminUserUid,
        avatar: '',
        name: newParticipantName,
        vote: null
      });
      setParticipantId(adminUserUid);
    }
    if (!isAdmin) {
      const participantRef = await addDoc(
        collection(db, 'rooms', roomUid, 'participants'),
        {
          avatar: '',
          name: newParticipantName,
          vote: null
        }
      );
      setParticipantId(participantRef.id);
    }
    setModalVisibility(false);
  };

  return (
    <>
      <DialogFooter>
        {error && (
          <p className='text-xs text-center text-destructive'>{error}</p>
        )}
        <div className='flex'>
          <Button
            type='submit'
            onClick={() => handleJoinRoom(room, participantName)}
          >
            {t('room.modal.save')}
          </Button>
          <LanguageDropdown />
        </div>
      </DialogFooter>
    </>
  );
};

export default Footer;
