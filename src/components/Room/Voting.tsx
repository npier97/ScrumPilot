import { fibonacciSequence } from '@/ressources/datas/estimationScale';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { VotingProps } from '@/types/Room';
import { useParticipantStore } from '@/store';

const Voting = ({ roomId }: VotingProps) => {
  const { t } = useTranslation();
  const participantId = useParticipantStore((state) => state.participantId);

  const handleClick = async (number: number) => {
    console.log(participantId);

    const participantRef = doc(
      db,
      'rooms',
      roomId,
      'participants',
      participantId
    );
    await updateDoc(participantRef, {
      vote: number
    });
  };

  return (
    <div className='flex flex-col items-center gap-8 mb-4'>
      <div className='flex gap-2 justify-between'>
        {fibonacciSequence.map((number) => (
          <div
            key={`${number}`}
            className='w-[70px] p-6 text-center rounded-xl border shadow-lg cursor-pointer'
            onClick={() => handleClick(number)}
          >
            <h3
              className='mb-1 text-xl font-medium text-gray-900 dark:text-white'
              key={`${number}`}
            >
              {number}
            </h3>
          </div>
        ))}
      </div>
      <div className='flex gap-4'>
        <Button>{t('room.vote.reset')}</Button>
        <Button>{t('room.vote.reveal')}</Button>
        <Button>{t('room.vote.submit')}</Button>
      </div>
    </div>
  );
};

export default Voting;
