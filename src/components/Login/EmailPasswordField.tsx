import { Input } from '../ui/input';
import { FormField, FormItem, FormControl, FormLabel } from '../ui/form';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const EmailPasswordField = ({
  control,
  field
}: {
  control: Control<{ email: string; password?: string }>;
  field: 'email' | 'password';
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return field === 'email' ? (
    <FormField
      control={control}
      name='email'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('forms.email.label')}</FormLabel>
          <FormControl>
            <Input
              type='text'
              placeholder={t('forms.email.placeholder')}
              {...field}
              value={field.value ?? ''}
            />
          </FormControl>
        </FormItem>
      )}
    />
  ) : (
    field === 'password' && (
      <div className='relative'>
        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('forms.password.label')}</FormLabel>
              <FormControl>
                <Input
                  autoComplete='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('forms.password.placeholder')}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-4 bottom-2 cursor-pointer'
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      </div>
    )
  );
};

export default EmailPasswordField;
