import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BackToHomeButton = () => {
  const { t } = useTranslation();

  return (
    <Button
      asChild
      variant='ghost'
      size='sm'
      className='px-2 text-blue-600 hover:text-black'
    >
      <Link to='/'>
        <ChevronLeft aria-hidden='true' />
        {t('forms.backToHome')}
      </Link>
    </Button>
  );
};

export default BackToHomeButton;
