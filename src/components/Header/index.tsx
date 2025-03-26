import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

const MenuItem = ({ link, label }: { link: string; label: string }) => (
  <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <Link to={link}>{label}</Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavigationMenu
      className={`${isScrolled && 'bg-blue-600 text-white'} transition-all duration-300 ease-in-out`}
    >
      <NavigationMenuList>
        <MenuItem link='/' label='Scrum Pilot' />
      </NavigationMenuList>
      <NavigationMenuList>
        <MenuItem link='/login' label='Login' />
        <MenuItem link='/sign-up' label='Sign up' />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
