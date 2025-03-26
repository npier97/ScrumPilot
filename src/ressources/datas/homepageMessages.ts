import { Clock, Users, ChartSpline } from 'lucide-react';

const featuresDatas = [
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

const footerMessageDatas = [
  {
    title: 'Abous Us',
    content: [
      'Making agile meetings more efficient and productive for teams worldwide'
    ]
  },
  {
    title: 'Get in Touch',
    content: ['TBD']
  },
  {
    title: 'Follow Us',
    content: ['TBD']
  },
  {
    title: 'Resources',
    content: ['Documentation', 'Blog', 'Support']
  }
];

export { featuresDatas, footerMessageDatas };
