import { CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { ValidationCriteria } from '@/utils/validations/auth';

const ValidationCriterias = ({
  fieldCriterias,
  watchedField
}: {
  fieldCriterias: ValidationCriteria[];
  watchedField: string;
}) => (
  <ul className='text-xs text-gray-500 space-x-4 flex transition-all'>
    {fieldCriterias?.map(({ label, test }, i) => {
      const passed = test(watchedField);
      return (
        <li
          key={`${watchedField}-criteria-${i}`}
          className={clsx('flex items-center gap-1', {
            'text-green-600': passed,
            'text-destructive': !passed
          })}
        >
          {passed ? (
            <CheckCircle className='w-3 h-3 shrink-0' />
          ) : (
            <XCircle className='w-3 h-3 shrink-0' />
          )}
          <span>{label}</span>
        </li>
      );
    })}
  </ul>
);

export default ValidationCriterias;
