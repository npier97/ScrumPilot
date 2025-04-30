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
import { shiftStepValue } from '@/utils/helpers';
import { onBoardingMessages } from '@/ressources/datas/onBoardingMessages';
import OnBoardingStep from './OnBoardingStep';
import OnBoardingFooter from './OnBoardingFooter';
import { useUserStore } from '@/store';
import { useStore } from 'zustand';
import { updateUserInDataBase } from '@/services/userServices';
import UiStepIndicators from './UiStepIndicators';

const OnBoarding = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const userInfos = useStore(useUserStore, (state) => state.userInfos);
  const [index, setIndex] = useState(0);

  const completeOnboarding = async () => {
    if (userInfos?.isNewUser) {
      await updateUserInDataBase(userInfos.uid, { isNewUser: false });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (userInfos?.isNewUser) {
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, [userInfos]);

  return (
    <Dialog open={isOpen}>
      <DialogOverlay className='bg-black/10' />

      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>{t('seeTutorial')}</Button>
      </DialogTrigger>

      <DialogContent className='duration-700 ease-out w-full max-md:max-h-[80vh] max-w-[80%]! md:max-w-[60%]! '>
        <DialogHeader className=''>
          <DialogTitle
            asChild
            className='text-center text-xl md:text-3xl font-bold'
          >
            <h1>{t('onBoarding.title')}</h1>
          </DialogTitle>
          <DialogDescription className='text-center font-bold md:text-base'>
            {t('onBoarding.description')}
          </DialogDescription>

          <UiStepIndicators
            stepItems={onBoardingMessages}
            shiftIndex={setIndex}
            currentIndex={index}
          />
        </DialogHeader>

        <OnBoardingStep
          incrementCurrentStepIndex={() =>
            shiftStepValue('increment', index, setIndex)
          }
          messages={onBoardingMessages[index]}
          isLastStep={index === onBoardingMessages.length - 1}
          closeProcess={() => completeOnboarding()}
          resetProcess={() => setIndex(0)}
        />

        <OnBoardingFooter
          decrementStepIndex={() =>
            shiftStepValue('decrement', index, setIndex)
          }
          closeDialog={() => completeOnboarding()}
          index={index}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OnBoarding;
