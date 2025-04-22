import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

const ForgotPasswordButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className='flex justify-center mt-0 my-5'>
      <Button
        onClick={() => onClick()}
        variant={'link'}
        className=' text-sm text-primary hover:underline'
      >
        {t('forms.forgotPwd')}
      </Button>
    </div>
  );
};

export default ForgotPasswordButton;
