interface ForgotPasswordFormProps {
  setShowForgotPasswordForm: React.Dispatch<React.SetStateAction<boolean>>;
}

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormControl, FormLabel } from '../ui/form';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { loginFormSchema } from '../../../zod.schemas';

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  setShowForgotPasswordForm
}) => {
  const formSchema = loginFormSchema.pick({ email: true });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const { errors } = useFormState({ control: form.control });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
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
                <Input type='text' placeholder='Enter your email' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-full py-5' type='submit'>
          Continue
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
          onClick={() => setShowForgotPasswordForm(false)}
          variant={'link'}
          className=' text-sm text-primary hover:underline'
        >
          Back to login
        </Button>
      </div>
      <hr />
      <div className='flex items-center justify-center flex-wrap pt-6'>
        <p>Don't have an account yet ?</p>
        &nbsp;
        <Link to='/sigin'>
          <Button variant={'link'} className='text-primary hover:underline'>
            Create an account
          </Button>
        </Link>
      </div>
    </Form>
  );
};

export default ForgotPasswordForm;
