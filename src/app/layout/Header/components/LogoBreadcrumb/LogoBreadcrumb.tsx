import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { getBreadcrumbItems } from './LogoBreadcrumb.utils';
import { BreadcrumbItemWithSeparator } from './components/BreadcrumbItemWithSeparator/BreadcrumbItemWithSeparator';
import { IntermediateBreadcrumbItems } from './components/IntermediateBreadcrumbItems/IntermediateBreadcrumbItems';

export const LogoBreadcrumb = () => {
  const pathName = usePathname();

  const { intermediateBreadcrumbItems, breadcrumbTitle } =
    getBreadcrumbItems(pathName);

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-x-0.5 gap-y-0 sm:gap-1.5 md:gap-2 xl:gap-2.5">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-primary text-lg">
            your-toolbox
          </BreadcrumbLink>
        </BreadcrumbItem>

        {intermediateBreadcrumbItems.length > 0 && (
          <IntermediateBreadcrumbItems
            breadcrumbItems={intermediateBreadcrumbItems}
          />
        )}

        {breadcrumbTitle && (
          <BreadcrumbItemWithSeparator breadcrumbItem={breadcrumbTitle} />
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
