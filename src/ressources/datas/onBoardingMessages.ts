import { OnBoardingMessage } from '@/types/Dashboard';

// TODO: take and set animate pictures from dashboard navigation
const showCases = [
  '/hacker.png',
  '/hacker.png',
  '/hacker.png',
  '/hacker.png',
  '/hacker.png',
  '/hacker.png'
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
    stepTitle: 'onBoarding.step6.title',
    stepDescription: 'onBoarding.step6.description',
    stepShowcase: showCases[5]
  }
];

export { onBoardingMessages };
