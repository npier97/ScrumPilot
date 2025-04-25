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
import { NumericActionProps } from '@/types/Dashboard';
import { onBoardingMessages } from '@/ressources/datas/onBoardingMessages';
import OnBoardingStep from './OnBoardingStep';
import OnBoardingFooter from './OnBoardingFooter';
import { useUserStore } from '@/store';
import { useStore } from 'zustand';
import { updateUserInDataBase } from '@/services/userServices';

const OnBoarding = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const userInfos = useStore(useUserStore, (state) => state.userInfos);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (userInfos?.isNewUser) {
      setTimeout(() => setIsOpen(true), 1000);
      (async () => {
        await updateUserInDataBase(userInfos.uid, { isNewUser: false });
      })();
    }
  }, [userInfos]);

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

          <div className='flex items-center justify-center space-x-2 mt-5'>
            {Array.from({ length: onBoardingMessages.length }).map((_, idx) => (
              <Button
                key={`onBoarding-carousel-button-${idx}`}
                size={'sm'}
                variant={'default'}
                onClick={() => setIndex(idx)}
                className={`p-0 size-2 rounded-full ${idx === index ? 'bg-primary' : 'bg-gray-300'}`}
              />
            ))}
          </div>
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
