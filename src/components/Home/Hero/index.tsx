import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useCreateRoom } from '@/hooks/useCreateRoom';

const Hero = () => {
  const { t } = useTranslation();
  const { createNewRoom } = useCreateRoom();

  const handleClick = () => createNewRoom();

  return (
    <section className='py-20 px-4 flex flex-col gap-6 items-center justify-center lg:flex-row'>
      <div className='max-w-md flex flex-col gap-4 items-center text-center lg:items-start lg:text-start'>
        <h1 className='text-2xl font-bold lg:text-4xl'>{t('heroTitle')}</h1>
        <h2>{t('heroSubTitle')}</h2>
        <Button
          className='bg-blue-600 cursor-pointer hover:bg-blue-500 md:max-w-[300px]'
          aria-label={t('heroCTAMessage')}
          onClick={handleClick}
        >
          {t('heroCTAMessage')}
          <Plus aria-hidden='true' />
        </Button>
      </div>
      <img
        src='/meeting.png'
        alt={t('heroImageAltMessage')}
        className='w-full max-w-lg'
      />
    </section>
  );
};

export default Hero;
