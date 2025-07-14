import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useCurrentSidebar } from '@/store';
import { PanelRight } from 'lucide-react';

const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();
  const { toggleActiveSidebar } = useCurrentSidebar();

  return (
    <Button
      variant='ghost'
      onClick={() => {
        toggleActiveSidebar();
        toggleSidebar();
      }}
      className='flex flex-col items-center justify-center h-screen p-0'
    >
      <PanelRight />
      <span className='flex flex-col items-center leading-none text-xs'>
        {'TASKS'.split('').map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </span>
    </Button>
  );
};

export default SidebarToggle;
