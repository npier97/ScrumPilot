import { Button } from '@/components/ui/button';
import { Merge, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

const SubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`w-full px-6 py-4 sticky top-16 flex gap-2 items-center justify-between bg-gray-50  transition-transform duration-300 ${
        isScrolled ? 'translate-y-0 shadow-md' : '-translate-y-full'
      } duration-300 ease-in-out`}
    >
      <div className='flex gap-2'>
        <Input type='text' placeholder='Enter room number' />
        <Button className='bg-blue-600 cursor-pointer hover:bg-blue-500 md:max-w-[300px]'>
          Join room
          <Merge />
        </Button>
      </div>
      <Button className='bg-blue-600 cursor-pointer hover:bg-blue-500 md:max-w-[300px]'>
        Start a room now
        <Plus />
      </Button>
    </div>
  );
};

export default SubNav;
