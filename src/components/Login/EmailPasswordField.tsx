import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { RenderField } from './RenderField';
import ValidationCriterias from './ValidationCriterias';
import { useWatch, useFormContext } from 'react-hook-form';
import { authFieldsCriterias } from '@/utils/validations/auth';

const EmailPasswordField = ({ field }: { field: 'email' | 'password' }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: { isSubmitted }
  } = useFormContext();
  const fieldControl = useWatch({ control, name: field }) || '';
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
      <div className='min-h-4 mt-1'>
        {isSubmitted && (
          <ValidationCriterias
            fieldCriterias={fieldCriterias}
            watchedField={fieldControl}
          />
        )}
      </div>
    </div>
  );
};

export default EmailPasswordField;
