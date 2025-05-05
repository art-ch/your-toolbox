import React from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const linkVariants = cva('', {
  variants: {
    variant: {
      light: 'text-blue-400 hover:text-blue-300 focus:text-blue-500',
      default: 'text-blue-500 hover:text-blue-400 focus:text-blue-600'
    }
  },
  defaultVariants: { variant: 'default' }
});

export type LinkProps = NextLinkProps &
  VariantProps<typeof linkVariants> & {
    children?: React.ReactNode;
    className?: string;
  };

export const Link = ({ children, variant, className, ...props }: LinkProps) => {
  return (
    <NextLink {...props} className={cn(linkVariants({ variant, className }))}>
      {children}
    </NextLink>
  );
};
