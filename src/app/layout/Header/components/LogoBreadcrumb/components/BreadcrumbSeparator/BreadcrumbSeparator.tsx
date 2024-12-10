import React from 'react';

import { RxSlash } from 'react-icons/rx';
import { BreadcrumbSeparator as ShadcnBreadcrumbSeparator } from '@/components/ui/breadcrumb';

export const BreadcrumbSeparator = () => {
  return (
    <ShadcnBreadcrumbSeparator>
      <RxSlash />
    </ShadcnBreadcrumbSeparator>
  );
};
