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
    <DialogFooter className='relative'>
      {index > 0 && (
        <Button
          onClick={decrementStepIndex}
          className='text-xs text-primary absolute bottom-0 left-0'
          variant='ghost'
        >
          <StepBack />
          {t('onBoarding.stepBack')}
        </Button>
      )}
      <DialogClose onClick={closeDialog} asChild className='mx-auto text-xs'>
        {index < onBoardingMessages.length - 1 && (
          <Button variant='ghost'>
            {t('onBoarding.skipTour')}
            <X />
          </Button>
        )}
      </DialogClose>
    </DialogFooter>
  );
};

export default OnBoardingFooter;
