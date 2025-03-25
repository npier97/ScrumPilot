import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { Link } from '@radix-ui/react-navigation-menu';
import { useEffect, useState } from 'react';

const MenuItem = ({ href, label }: { href: string; label: string }) => (
  <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <Link href={href}>{label}</Link>
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
      <div>Scrum Pilot</div>
      <NavigationMenuList>
        <MenuItem href='#' label='Login' />
        <MenuItem href='#' label='Sign up' />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
