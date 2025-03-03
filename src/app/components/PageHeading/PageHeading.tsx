import React from 'react';

import { AuthorMention } from '../AuthorMention/AuthorMention';
import { AuthorMentionType } from '@/types/types';
import { cn } from '@/lib/utils';

export type PageTitleProps = {
  title: string;
  authorMention?: AuthorMentionType;
  className?: string;
};

export const PageTitle = ({
  title,
  authorMention,
  className
}: PageTitleProps) => (
  <h1
    className={cn(
      'text-2xl md:text-4xl font-semibold leading-none tracking-tight',
      className
    )}
  >
    {title}
    {authorMention && <AuthorMention {...authorMention} />}
  </h1>
);

export type PageHeadingProps = PageTitleProps & { subtitle?: string };

export const PageHeading = ({
  title,
  subtitle,
  authorMention
}: PageHeadingProps) => {
  return (
    <header className="text-center py-3">
      <PageTitle title={title} authorMention={authorMention} />
      {subtitle && <p className="mt-3">{subtitle}</p>}
    </header>
  );
};

export type ToolPageHeadingProps = PageHeadingProps & {
  icon?: React.ReactNode;
  authorMention?: AuthorMentionType;
};

export const ToolPageHeading = ({
  icon,
  title,
  authorMention,
  subtitle
}: ToolPageHeadingProps) => {
  return (
    <header className="flex gap-2 md:gap-4 justify-center py-3">
      <div className="text-xl sm:text-2xl md:text-4xl pt-0.5">{icon}</div>
      <PageTitle
        title={title}
        authorMention={authorMention}
        className="text-xl sm:text-2xl"
      />
      {subtitle && <p className="mt-3">{subtitle}</p>}
    </header>
  );
};
