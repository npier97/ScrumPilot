import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormControl, FormLabel } from '../ui/form';
import { Link } from '@tanstack/react-router';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLoginFormSchema } from '../../../zod.schemas';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../LanguageDropdown/index';

const LogIn = () => {
  const { t } = useTranslation();
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = createLoginFormSchema(t);

  const form = useForm<z.infer<ReturnType<typeof createLoginFormSchema>>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { errors } = useFormState({ control: form.control });
  const { clearErrors } = form;

  const onSubmit = (
    values: z.infer<ReturnType<typeof createLoginFormSchema>>
  ) => {
    console.log(values);
  };

  const toggleForgotPasswordPage = () => {
    setShowForgotPasswordForm(!showForgotPasswordForm);
    clearErrors(['email', 'password']);
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center text-sm container mx-auto'>
      <div className='shadow-lg rounded-xl w-full sm:w-[450px] p-6 flex flex-col items-center'>
        <div className='flex'>
          <h1 className='text-2xl font-bold text-center'>
            {!showForgotPasswordForm
              ? 'Login to your account'
              : 'Recover your account'}
          </h1>

          <div className='relative'>
            <LanguageDropdown />
          </div>
        </div>

        {!showForgotPasswordForm ? (
          <Form {...form}>
            <form
              className='flex flex-col space-y-5 mt-8 w-full'
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
                        value={field.value ?? ''}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='relative'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('forms.password')}</FormLabel>
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

              <Button className='w-full py-5' type='submit'>
                {t('forms.login')}
              </Button>

              <div className='flex flex-col text-xs space-y-1'>
                {Object.entries(errors).map(([fieldName, error]) => (
                  <p key={fieldName} className='text-red-500'>
                    {error.message}
                  </p>
                ))}
              </div>
            </form>

            <div className=' flex justify-center my-3'>
              <Button
                onClick={() => toggleForgotPasswordPage()}
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
              <Link to='/sigin'>
                <Button
                  variant={'link'}
                  className='text-primary hover:underline'
                >
                  {t('forms.createAccount')}
                </Button>
              </Link>
            </div>
          </Form>
        ) : (
          <ForgotPasswordForm
            setShowForgotPasswordForm={toggleForgotPasswordPage}
          />
        )}
      </div>
    </div>
  );
};

export default LogIn;
