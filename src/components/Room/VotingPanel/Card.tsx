import { CardProps } from '@/types/Room';
import { useTranslation } from 'react-i18next';

const Card = ({ number, selectedNumber, onClick }: CardProps) => {
  const { t } = useTranslation();
  return (
    <div
      key={`${number}`}
      className={`w-[70px] p-6 text-center rounded-xl border shadow-lg cursor-pointer ${selectedNumber === number ? 'bg-primary text-white' : ''}`}
      onClick={() => onClick(number)}
      aria-label={`${t('room.vote.estimation')} ${number}`}
      tabIndex={0}
    >
      <h3
        className={`mb-1 text-xl font-medium ${selectedNumber === number ? 'text-white' : 'text-gray-900'} dark:text-white`}
        key={`${number}`}
        aria-hidden='true'
      >
        {number}
      </h3>
    </div>
  );
};

export default Card;
