import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLoginFormSchema } from '../../../../zod.schemas';
import { useTranslation } from 'react-i18next';
import { ForgotPasswordFormType } from '@/types/Auth';
import { useEffect } from 'react';
import EmailPasswordField from '../EmailPasswordField';
import CreateAccountSection from '../CreateAccountSection';
import ErrorMessage from '../ErrorMessage';
// TODO: improve imports declaration

const ForgotPasswordForm = ({
  isVisible,
  toggleIsVisible
}: {
  isVisible: boolean;
  toggleIsVisible: () => void;
}) => {
  const { t } = useTranslation();
  const formSchema = createLoginFormSchema(t).pick({ email: true });
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });
  const { isSubmitting } = useFormState({ control: form.control });
  const { reset } = form;
  const onSubmit = (values: ForgotPasswordFormType) => {
    // get form values here
  };

  useEffect(() => {
    reset();
  }, [isVisible, reset]);

  if (!isVisible) return null;

  return (
    <Form {...form}>
      <form
        className='flex flex-col space-y-5 mt-6 w-full'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EmailPasswordField field='email' />

        <div className='relative pb-5'>
          <Button className='w-full py-5' type='submit'>
            {t('forms.continue')}
          </Button>
          <div className='flex flex-col w-full text-center text-xs space-y-1 absolute bottom-0 mt-0.5 '>
            {/* TODO: handle submit errors  */}
            <ErrorMessage errorMessage={'submitError.message!'} />
          </div>
        </div>
      </form>

      <div className='flex justify-center my-3'>
        <Button
          onClick={() => toggleIsVisible()}
          variant={'link'}
          className='text-sm text-primary hover:underline'
          disabled={isSubmitting}
        >
          {t('forms.backToLogin')}
        </Button>
      </div>

      <CreateAccountSection />
    </Form>
  );
};

export default ForgotPasswordForm;
