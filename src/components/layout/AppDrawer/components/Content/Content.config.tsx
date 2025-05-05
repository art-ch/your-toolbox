import { LuCalculator } from 'react-icons/lu';
import { MdMiscellaneousServices } from 'react-icons/md';

export const APP_DRAWER_CONTENT = [
  {
    icon: <LuCalculator />,
    translationKey: 'common:calculators',
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
    translationKey: 'common:specializedTools',
    url: '/specialized-tools',
    items: [
      {
        title: 'Rail Signalling Info',
        url: 'https://rail-signalling-info.netlify.app/'
      }
    ]
  }
];
