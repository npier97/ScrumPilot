import { LANGUAGES } from '@/utils/i18n/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('🇬🇧');
  const { t, i18n } = useTranslation();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setCurrentLanguage(code === 'en' ? '🇬🇧' : '🇫🇷');
    setIsOpen(false);
  };

  return (
    <div className='p-2'>
      <button
        className='text-blue-60 hover:text-accent-foreground'
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('ariaLanguageSelection')}
      >
        {currentLanguage}
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-30 bg-white border border-gray-300 shadow-lg rounded-md'>
          {LANGUAGES.map((language) => (
            <button
              key={`${language.code}`}
              className='block px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-accent-foreground'
              onClick={() => changeLanguage(language.code)}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
