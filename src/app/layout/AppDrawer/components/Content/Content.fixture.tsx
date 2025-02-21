import { LuCalculator } from 'react-icons/lu';
import { MdMiscellaneousServices } from 'react-icons/md';

export const APP_DRAWER_CONTENT = [
  {
    icon: <LuCalculator />,
    title: 'Calculators',
    url: '/calculators',
    items: [
      {
        title: 'Ascetic Exercise Duration',
        url: '/calculators/ascetic-exercise-duration'
      }
    ]
  },
  {
    icon: <MdMiscellaneousServices />,
    title: 'Specialized Tools',
    url: '/specialized-tools',
    items: [
      {
        title: 'Rail Signalling Info',
        url: 'https://rail-signalling-info.netlify.app/'
      }
    ]
  }
];
