import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import LanguageDropdown from '../LanguageDropdown';
import { useTranslation } from 'react-i18next';

const MenuItem = ({ link, label }: { link: string; label: string }) => (
  <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <Link to={link} data-testid='menu-items'>
        {label}
      </Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavigationMenu
      className={`${isScrolled && 'shadow-md'} transition-all duration-300 ease-in-out z-50`}
    >
      <NavigationMenuList>
        <MenuItem link='/' label='Scrum Pilot' />
      </NavigationMenuList>
      <NavigationMenuList>
        <MenuItem link='/login' label={t('logIn')} />
        <MenuItem link='/sign-up' label={t('signUp')} />
        <LanguageDropdown />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
