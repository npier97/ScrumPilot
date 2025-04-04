import { fibonacciSequence } from '@/ressources/datas/estimationScale';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Voting = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center gap-8 mb-4'>
      <div className='flex gap-2 justify-between'>
        {fibonacciSequence.map((number) => (
          <div className='w-[70px] p-6 text-center rounded-xl border shadow-lg cursor-pointer'>
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
