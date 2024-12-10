import React from 'react';

import { MdMiscellaneousServices } from 'react-icons/md';
import { PageHeading } from '@/app/components/PageHeading/PageHeading';
import { NavigationContainer } from '../Navigation/components/NavigationContainer/NavigationContainer';
import { NavigationLinkCard } from '../Navigation/components/NavigationLinkCard/NavigationLinkCard';

export const SpecializedTools = () => {
  return (
    <div>
      <PageHeading
        title="Specialized tools"
        subtitle="Tools that are too specific for any other category"
      />
      <NavigationContainer>
        <NavigationLinkCard
          href="https://rail-signalling-info.netlify.app/"
          icon={<MdMiscellaneousServices />}
          title="Rail Signaling Info"
          subtitle="A tool for railfans to search for signal aspect meaning info"
        />
      </NavigationContainer>
    </div>
  );
};
