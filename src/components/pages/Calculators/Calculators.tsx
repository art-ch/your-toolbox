import { LuCalculator } from 'react-icons/lu';
import { PageHeading } from '@/app/components/PageHeading/PageHeading';
import { NavigationContainer } from '../Navigation/components/NavigationContainer/NavigationContainer';
import { NavigationLinkCard } from '../Navigation/components/NavigationLinkCard/NavigationLinkCard';

export const Calculators = () => {
  return (
    <div>
      <PageHeading
        title="Calculators"
        subtitle="Find all available calculators here"
      />
      <NavigationContainer>
        <NavigationLinkCard
          href="/navigation/calculators/ascetic-exercise-duration"
          icon={<LuCalculator />}
          title="Ascetic Exercise Duration"
          subtitle="Regular exercising boosts your well-being. Use this calculator to determine your workout duration."
        />
      </NavigationContainer>
    </div>
  );
};
