import { featuresDatas } from '@/ressources/datas/homepageMessages';
import { useTranslation } from 'react-i18next';

const Feature = () => {
  const { t } = useTranslation();

  return (
    <section className='container mx-auto w-full flex max-lg:flex-col max-lg:space-y-5 lg:space-x-7 py-20'>
      {featuresDatas?.map(({ title, icon: Icon, description }) => (
        <div
          key={`${title}`}
          className=' shadow rounded flex-1 flex flex-col items-start px-5 py-5 '
        >
          <h3 className='mt-1 flex gap-2 font-bold'>
            <Icon
              strokeWidth={'3px'}
              className='text-blue-500'
              aria-hidden='true'
            />
            {t(title)}
          </h3>
          <p className='mt-3 text-sm'>{t(description)}</p>
        </div>
      ))}
    </section>
  );
};

export default Feature;
