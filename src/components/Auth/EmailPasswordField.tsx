import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { RenderField } from './RenderField';
import ValidationCriterias from './ValidationCriterias';
import { useWatch, useFormContext } from 'react-hook-form';
import { authFieldsCriterias } from '@/utils/validations/auth';
import ErrorMessage from './ErrorMessage';
import { FieldType, FieldValidationsMode } from '@/types/Auth';

const EmailPasswordField = ({
  field,
  withValidations = 'auto'
}: {
  field: FieldType;
  withValidations?: FieldValidationsMode;
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: { isSubmitted, errors }
  } = useFormContext();

  // suscribe to target input changes
  const fieldControlledValue: string = useWatch({ control, name: field });
  const fieldCriterias = authFieldsCriterias[field];

  return (
    <div>
      {field === 'email' ? (
        <RenderField
          name='email'
          type='text'
          placeholder={t('forms.email.placeholder')}
          label={t('forms.email.label')}
        />
      ) : (
        <div className='relative'>
          <RenderField
            name='password'
            type={showPassword ? 'text' : 'password'}
            placeholder={t('forms.password.placeholder')}
            label={t('forms.password.label')}
            autoComplete='password'
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 bottom-2 cursor-pointer'
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </div>
        </div>
      )}
      {withValidations === 'manual' ? (
        <div className='min-h-4 mt-1'>
          {isSubmitted && errors[field] && (
            <ValidationCriterias
              fieldCriterias={fieldCriterias}
              watchedFieldValue={fieldControlledValue}
            />
          )}
        </div>
      ) : (
        <div className='mt-1 min-h-4'>
          {withValidations === 'auto' && errors[field]?.message && (
            <ErrorMessage errorMessage={errors[field]?.message} />
          )}
        </div>
      )}
    </div>
  );
};

export default EmailPasswordField;
