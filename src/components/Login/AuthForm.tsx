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
  const { errors } = useFormState({ control: form.control });
  const { reset } = form;
  const { connectUser } = useAuth();
  const [submitError, setSubmitError] = useState<SubmitErrorType>({
    status: false,
    message: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const resetSubmitErrors = () =>
    setSubmitError({ status: false, message: null });

  const onSubmit = async (
    values: z.infer<ReturnType<typeof createLoginFormSchema>>
  ) => {
    resetSubmitErrors();

    setIsLoading(true);
    const setConnection = await connectUser(values);
    if (setConnection?.success) {
      console.log(setConnection.message);
    } else {
      setSubmitError({ status: true, message: setConnection?.message });
      console.log(setConnection?.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    reset();
  }, [isVisible, reset]);

  if (!isVisible) return null;

  return (
    <Form {...form}>
      <form
        className='flex flex-col space-y-5 mt-8 w-full '
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EmailPasswordField control={form.control} field='email' />
        <EmailPasswordField control={form.control} field='password' />

        <div className='relative pb-14'>
          <Button className='w-full py-5' type='submit' disabled={isLoading}>
            {t('forms.login')}
          </Button>

          <div className='w-full flex flex-col items-center space-y-1 absolute bottom-0 mt-0.5'>
            {Object.entries(errors).map(([fieldName, error]) => (
              <ErrorMessage key={fieldName} errorMessage={error.message!} />
            ))}
            {submitError.status && (
              <ErrorMessage errorMessage={submitError.message!} />
            )}
          </div>
        </div>
      </form>
      <div className='flex justify-center mt-0 my-3'>
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
