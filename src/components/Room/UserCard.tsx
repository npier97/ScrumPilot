import { useUsersCardsStore } from '@/store';
import { ParticipantsType } from '@/types/Room';
import { useTranslation } from 'react-i18next';

const UserCard = ({ participants }: { participants: ParticipantsType[] }) => {
  const { t } = useTranslation();
  const isCardRevealed = useUsersCardsStore((state) => state.isRevealed);
  const totalVotes = participants.reduce(
    (accumulator, currentValue) => accumulator + currentValue.vote,
    0
  );
  const numberOfVoters = participants.filter(
    (p) => p.vote !== null && p.vote !== undefined
  ).length;

  const average =
    numberOfVoters > 0 ? Math.ceil(totalVotes / numberOfVoters) : 0;

  return (
    <div
      className={'rounded-xl border sm:mx-4 py-12 px-20 shadow-lg text-center'}
    >
      {t('room.users.estimate')}
      <div className='min-h-[40px]font-bold text-4xl'>
        {(isCardRevealed && average) || ''}
      </div>
      <hr className='my-6 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
      <div className='flex flex-wrap justify-center gap-8'>
        {participants.map((participant) => (
          <div className='flex flex-col items-center' key={`${participant.id}`}>
            <img
              className='w-20 h-20 mb-3 rounded-full shadow-sm'
              src='/hacker.png'
              alt='Random image'
            />
            <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
              {participant.name}
            </h5>
            <div
              className={`w-[70px] min-h-[86px] p-6 ${participant.vote ? '' : 'py-10'} text-center rounded-xl border shadow-lg ${isCardRevealed ? '' : 'bg-primary text-white'}`}
            >
              {isCardRevealed && (
                <h3 className='mb-1 text-xl font-medium text-gray-900'>
                  {participant.vote}
                </h3>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
