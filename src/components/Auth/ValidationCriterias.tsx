import { CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { ValidationCriteria } from '@/utils/validations/auth';

const ValidationCriterias = ({
  fieldCriterias,
  watchedFieldValue
}: {
  fieldCriterias: ValidationCriteria[];
  watchedFieldValue: string;
}) => (
  <ul className='text-xs text-gray-500 space-x-4 flex transition-all'>
    {fieldCriterias?.map(({ label, test }, i) => {
      const passed = test(watchedFieldValue);
      return (
        <li
          key={`${watchedFieldValue}-criteria-${i}`}
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
