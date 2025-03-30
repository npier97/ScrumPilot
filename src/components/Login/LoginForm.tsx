import AuthForm from './AuthForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LogIn = () => {
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const toggleForgotPasswordPage = () => {
    setShowForgotPasswordForm(!showForgotPasswordForm);
  };
  const { t } = useTranslation();

  return (
    <div className='w-screen h-screen flex justify-center items-center text-sm container mx-auto'>
      <div className='shadow-lg rounded-xl w-full sm:w-[450px] p-6 flex flex-col items-center'>
        <div className='flex'>
          <h1 className='text-2xl font-bold text-center'>
            {!showForgotPasswordForm
              ? t('forms.loginTitle')
              : t('forms.forgotPwdTitle')}
          </h1>
        </div>
        <AuthForm
          isVisible={!showForgotPasswordForm}
          toggleIsVisible={toggleForgotPasswordPage}
        />
        <ForgotPasswordForm
          isVisible={showForgotPasswordForm}
          toggleIsVisible={toggleForgotPasswordPage}
        />
      </div>
    </div>
  );
};

export default LogIn;
