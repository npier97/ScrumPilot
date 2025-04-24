import { ModalProps } from '@/types/Room';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import InputField from './InputField';
import Footer from './Footer';

const Modal = ({ path, room, roomUid }: ModalProps) => {
  const { t } = useTranslation();
  const [roomName, setRoomName] = useState('');
  const [isModalVisible, setModalVisibility] = useState(true);
  const [participantName, setParticipantName] = useState('');
  const isAdminLink = path === 'rooms';

  return (
    <Dialog open={isModalVisible}>
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
        <Footer
          isAdmin={isAdminLink}
          room={room}
          roomUid={roomUid}
          roomName={roomName}
          participantName={participantName}
          setModalVisibility={setModalVisibility}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
