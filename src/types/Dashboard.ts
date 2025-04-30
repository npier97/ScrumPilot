export type NumericActionProps = 'increment' | 'decrement';

export type OnBoardingMessage = {
  stepTitle: string;
  stepDescription: string;
  stepShowcase: string;
};

export interface OnBoardingStepPropTypes {
  isLastStep: boolean;
  messages: OnBoardingMessage;
  incrementCurrentStepIndex: () => void;
  closeProcess: () => void;
  resetProcess: () => void;
}

export interface OnBoardingFooterProps {
  index: number;
  decrementStepIndex: () => void;
  closeDialog: () => void;
}
