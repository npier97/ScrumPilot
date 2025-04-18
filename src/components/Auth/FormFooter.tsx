import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { AuthFormType } from '@/types/Auth';

interface FormFooterProps {
  authType: AuthFormType;
}

const FormFooter = ({ authType }: FormFooterProps) => {
  const { t } = useTranslation();
  const isSignupForm = authType === 'sign-up';

  return (
    <>
      <hr />
      <div className='flex items-center justify-center flex-wrap pt-6'>
        {isSignupForm ? (
          <>
            <p>{t('forms.alreadyHaveAccount')}</p>
            &nbsp;
            <Link to='/login'>
              <Button variant={'link'} className='text-primary hover:underline'>
                {t('forms.login')}
              </Button>
            </Link>
          </>
        ) : (
          <>
            <p>{t('forms.noAccountYet')}</p>
            &nbsp;
            <Link to='/sign-up'>
              <Button variant={'link'} className='text-primary hover:underline'>
                {t('forms.createAccount')}
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default FormFooter;
