import { Button } from '../ui/button';
import { Form } from '../ui/form';
import EmailPasswordField from './EmailPasswordField';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormSchemaType, createAuthFormSchema } from '../../../zod.schemas';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ErrorMessage from './ErrorMessage';
import FormFooter from './FormFooter';
import { SubmitErrorType, AuthFormProps } from '@/types/Auth';
import { useNavigate } from '@tanstack/react-router';
import ForgotPasswordButton from './ForgotPasswordButton';

const AuthForm = ({
  isVisible = true,
  toggleIsVisible,
  authType
}: AuthFormProps) => {
  const isSignupForm = authType === 'sign-up';
  const { t } = useTranslation();
  const formSchema = createAuthFormSchema(authType, t);
  const form = useForm<AuthFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { isSubmitting } = useFormState({ control: form.control });
  const { reset } = form;
  const { connectUser, createUser, isAuthenticated } = useAuth();
  const authAction = isSignupForm ? createUser : connectUser;
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<SubmitErrorType>({
    status: false,
    message: null
  });
  const inputValidationMode = isSignupForm ? 'manual' : 'auto';
  const resetSubmitErrors = () =>
    setSubmitError({ status: false, message: null });

  const onSubmit = async (values: AuthFormSchemaType) => {
    resetSubmitErrors();
    const setConnection = await authAction(values);
    if (!setConnection?.success) {
      setSubmitError({ status: true, message: setConnection?.message });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
    }
    if (!isVisible) {
      reset();
    }
  }, [isAuthenticated, navigate, isVisible, reset]);

  if (!isVisible) return null;
  return (
    <Form {...form}>
      <form
        className='flex flex-col space-y-3 mt-8 w-full'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EmailPasswordField
          withValidations={inputValidationMode}
          field='email'
        />
        <EmailPasswordField
          withValidations={inputValidationMode}
          field='password'
        />
        <div>
          <Button className='w-full py-5' type='submit' disabled={isSubmitting}>
            {isSignupForm ? t('forms.signup') : t('forms.login')}
          </Button>

          <div className='w-full flex flex-col items-center space-y-1 min-h-4 mt-1'>
            {submitError.status && (
              <ErrorMessage errorMessage={submitError.message!} />
            )}
          </div>
        </div>
      </form>
      {toggleIsVisible && <ForgotPasswordButton action={toggleIsVisible} />}
      <FormFooter authType={authType} />
    </Form>
  );
};

export default AuthForm;
