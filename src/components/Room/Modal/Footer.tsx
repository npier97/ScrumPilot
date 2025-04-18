import { ModalFooterProps, RoomType } from '@/types/Room';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import LanguageDropdown from '@/components/LanguageDropdown';
import { useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useParticipantStore } from '@/store';
import { db } from '@/firebase-config';
import { useTranslation } from 'react-i18next';

const Footer = ({
  isAdmin,
  room,
  roomId,
  roomName,
  participantName,
  setModalVisibility
}: ModalFooterProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const setParticipantId = useParticipantStore(
    (state) => state.setParticipantId
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

    const roomRef = doc(db, 'rooms', roomId);

    if (isAdmin) {
      await updateDoc(roomRef, {
        name: roomName,
        createdBy: newParticipantName
      });
    }
    const docRef = await addDoc(
      collection(db, 'rooms', roomRef.id, 'participants'),
      {
        avatar: '',
        name: newParticipantName,
        vote: null
      }
    );
    setParticipantId(docRef.id);
    setModalVisibility(false);
  };

  return (
    <>
      <DialogFooter>
        {error && (
          <p className='text-xs text-destructive text-center'>{error}</p>
        )}
        <Button
          type='submit'
          onClick={() => handleJoinRoom(room, participantName)}
        >
          {t('room.modal.save')}
        </Button>
        <LanguageDropdown />
      </DialogFooter>
    </>
  );
};

export default Footer;
