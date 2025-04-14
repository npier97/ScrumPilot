import { fibonacciSequence } from '@/ressources/datas/estimationScale';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { VotingPanelType } from '@/types/Room';
import { useParticipantStore, useUsersCardsStore } from '@/store';
import { useState } from 'react';
import Card from './Card';

const VotingPanel = ({ roomId }: VotingPanelType) => {
  const { t } = useTranslation();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const participantId = useParticipantStore((state) => state.participantId);
  const setIsCardRevealed = useUsersCardsStore((state) => state.setIsRevealed);

  const handleCardClick = async (number: number) => {
    setSelectedNumber(number);
    await updateDoc(doc(db, 'rooms', roomId, 'participants', participantId), {
      vote: number
    });
  };

  const handleResetClick = async () => {
    const participantsRef = collection(db, 'rooms', roomId, 'participants');
    const snapshot = await getDocs(participantsRef);

    await Promise.all(
      snapshot.docs.map((docSnap) => updateDoc(docSnap.ref, { vote: null }))
    );
  };

  const handleRevealClick = async () => {
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) return;

    const newValue = !roomSnap.data().isVoteRevealed;
    await updateDoc(roomRef, { isVoteRevealed: newValue });
    setIsCardRevealed(newValue);
  };

  return (
    <div className='flex flex-col items-center gap-8 mb-4'>
      <div className='flex gap-2 justify-between'>
        {fibonacciSequence.map((number) => (
          <Card
            number={number}
            selectedNumber={selectedNumber}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <div className='flex gap-4'>
        <Button onClick={() => handleResetClick()}>
          {t('room.vote.reset')}
        </Button>
        <Button onClick={() => handleRevealClick()}>
          {t('room.vote.reveal')}
        </Button>
      </div>
    </div>
  );
};

export default VotingPanel;
