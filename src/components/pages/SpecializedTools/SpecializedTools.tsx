'use client';

import React from 'react';

import { MdMiscellaneousServices } from 'react-icons/md';
import { NavigationContainer } from '../Navigation/components/NavigationContainer/NavigationContainer';
import { NavigationLinkCard } from '../Navigation/components/NavigationLinkCard/NavigationLinkCard';
import { PageHeading } from '@/components/PageHeading/PageHeading';
import { useTranslation } from 'react-i18next';

export const SpecializedTools = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeading
        title={t('common:specializedTools')}
        subtitle={t('common:specializedToolsDescription')}
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
