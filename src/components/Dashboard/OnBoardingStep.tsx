import { MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { OnBoardingStepPropTypes } from '@/types/Dashboard';
import { useEffect } from 'react';

const OnBoardingStep = ({
  incrementCurrentStepIndex,
  messages,
  isLastStep,
  closeProcess,
  resetProcess
}: OnBoardingStepPropTypes) => {
  const { t } = useTranslation();

  useEffect(() => {
    return resetProcess;
  }, []);

  if (!messages) return;

  return (
    <div className='w-full flex h-full py-3'>
      <div className='basis-full w-full flex flex-col justify-center items-start space-y-4'>
        <div className='flex flex-col space-y-2'>
          <h3 className='font-bold text-xl'>{t(messages.stepTitle)}</h3>
          <p className='text-sm'>{t(messages.stepDescription)}</p>
        </div>
        {!isLastStep ? (
          <Button onClick={incrementCurrentStepIndex} className=''>
            {t('onBoarding.nextStep')}
            <MoveRight />
          </Button>
        ) : (
          <Button onClick={closeProcess}>{t('onBoarding.finish')}</Button>
        )}
      </div>
      <div className='flex basis-full rounded'>
        <img className='w-full h-full' src={messages.stepShowcase} alt='' />
      </div>
    </div>
  );
};

export default OnBoardingStep;
