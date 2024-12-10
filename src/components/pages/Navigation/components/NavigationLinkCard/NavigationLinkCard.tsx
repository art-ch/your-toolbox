import React from 'react';

import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Href } from '@/types/types';

export type NavigationLinkCardProps = {
  href: Href;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

export const NavigationLinkCard = ({
  href,
  icon,
  title,
  subtitle
}: NavigationLinkCardProps) => {
  return (
    <Link href={href}>
      <Card className="min-h-full">
        <CardHeader>
          <CardTitle className="flex gap-2 text-xl md:text-2xl">
            <div className="mt-0.5">{icon}</div>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{subtitle}</CardContent>
      </Card>
    </Link>
  );
};
