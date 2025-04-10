import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { RenderField } from './RenderField';

const EmailPasswordField = ({
  control,
  field
}: {
  control:
    | Control<{ email: string; password: string }>
    | Control<{ email: string }>;
  field: 'email' | 'password';
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return field === 'email' ? (
    <RenderField
      control={control}
      name='email'
      type='text'
      placeholder={t('forms.email.placeholder')}
      label={t('forms.email.label')}
    />
  ) : (
    <div className='relative'>
      <RenderField
        control={control}
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
  );
};

export default EmailPasswordField;
