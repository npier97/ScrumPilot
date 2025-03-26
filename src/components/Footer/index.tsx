import { footerMessageDatas } from '@/ressources/datas/homepageMessages';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className='w-full py-10 px-8 bg-blue-600 text-white shadow-lg'>
      <div className='mb-8 flex flex-col justify-center gap-8 md:gap-20 lg:gap-40 md:flex-row md:space-y-0'>
        {footerMessageDatas.map(({ title, content }) => (
          <div key={`${title}`} className='flex flex-col md:max-w-xs'>
            <div className='mb-2 md:mb-4 font-bold'>{t(title)}</div>
            {content.map((item, index) => (
              <div key={`${title}-${index}`} className='text-gray-200'>
                {t(item)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='md:text-center'>
        &copy; {new Date().getFullYear()} Scrum Pilot. {t('rightsReserved')}
      </div>
    </footer>
  );
};

export default Footer;
