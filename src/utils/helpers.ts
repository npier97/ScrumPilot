import { NumericActionProps } from '@/types/Dashboard';
import { Dispatch, SetStateAction } from 'react';

export const shiftStepValue = (
  action: NumericActionProps,
  index: number,
  setIndex: Dispatch<SetStateAction<number>>
) => {
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
