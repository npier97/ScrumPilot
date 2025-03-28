import { fibonacciSequence } from '@/ressources/datas/estimationScale';
import { Button } from '@/components/ui/button';

const Voting = () => (
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
      <Button>Reset votes</Button>
      <Button>Reveal votes</Button>
      <Button>Submit votes</Button>
    </div>
  </div>
);

export default Voting;
