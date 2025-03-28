// This page is used for testing Firebase functionality in a playground-like environment.
// It allows us to experiment with Firebase services and verify their behavior
import { auth } from '@/firebase-config';
import { createFileRoute } from '@tanstack/react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/firebase-playground')({
  component: RouteComponent
});

const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

function RouteComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <section className='container mx-auto w-full pt-40 pb-20 flex flex-col gap-6 items-center justify-center lg:flex-row'>
      <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex flex-col items-center gap-2'>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Email address
            </label>
            <Input
              id='email'
              type='email'
              placeholder='john.doe@company.com'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Password
            </label>
            <Input
              id='password'
              type='password'
              placeholder='•••••••••'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button onClick={() => createUser(email, password)}>
            Create User
          </Button>
        </div>
      </div>
    </section>
  );
}
