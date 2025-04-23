import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import OnBoardingStep from './OnBoardingStep';
import { NumericActionProps } from '@/types/Dashboard';
import { onBoardingMessages } from '@/ressources/datas/onBoardingMessages';
import OnBoardingFooter from './onBoardingFooter';

const OnBoarding = () => {
  const [isOpen, setIsOpen] = useState(false);
  // TODO: get info from firestore db
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
          <DialogTitle asChild className='text-center text-3xl font-bold'>
            <h1>{t('onBoarding.title')}</h1>
          </DialogTitle>
          <DialogDescription className='text-center font-bold'>
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

        <OnBoardingFooter
          decrementStepIndex={() => switchStepValue('decrement')}
          closeDialog={() => setIsOpen(false)}
          index={index}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OnBoarding;
