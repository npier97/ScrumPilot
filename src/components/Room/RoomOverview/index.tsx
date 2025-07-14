import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import VotingPanel from '../VotingPanel';
import UserCard from '../UserCard';
import { useRoomStore } from '@/store';
import { RoomOverviewType } from '@/types/Room';

const RoomOverview = ({ room, participants }: RoomOverviewType) => {
  const { t } = useTranslation();
  const roomId = useRoomStore((state) => state.roomUid);

  const handleInviteOnClick = () => {
    const link = `${window.location.origin}/join/${roomId}`;
    navigator.clipboard.writeText(link);
    toast.success(t('room.copied'));
  };

  return (
    <div className='pt-20 pl-4 pb-4 flex justify-center m-auto'>
      {room ? (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col items-center gap-2'>
            <h1>
              {t('room.welcome')} {room.name}!
            </h1>

            <Button onClick={handleInviteOnClick}>{t('room.invite')}</Button>
            {/* TODO: toaster translation */}
            <Toaster />
          </div>
          <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
          <VotingPanel roomUid={roomId} />
          <UserCard participants={participants} />
        </div>
      ) : (
        <p>{t('room.loading')}</p>
      )}
    </div>
  );
};

export default RoomOverview;
