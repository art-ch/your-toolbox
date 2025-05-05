import React from 'react';

import { AuthorMentionType } from '@/types/types';

import { Link } from '../Link/Link';

export type AuthorMentionProps = AuthorMentionType & { className?: string };

export const AuthorMention = ({
  name,
  href,
  className
}: AuthorMentionProps) => {
  return (
    <>
      {' '}
      by{' '}
      <Link href={href} className={className}>
        {name}
      </Link>
    </>
  );
};
