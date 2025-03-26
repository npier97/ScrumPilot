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
import { loginFormSchema } from '../../../zod.schemas';

const LogIn = () => {
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = loginFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { errors } = useFormState({ control: form.control });

  const { clearErrors } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const toggleForgotPasswordPage = () => {
    setShowForgotPasswordForm(!showForgotPasswordForm);
    clearErrors(['email', 'password']);
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center text-sm container mx-auto'>
      <div className='shadow-lg rounded-xl w-full sm:w-[450px] p-6'>
        <h1 className='text-2xl font-bold text-center'>
          {!showForgotPasswordForm
            ? 'Login to your account'
            : 'Recover your account'}
        </h1>
        {!showForgotPasswordForm ? (
          <Form {...form}>
            <form
              className='flex flex-col space-y-5 mt-6'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Enter your email (ex: yourname@gmail.com)'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button className='w-full py-5' type='submit'>
                Log in
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
                Forgot your password
              </Button>
            </div>
            <hr />
            <div className='flex items-center justify-center flex-wrap pt-6'>
              <p>Don't have an account yet ?</p>
              &nbsp;
              <Link to='/sigin'>
                <Button
                  variant={'link'}
                  className='text-primary hover:underline'
                >
                  Create an account
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
