import { Button } from '../ui/button';
import { Form } from '../ui/form';
import EmailPasswordField from './EmailPasswordField';
import { useForm, useFormState } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLoginFormSchema, LoginFormType } from '../../../zod.schemas';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ErrorMessage from './ErrorMessage';
import CreateAccountSection from './CreateAccountSection';
import { SubmitErrorType } from '@/types/login';

const AuthForm = ({
  isVisible,
  toggleIsVisible
}: {
  isVisible: boolean;
  toggleIsVisible: () => void;
}) => {
  const { t } = useTranslation();
  const formSchema = createLoginFormSchema(t);
  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { isSubmitting } = useFormState({ control: form.control });
  const { reset } = form;
  const { connectUser } = useAuth();
  const [submitError, setSubmitError] = useState<SubmitErrorType>({
    status: false,
    message: null
  });

  const resetSubmitErrors = () =>
    setSubmitError({ status: false, message: null });

  const onSubmit = async (
    values: z.infer<ReturnType<typeof createLoginFormSchema>>
  ) => {
    resetSubmitErrors();
    const setConnection = await connectUser(values);
    if (setConnection?.success) {
      console.log(setConnection.message);
    } else {
      setSubmitError({ status: true, message: setConnection?.message });
      console.log(setConnection?.message);
    }
  };

  useEffect(() => {
    reset();
  }, [isVisible, reset]);

  if (!isVisible) return null;

  return (
    <Form {...form}>
      <form
        className='flex flex-col space-y-3 mt-8 w-full'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EmailPasswordField field='email' />
        <EmailPasswordField field='password' />

        <div>
          <Button className='w-full py-5' type='submit' disabled={isSubmitting}>
            {t('forms.login')}
          </Button>

          <div className='w-full flex flex-col items-center space-y-1 min-h-4 mt-1'>
            {submitError.status && (
              <ErrorMessage errorMessage={submitError.message!} />
            )}
          </div>
        </div>
      </form>
      <div className='flex justify-center mt-0 my-5'>
        <Button
          onClick={() => toggleIsVisible()}
          variant={'link'}
          className=' text-sm text-primary hover:underline'
        >
          {t('forms.forgotPwd')}
        </Button>
      </div>
      <CreateAccountSection />
    </Form>
  );
};

export default AuthForm;
