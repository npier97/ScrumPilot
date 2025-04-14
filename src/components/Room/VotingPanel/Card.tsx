import { CardProps } from '@/types/Room';

const Card = ({ number, selectedNumber, onClick }: CardProps) => (
  <div
    key={`${number}`}
    className={`w-[70px] p-6 text-center rounded-xl border shadow-lg cursor-pointer ${selectedNumber === number ? 'bg-primary text-white' : ''}`}
    onClick={() => onClick(number)}
  >
    <h3
      className={`mb-1 text-xl font-medium ${selectedNumber === number ? 'text-white' : 'text-gray-900'} dark:text-white`}
      key={`${number}`}
    >
      {number}
    </h3>
  </div>
);

export default Card;
