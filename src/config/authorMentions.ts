import { AuthorMentionType } from '@/types/types';
import { TFunction } from 'i18next';
import { Language } from '@/lib/i18n/types';

export const getTorsunovAuthorMention = (
  t: TFunction,
  language: Language
): AuthorMentionType => ({
  name: t('asceticExerciseDuration:author'),
  href: language === 'ru' ? 'https://torsunov.ru' : 'https://torsunov.ru/en'
});
