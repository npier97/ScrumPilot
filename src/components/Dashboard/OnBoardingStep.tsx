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
    <div className='w-full flex max-md:flex-col h-full md:py-3'>
      <div className='basis-full w-full flex flex-col justify-center items-start space-y-4'>
        <div className='flex flex-col space-y-2 max-md:border rounded max-md:p-2 max-md:bg-primary/10'>
          <h3 className='font-bold text-lg lg:text-xl'>
            {t(messages.stepTitle)}
          </h3>
          <p className=' max-md:text-sm'>{t(messages.stepDescription)}</p>
        </div>
        {!isLastStep ? (
          <Button
            onClick={incrementCurrentStepIndex}
            className='md:text-sm max-md:mx-auto'
          >
            {t('onBoarding.nextStep')}
            <MoveRight />
          </Button>
        ) : (
          <Button
            onClick={closeProcess}
            className='md:text-base max-md:mx-auto'
          >
            {t('onBoarding.finish')}
          </Button>
        )}
      </div>
      <div className='flex basis-full rounded p-4 max-md:hidden'>
        <img className='w-full' src={messages.stepShowcase} alt='' />
      </div>
    </div>
  );
};

export default OnBoardingStep;
