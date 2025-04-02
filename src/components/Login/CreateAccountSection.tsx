import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

const CreateAccountSection = () => {
  const { t } = useTranslation();

  return (
    <>
      <hr />
      <div className='flex items-center justify-center flex-wrap pt-6'>
        <p>{t('forms.noAccountYet')}</p>
        &nbsp;
        <Link to='/sign-up'>
          <Button variant={'link'} className='text-primary hover:underline'>
            {t('forms.createAccount')}
          </Button>
        </Link>
      </div>
    </>
  );
};

export default CreateAccountSection;
