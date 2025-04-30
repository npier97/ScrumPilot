import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { X, StepBack } from 'lucide-react';
import { onBoardingMessages } from '@/ressources/datas/onBoardingMessages';
import { OnBoardingFooterProps } from '@/types/Dashboard';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const OnBoardingFooter = ({
  index,
  decrementStepIndex,
  closeDialog
}: OnBoardingFooterProps) => {
  const { t } = useTranslation();

  return (
    <DialogFooter className='relative max-md:flex-row max-md:justify-center min-h-[36px] sm:justify-center'>
      {index > 0 && (
        <Button
          onClick={decrementStepIndex}
          className={`text-primary md:absolute bottom-0 left-0 max-md:text-xs md:pl-0! ${index >= onBoardingMessages.length - 1 && 'max-md:mr-auto'}`}
          variant='ghost'
        >
          <StepBack className='size-4' />
          {t('onBoarding.stepBack')}
        </Button>
      )}
      <DialogClose onClick={closeDialog} asChild className='md:mx-auto text-xs'>
        {index < onBoardingMessages.length - 1 && (
          <Button variant='ghost' className='text-gray-500 font-semibold'>
            {t('onBoarding.skipTour')}
            <X />
          </Button>
        )}
      </DialogClose>
    </DialogFooter>
  );
};

export default OnBoardingFooter;
