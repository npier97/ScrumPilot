import { ParticipantsType } from '@/types/Room';
import { useTranslation } from 'react-i18next';

const UserCard = ({ participants }: { participants: ParticipantsType[] }) => {
  const { t } = useTranslation();

  return (
    <div className={'rounded-xl border py-12 px-20 shadow-lg text-center'}>
      <div className='flex flex-row justify-center gap-8 '>
        {participants.map((participant) => (
          <div className='flex flex-col items-center' key={`${participant}`}>
            <img
              className='w-20 h-20 mb-3 rounded-full shadow-sm'
              src='/hacker.png'
              alt='Random image'
            />
            <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
              {participant.name}
            </h5>
          </div>
        ))}
      </div>
      <hr className='my-6 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
      {t('room.users.estimate')}
    </div>
  );
};

export default UserCard;
