import { db } from '@/firebase-config';
import { EditProfileProps } from '@/types/Room';
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
import InputField from '../Modal/InputField';
import { useParticipantStore, useRoomStore } from '@/store';

const EditProfileModal = ({ isOpen, toggleVisibility }: EditProfileProps) => {
  const { t } = useTranslation();
  const [updatedParticipantName, setUpdatedParticipantName] = useState('');
  const roomId = useRoomStore((state) => state.roomUid);
  const participantId = useParticipantStore((state) => state.participantUid);

  const handleUpdateProfile = async (updatedParticipantName: string) => {
    await updateDoc(doc(db, 'rooms', roomId, 'participants', participantId), {
      name: updatedParticipantName
    });
    toggleVisibility(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{t('room.modal.update')}</DialogTitle>
          <DialogDescription>{t('room.modal.description')}</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-4 items-center gap-4'>
          <InputField
            id='username'
            label={'room.modal.username'}
            value={updatedParticipantName}
            placeholder={t('room.modal.yourName')}
            setValue={setUpdatedParticipantName}
            isVisible
          />
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={() => handleUpdateProfile(updatedParticipantName)}
          >
            {t('room.modal.save')}
          </Button>
          <LanguageDropdown />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
