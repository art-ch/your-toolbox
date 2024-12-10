import React from 'react';

import { BreadcrumbItemWithSeparator } from '../BreadcrumbItemWithSeparator/BreadcrumbItemWithSeparator';
import { useBreakpoint } from '@/hooks/useBreakpoint/useBreakpoint';
import { BreadcrumbDropdown } from '../BreadcrumbDropdown/BreadcrumbDropdown';
import { LogoBreadcrumbItem } from '../../LogoBreadcrumb.types';

export type IntermediateBreadcrumbItemsProps = {
  breadcrumbItems: LogoBreadcrumbItem[];
};

export const IntermediateBreadcrumbItems = ({
  breadcrumbItems
}: IntermediateBreadcrumbItemsProps) => {
  const breakpoint = useBreakpoint();

  if (!breakpoint.sm) {
    return <BreadcrumbDropdown breadcrumbItems={breadcrumbItems} />;
  }

  if (breakpoint.md && breadcrumbItems.length > 1) {
    return (
      <>
        <BreadcrumbDropdown breadcrumbItems={breadcrumbItems.slice(0, -1)} />
        <BreadcrumbItemWithSeparator
          breadcrumbItem={breadcrumbItems[breadcrumbItems.length - 1]}
        />
      </>
    );
  }

  return (
    <>
      {breadcrumbItems.map((breadcrumbItem) => (
        <BreadcrumbItemWithSeparator
          key={breadcrumbItem.key}
          breadcrumbItem={breadcrumbItem}
        />
      ))}
    </>
  );
};
