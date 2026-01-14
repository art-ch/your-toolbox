import { TFunction } from 'i18next';
import { convertMinutesToHoursAndMinutes } from '@/utils/timeUtils';
import { applyGrammarCase, GrammarCaseConfig } from './applyGrammarCase';
import { Language } from '@/lib/i18n/types';

export type FormatTimeProps = {
  totalMinutes: number;
  grammarCaseConfig?: GrammarCaseConfig;
  t: TFunction;
  language: Language;
};

export function formatTime({
  totalMinutes,
  grammarCaseConfig,
  t,
  language
}: FormatTimeProps): string {
  const { hours, minutes, seconds } =
    convertMinutesToHoursAndMinutes(totalMinutes);

  const hourTranslationKey = applyGrammarCase(
    'time:hours',
    language,
    grammarCaseConfig
  );

  const hourPart = hours > 0 ? t(hourTranslationKey, { count: hours }) : '';

  const minuteTranslationKey = applyGrammarCase(
    'time:minutes',
    language,
    grammarCaseConfig
  );

  const minutePart =
    minutes > 0 ? t(minuteTranslationKey, { count: minutes }) : '';

  const secondTranslationKey = applyGrammarCase(
    'time:seconds',
    language,
    grammarCaseConfig
  );

  const secondPart =
    seconds > 0 ? t(secondTranslationKey, { count: seconds }) : '';

  const parts = [hourPart, minutePart, secondPart].filter(
    (part) => part !== ''
  );

  // If no parts have values, show 0 seconds
  if (parts.length === 0) {
    return t(secondTranslationKey, { count: 0 });
  }

  // If only one part has a value
  if (parts.length === 1) {
    return parts[0];
  }

  // If two parts have values
  if (parts.length === 2) {
    return `${parts[0]} ${t('time:and')} ${parts[1]}`.trim();
  }

  // For 3 parts (hours, minutes, seconds)
  return `${parts[0]} ${parts[1]} ${t('time:and')} ${parts[2]}`.trim();
}

export const formatDays = (days: number, t: TFunction) => {
  if (days === 1) {
    return t('time:everyday');
  }

  return t('time:days', { count: days });
};
