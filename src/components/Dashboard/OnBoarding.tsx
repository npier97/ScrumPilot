import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { X, StepBack } from 'lucide-react';
import OnBoardingStep from './OnBoardingStep';
import { NumericActionProps } from '@/types/Dashboard';
import { onBoardingMessages } from '@/ressources/datas/onBoardingMessages';

const OnBoarding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!hasSeenOnboarding) {
      setTimeout(() => setIsOpen(true), 1000);
      setHasSeenOnboarding(true);
    }
  }, [hasSeenOnboarding, isOpen, index]);

  const switchStepValue = (action: NumericActionProps) => {
    switch (action) {
      case 'increment':
        if (index >= 0) {
          setIndex((val) => (val += 1));
        }
        break;
      case 'decrement':
        if (index > 0) {
          setIndex((val) => (val -= 1));
        }
        break;
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogOverlay className='bg-black/10' />

      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>{t('seeTutorial')}</Button>
      </DialogTrigger>

      <DialogContent className='duration-700 ease-out w-full lg:max-w-[60%]! '>
        <DialogHeader className=''>
          <DialogTitle className='text-center'>
            {t('onBoarding.title')}
          </DialogTitle>
          <DialogDescription className='text-center'>
            {t('onBoarding.description')}
          </DialogDescription>
        </DialogHeader>

        <OnBoardingStep
          incrementCurrentStepIndex={() => switchStepValue('increment')}
          messages={onBoardingMessages[index]}
          isLastStep={index === onBoardingMessages.length - 1}
          closeProcess={() => setIsOpen(false)}
          resetProcess={() => setIndex(0)}
        />

        <DialogFooter className='relative'>
          {index > 0 && (
            <Button
              onClick={() => switchStepValue('decrement')}
              className='text-xs text-primary absolute bottom-0 left-0'
              variant='ghost'
            >
              <StepBack />
              {t('onBoarding.stepBack')}
            </Button>
          )}
          <DialogClose
            onClick={() => setIsOpen(false)}
            asChild
            className='mx-auto text-xs'
          >
            {index < onBoardingMessages.length - 1 && (
              <Button variant='ghost'>
                {t('onBoarding.close')}
                <X />
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnBoarding;
