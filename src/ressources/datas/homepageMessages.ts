import { Clock, Users, ChartSpline } from 'lucide-react';

const featuresDatas = [
  {
    title: 'featureMessage1',
    icon: Clock,
    description: 'featureMessage2'
  },
  {
    title: 'featureMessage3',
    icon: Users,
    description: 'featureMessage4'
  },
  {
    title: 'featureMessage5',
    icon: ChartSpline,
    description: 'featureMessage6'
  }
];

const footerMessageDatas = [
  {
    title: 'aboutUsTitle',
    content: ['aboutUsMessage']
  },
  {
    title: 'getInTouchTitle',
    content: ['getInTouchMessage']
  },
  {
    title: 'followUsTitle',
    content: ['followUsMessage']
  },
  {
    title: 'resourcesTitle',
    content: ['resourcesMessage1', 'resourcesMessage2', 'resourcesMessage3']
  }
];

export { featuresDatas, footerMessageDatas };
