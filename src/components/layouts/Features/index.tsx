import { Clock, Users, ChartSpline } from 'lucide-react';

const Feature = () => {
  const features = [
    {
      title: 'Time-Efficient Meetings',
      icon: Clock,
      description:
        'Keep your standups focused and productive with built-in timers and prompts.'
    },
    {
      title: 'Team Collaboration',
      icon: Users,
      description:
        'Connect seamlessly with your team members, no matter where they are.'
    },
    {
      title: 'Progress Tracking',
      icon: ChartSpline,
      description: 'Monitor team progress and identify blockers in real-time.'
    }
  ];

  if (!features) {
    return;
  }

  return (
    <div className='container mx-auto w-full flex max-lg:flex-col max-lg:space-y-5 lg:space-x-7 pb-14'>
      {features.map(({ title, icon: Icon, description }, idx) => (
        <div
          key={idx}
          className=' shadow rounded flex-1 flex flex-col items-start px-5 py-5 '
        >
          <Icon strokeWidth={'3px'} className='text-blue-500' />
          <p className='mt-1 font-bold'>{title}</p>
          <p className='mt-3'>{description}</p>
        </div>
      ))}
    </div>
  );
};

export default Feature;
