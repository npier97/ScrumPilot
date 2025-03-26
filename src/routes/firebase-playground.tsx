// This page is used for testing Firebase functionality in a playground-like environment.
// It allows us to experiment with Firebase services and verify their behavior
import { auth } from '@/firebase-config';
import { createFileRoute } from '@tanstack/react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

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
          <h1 className='mb-8'>Authentication</h1>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Email address
            </label>
            <input
              type='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
            <input
              type='password'
              id='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='•••••••••'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            onClick={() => createUser(email, password)}
            className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 cursor-pointer'
          >
            <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
              Red to Yellow
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
