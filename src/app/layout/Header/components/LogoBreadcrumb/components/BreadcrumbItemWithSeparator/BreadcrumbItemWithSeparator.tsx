import React from 'react';

import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { BreadcrumbSeparator } from '../BreadcrumbSeparator/BreadcrumbSeparator';
import { LogoBreadcrumbItem } from '../../LogoBreadcrumb.types';

export type BreadcrumbItemWithSeparatorProps = {
  breadcrumbItem: LogoBreadcrumbItem;
};

export const BreadcrumbItemWithSeparator = ({
  breadcrumbItem
}: BreadcrumbItemWithSeparatorProps) => {
  const { title, href } = breadcrumbItem;

  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        {href ? <BreadcrumbLink href={href}>{title}</BreadcrumbLink> : title}
      </BreadcrumbItem>
    </>
  );
};
