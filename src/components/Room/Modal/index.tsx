import { ModalProps } from '@/types/Room';
import { useEffect, useState } from 'react';
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
import { useAuth } from '@/hooks/useAuth';
import { useParticipantStore } from '@/store';

const Modal = ({
  path,
  room,
  participants,
  roomUid,
  adminUserUid
}: ModalProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [roomName, setRoomName] = useState('');
  const [isModalVisible, setModalVisibility] = useState(true);
  const [participantName, setParticipantName] = useState('');
  const participantId = useParticipantStore((state) => state.participantUid);
  const isAdminLink = path === 'rooms';

  useEffect(() => {
    if (!participants && (!user?.uid || !participantId)) return;

    const hasCurrentUserJoined = participants.some(
      (obj) => obj.uid === (user?.uid || participantId)
    );

    if (hasCurrentUserJoined) setModalVisibility(false);
  }, [participants, user?.uid, participantId]);

  if (!isModalVisible) return null;

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
          adminUserUid={adminUserUid}
          roomName={roomName}
          participantName={participantName}
          setModalVisibility={setModalVisibility}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
