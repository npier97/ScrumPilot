import { db } from '@/firebase-config';
import { ModalProps, RoomType } from '@/types/Room';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '@/components/LanguageDropdown';
import InputField from './InputField';
import { useParticipantStore } from '@/store';

const Modal = ({
  path,
  room,
  roomId,
  isOpen,
  toggleVisibility
}: ModalProps) => {
  const { t } = useTranslation();
  const [roomName, setRoomName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const setParticipantId = useParticipantStore(
    (state) => state.setParticipantId
  );
  const isAdminLink = path === 'rooms';

  const handleJoinRoom = async (room: RoomType, newParticipantName: string) => {
    if (!room) return;

    const roomRef = doc(db, 'rooms', roomId);

    if (isAdminLink) {
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
    toggleVisibility(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{t('room.modal.title')}</DialogTitle>
          <DialogDescription>{t('room.modal.description')}</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-4 items-center gap-4'>
          <InputField
            id='room'
            label={'room.modal.room'}
            value={roomName}
            placeholder={t('room.modal.roomName')}
            setValue={setRoomName}
            isVisible={isAdminLink}
          />
          <InputField
            id='username'
            label={'room.modal.username'}
            value={participantName}
            placeholder={t('room.modal.yourName')}
            setValue={setParticipantName}
            isVisible
          />
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={() => handleJoinRoom(room, participantName)}
          >
            {t('room.modal.save')}
          </Button>
          <LanguageDropdown />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
