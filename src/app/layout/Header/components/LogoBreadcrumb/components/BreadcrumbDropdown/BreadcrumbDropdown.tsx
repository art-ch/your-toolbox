import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { BreadcrumbEllipsis, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { BreadcrumbSeparator } from '../BreadcrumbSeparator/BreadcrumbSeparator';
import { LogoBreadcrumbItem } from '../../LogoBreadcrumb.types';

export type BreadcrumbDropdownProps = { breadcrumbItems: LogoBreadcrumbItem[] };

export const BreadcrumbDropdown = ({
  breadcrumbItems
}: BreadcrumbDropdownProps) => {
  return (
    <>
      <BreadcrumbSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center gap-1"
          aria-label="Toggle menu"
        >
          <BreadcrumbEllipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {breadcrumbItems.map((breadcrumbItem) => (
            <DropdownMenuItem key={breadcrumbItem.key}>
              <BreadcrumbLink href={breadcrumbItem.href}>
                {breadcrumbItem.title}
              </BreadcrumbLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
