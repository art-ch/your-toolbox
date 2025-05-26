import { TFunction } from 'i18next';
import { convertMinutesToHoursAndMinutes } from '@/utils/timeUtils';
import { applyGrammarCase, GrammarCaseConfig } from './applyGrammarCase';

export type FormatTimeProps = {
  totalMinutes: number;
  grammarCaseConfig?: GrammarCaseConfig;
  t: TFunction;
  language: string;
};

export function formatTime({
  totalMinutes,
  grammarCaseConfig,
  t,
  language
}: FormatTimeProps): string {
  const { hours, minutes } = convertMinutesToHoursAndMinutes(totalMinutes);

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
    minutes > 0 || hours === 0
      ? t(minuteTranslationKey, { count: minutes })
      : '';

  const connector = hours > 0 && minutes > 0 ? t('time:and') : '';

  return `${hourPart} ${connector} ${minutePart}`.trim();
}

export const formatDays = (days: number, t: TFunction) => {
  if (days === 1) {
    return t('time:everyday');
  }

  return t('time:days', { count: days });
};
