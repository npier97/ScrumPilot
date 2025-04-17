import AuthForm from '../AuthForm';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <div className='w-screen h-screen flex justify-center items-center text-sm container mx-auto'>
      <div className='shadow-lg rounded-xl w-full sm:w-[450px] p-6 flex flex-col items-center'>
        <div className='flex'>
          <h1 className='text-2xl font-bold text-center'>
            {t('forms.signupTitle')}
          </h1>
        </div>
        <AuthForm authType='sign-up' />
      </div>
    </div>
  );
};

export default Signup;
