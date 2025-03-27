import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormControl, FormLabel } from '../ui/form';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { createLoginFormSchema } from '../../../zod.schemas';
import { useTranslation } from 'react-i18next';

interface ForgotPasswordFormProps {
  setShowForgotPasswordForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type ForgotPasswordFormType = {
  email: string;
};

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  setShowForgotPasswordForm
}) => {
  const { t } = useTranslation();
  const formSchema = createLoginFormSchema(t).pick({ email: true });

  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const { errors } = useFormState({ control: form.control });

  const onSubmit = (values: ForgotPasswordFormType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col space-y-5 mt-6 w-full'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('forms.email')}</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder={t('forms.email.placeholder')}
                  {...field}
                  value={form.getValues('email')}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-full py-5' type='submit'>
          {t('forms.continue')}
        </Button>
        <div className='flex flex-col text-xs space-y-1'>
          {Object.entries(errors).map(([fieldName, error]) => (
            <p key={fieldName} className='text-red-500'>
              {error.message}
            </p>
          ))}
        </div>
      </form>

      <div className='flex justify-center my-3'>
        <Button
          onClick={() => setShowForgotPasswordForm(false)}
          variant={'link'}
          className='text-sm text-primary hover:underline'
        >
          {t('forms.backToLogin')}
        </Button>
      </div>
      <hr />
      <div className='flex items-center justify-center flex-wrap pt-6'>
        <p>{t('forms.noAccountYet')}</p>
        &nbsp;
        <Link to='/sigin'>
          <Button variant={'link'} className='text-primary hover:underline'>
            {t('forms.createAccount')}
          </Button>
        </Link>
      </div>
    </Form>
  );
};

export default ForgotPasswordForm;
