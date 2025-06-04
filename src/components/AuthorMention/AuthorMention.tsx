import React from 'react';

import { AuthorMentionType } from '@/types/types';

import { Link } from '../Link/Link';
import { useTranslation } from 'react-i18next';

export type AuthorMentionProps = AuthorMentionType & { className?: string };

export const AuthorMention = ({
  name,
  href,
  className
}: AuthorMentionProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      {' '}
      {t('byAuthor')}{' '}
      <Link href={href} className={className}>
        {name}
      </Link>
    </>
  );
};
