import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => (
  <section className='pt-40 px-4 pb-20 flex flex-col gap-6 items-center justify-center lg:flex-row'>
    <div className='max-w-md flex flex-col gap-4 items-center text-center lg:items-start lg:text-start'>
      <h1 className='text-2xl font-bold lg:text-4xl'>
        Streamline Your Scrum Meetings
      </h1>
      <h2>
        Connect with your team instantly. Start or join a room to make your
        daily standups more efficient.
      </h2>
      <Button className='bg-blue-600 cursor-pointer hover:bg-blue-500 md:max-w-[300px]'>
        Start a room now
        <Plus />
      </Button>
    </div>
    <img src='/meeting.png' className='w-full max-w-lg' />
  </section>
);

export default Hero;
