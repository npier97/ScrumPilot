import { db } from '@/firebase-config';
import { ModalProps, RoomType } from '@/types/Room';
import { doc, updateDoc } from 'firebase/firestore';
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

const Modal = ({
  path,
  room,
  roomId,
  isOpen,
  toggleVisibility
}: ModalProps) => {
  const { t } = useTranslation();
  const [roomName, setRoomName] = useState('');
  const [memberName, setMemberName] = useState('');
  const isAdminLink = path === 'rooms';

  const handleJoinRoom = async (room: RoomType, newMemberName: string) => {
    if (!room) return;

    const roomRef = doc(db, 'rooms', roomId);

    if (isAdminLink) {
      await updateDoc(roomRef, {
        name: roomName,
        createdBy: newMemberName
      });
    }
    await updateDoc(roomRef, {
      members: [...room.members, newMemberName]
    });
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
            value={memberName}
            placeholder={t('room.modal.yourName')}
            setValue={setMemberName}
            isVisible
          />
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={() => handleJoinRoom(room, memberName)}
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
