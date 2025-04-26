import { OnBoardingMessage } from '@/types/Dashboard';
import hackerImage from '../../../public/hacker.png';

// TODO: take and set animate pictures from dashboard navigation
const showCases = [
  hackerImage,
  hackerImage,
  hackerImage,
  hackerImage,
  hackerImage,
  hackerImage
];

const onBoardingMessages: OnBoardingMessage[] = [
  {
    stepTitle: 'onBoarding.step1.title',
    stepDescription: 'onBoarding.step1.description',
    stepShowcase: showCases[0]
  },
  {
    stepTitle: 'onBoarding.step2.title',
    stepDescription: 'onBoarding.step2.description',
    stepShowcase: showCases[1]
  },
  {
    stepTitle: 'onBoarding.step3.title',
    stepDescription: 'onBoarding.step3.description',
    stepShowcase: showCases[2]
  },
  {
    stepTitle: 'onBoarding.step4.title',
    stepDescription: 'onBoarding.step4.description',
    stepShowcase: showCases[3]
  },
  {
    stepTitle: 'onBoarding.step5.title',
    stepDescription: 'onBoarding.step5.description',
    stepShowcase: showCases[4]
  },
  {
    stepTitle: 'onBoarding.step5.title',
    stepDescription: 'onBoarding.step5.description',
    stepShowcase: showCases[5]
  }
];

export { onBoardingMessages };
