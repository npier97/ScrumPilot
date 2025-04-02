import { Button } from '../ui/button';
import { Form } from '../ui/form';
import EmailPasswordField from './EmailPasswordField';
import { Link } from '@tanstack/react-router';
import { useForm, useFormState } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLoginFormSchema } from '../../../zod.schemas';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ErrorMessage from './ErrorMessage';

const AuthForm = ({
  isVisible,
  toggleIsVisible
}: {
  isVisible: boolean;
  toggleIsVisible: () => void;
}) => {
  const { t } = useTranslation();
  const formSchema = createLoginFormSchema(t);
  const form = useForm<z.infer<ReturnType<typeof createLoginFormSchema>>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { errors } = useFormState({ control: form.control });
  const { reset } = form;
  const { connectUser } = useAuth();
  const [submitError, setSubmitError] = useState<{
    status: boolean;
    message?: string | null;
  }>({
    status: false,
    message: null
  });

  const resetSubmitErrors = () =>
    setSubmitError({ status: false, message: null });

  const onSubmit = (
    values: z.infer<ReturnType<typeof createLoginFormSchema>>
  ) => {
    resetSubmitErrors();
    connectUser(values)
      .then((res) => {
        if (res?.success) {
          console.log('user connected');
        } else {
          setSubmitError({ status: true, message: res?.message });
        }
      })
      .finally(() => setTimeout(() => resetSubmitErrors, 5000));
  };

  useEffect(() => {
    reset();
  }, [isVisible, reset]);

  if (!isVisible) return null;

  return (
    <Form {...form}>
      <form
        className='flex flex-col space-y-5 mt-8 w-full'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EmailPasswordField control={form.control} field='email' />
        <EmailPasswordField control={form.control} field='password' />

        <Button className='w-full py-5' type='submit'>
          {t('forms.login')}
        </Button>

        <div className='flex flex-col space-y-1 text-destructive'>
          {Object.entries(errors).map(([fieldName, error]) => (
            <ErrorMessage key={fieldName} errorMessage={error.message!} />
          ))}
          {submitError.status && (
            <ErrorMessage errorMessage={submitError.message!} />
          )}
        </div>
      </form>
      <div className='flex justify-center my-3'>
        <Button
          onClick={() => toggleIsVisible()}
          variant={'link'}
          className=' text-sm text-primary hover:underline'
        >
          {t('forms.forgotPwd')}
        </Button>
      </div>
      <hr />
      <div className='flex items-center justify-center flex-wrap pt-6'>
        <p>{t('forms.noAccountYet')}</p>
        &nbsp;
        <Link to='/sign-up'>
          <Button variant={'link'} className='text-primary hover:underline'>
            {t('forms.createAccount')}
          </Button>
        </Link>
      </div>
    </Form>
  );
};

export default AuthForm;
