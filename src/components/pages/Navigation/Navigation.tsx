import { LuCalculator } from 'react-icons/lu';
import { MdMiscellaneousServices } from 'react-icons/md';

import { PageHeading } from '@/app/components/PageHeading/PageHeading';
import { NavigationContainer } from './components/NavigationContainer/NavigationContainer';
import { NavigationLinkCard } from './components/NavigationLinkCard/NavigationLinkCard';

export const Navigation = () => {
  return (
    <div>
      <PageHeading
        title="Navigation"
        subtitle="Find all available tools here"
      />
      <NavigationContainer>
        <NavigationLinkCard
          href="/navigation/calculators"
          icon={<LuCalculator />}
          title="Calculators"
          subtitle="Make your computer do math for you"
        />
        <NavigationLinkCard
          href="/navigation/specialized-tools"
          icon={<MdMiscellaneousServices />}
          title="Specialized tools"
          subtitle="Tools that are too specific for any other category"
        />
      </NavigationContainer>
    </div>
  );
};
