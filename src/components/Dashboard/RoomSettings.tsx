import { RoomSettingsProps } from '@/types/Dashboard';
import { Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RoomSettings = ({ roomId, activeRoom, onToggle }: RoomSettingsProps) => {
  const { t } = useTranslation();

  const handleDeleteRoom = () => {
    console.log(`Room ${roomId} deleted`);
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
