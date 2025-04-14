import { fibonacciSequence } from '@/ressources/datas/estimationScale';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { VotingProps } from '@/types/Room';
import { useParticipantStore, useUsersCardsStore } from '@/store';
import { useState } from 'react';

const Voting = ({ roomId }: VotingProps) => {
  const { t } = useTranslation();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const participantId = useParticipantStore((state) => state.participantId);
  const isCardRevealed = useUsersCardsStore((state) => state.isRevealed);
  const setIsCardRevealed = useUsersCardsStore((state) => state.setIsRevealed);

  const handleClick = async (number: number) => {
    setSelectedNumber(number);
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
            className={`w-[70px] p-6 text-center rounded-xl border shadow-lg cursor-pointer ${selectedNumber === number ? 'bg-primary text-white' : ''}`}
            onClick={() => handleClick(number)}
          >
            <h3
              className={`mb-1 text-xl font-medium ${selectedNumber === number ? 'text-white' : 'text-gray-900'} dark:text-white`}
              key={`${number}`}
            >
              {number}
            </h3>
          </div>
        ))}
      </div>
      <div className='flex gap-4'>
        <Button>{t('room.vote.reset')}</Button>
        <Button onClick={() => setIsCardRevealed(!isCardRevealed)}>
          {t('room.vote.reveal')}
        </Button>
      </div>
    </div>
  );
};

export default Voting;
