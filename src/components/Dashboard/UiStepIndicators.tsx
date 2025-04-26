import { SetStateAction } from 'react';
import { Button } from '../ui/button';

interface UiStepIndicatorsProps {
  stepItems: any[];
  shiftIndex: (value: SetStateAction<number>) => void;
  currentIndex: number;
}

const UiStepIndicators = ({
  stepItems,
  shiftIndex,
  currentIndex
}: UiStepIndicatorsProps) => (
  <div className='flex items-center justify-center space-x-2 mt-5'>
    {Array.from({ length: stepItems.length }).map((_, idx) => (
      <Button
        key={`onBoarding-carousel-button-${idx}`}
        size={'sm'}
        variant={'default'}
        onClick={() => shiftIndex(idx)}
        className={`p-0  size-2 rounded-full ${idx === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
      />
    ))}
  </div>
);

export default UiStepIndicators;
