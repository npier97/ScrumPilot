import { db } from '@/firebase-config';
import { useAuth } from '@/hooks/useAuth';
import { RoomSettingsProps } from '@/types/Dashboard';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RoomSettings = ({ roomId, activeRoom, onToggle }: RoomSettingsProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleDeleteRoom = async () => {
    if (user?.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const existingRooms = userSnapshot.data().rooms || [];
        const updatedRooms = existingRooms.filter(
          (id: string) => id !== roomId
        );
        await updateDoc(userDocRef, { rooms: updatedRooms });
      }
    }
    await deleteDoc(doc(db, 'rooms', roomId));
  };

  return (
    <>
      <Settings
        size={16}
        className='absolute top-0 right-0 -mt-4 -mr-4 text-gray-500 hover:text-black cursor-pointer'
        onClick={() => onToggle(roomId)}
      />
      {activeRoom === roomId && (
        <div
          className='absolute top-0 right-0 mt-2 w-30 bg-white border border-gray-300 shadow-lg rounded-md'
          data-testid='language-dropdown'
        >
          <button
            className='px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-accent-foreground'
            onClick={handleDeleteRoom}
          >
            {t('dashboard.activeRooms.delete')}
          </button>
        </div>
      )}
    </>
  );
};

export default RoomSettings;
