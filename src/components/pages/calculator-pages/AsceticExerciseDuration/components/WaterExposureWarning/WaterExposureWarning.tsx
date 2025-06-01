'use client';

import React from 'react';

import {
  MAX_SAFE_DURATION_COLD,
  MAX_SAFE_DURATION_EXTREME_COLD,
  MAX_SAFE_DURATION_HOT,
  MAX_SAFE_DURATION_NORMAL,
  MAX_SAFE_DURATION_VERY_COLD,
  MAX_SAFE_DURATION_WARM,
  VERY_COLD_WATER_THRESHOLD,
  WARM_WATER_THRESHOLD
} from './WaterExposureWarning.constants';
import {
  MAX_SAFE_WATER_TEMPERATURE,
  MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED,
  MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED
} from '../../constants/StaticExercise.constants';
import { formatTime } from '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import {
  safeDurationCaseConfig,
  tooLongDurationCaseConfig
} from './WaterExposureWarning.config';
import { parseLanguage } from '@/utils/i18n/parseLanguage';

export type WaterExposureWarningProps = {
  temperature: number;
  duration: number;
};

export const WaterExposureWarning = ({
  temperature,
  duration
}: WaterExposureWarningProps) => {
  const { t, i18n } = useTranslation('asceticExerciseDuration');

  const language = parseLanguage(i18n.language);

  const formattedTooLongDuration = formatTime({
    totalMinutes: duration,
    grammarCaseConfig: tooLongDurationCaseConfig,
    t,
    language
  });

  const formattedSafeExtremeColdDuration = formatTime({
    totalMinutes: MAX_SAFE_DURATION_EXTREME_COLD,
    grammarCaseConfig: safeDurationCaseConfig,
    t,
    language
  });

  const formattedSafeVeryColdDuration = formatTime({
    totalMinutes: MAX_SAFE_DURATION_VERY_COLD,
    grammarCaseConfig: safeDurationCaseConfig,
    t,
    language
  });

  const formattedSafeColdDuration = formatTime({
    totalMinutes: MAX_SAFE_DURATION_COLD,
    grammarCaseConfig: safeDurationCaseConfig,
    t,
    language
  });

  const formattedSafeNormalDuration = formatTime({
    totalMinutes: MAX_SAFE_DURATION_NORMAL,
    grammarCaseConfig: safeDurationCaseConfig,
    t,
    language
  });

  const formattedSafeWarmDuration = formatTime({
    totalMinutes: MAX_SAFE_DURATION_WARM,
    grammarCaseConfig: safeDurationCaseConfig,
    t,
    language
  });

  const formattedSafeHotDuration = formatTime({
    totalMinutes: MAX_SAFE_DURATION_HOT,
    grammarCaseConfig: safeDurationCaseConfig,
    t,
    language
  });

  // Extremely cold water (≤2°C)
  const isExtremelyColdWater =
    temperature <= MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED;
  const isDangerousExtremeColdDuration =
    isExtremelyColdWater && duration > MAX_SAFE_DURATION_EXTREME_COLD;

  // Very cold water (>2°C to ≤10°C)
  const isVeryColdWater =
    temperature > MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED &&
    temperature <= VERY_COLD_WATER_THRESHOLD;
  const isDangerousVeryColdDuration =
    isVeryColdWater && duration > MAX_SAFE_DURATION_VERY_COLD;

  // Cold water (>10°C to <25°C)
  const isColdWater =
    temperature > VERY_COLD_WATER_THRESHOLD &&
    temperature < MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED;
  const isDangerousColdDuration =
    isColdWater && duration > MAX_SAFE_DURATION_COLD;

  // Normal water (≥25°C to <30°C)
  const isNormalWater =
    temperature >= MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED &&
    temperature < WARM_WATER_THRESHOLD;
  const isLongNormalDuration =
    isNormalWater && duration > MAX_SAFE_DURATION_NORMAL;

  // Warm water (≥30°C to ≤40°C)
  const isWarmWater =
    temperature >= WARM_WATER_THRESHOLD &&
    temperature <= MAX_SAFE_WATER_TEMPERATURE;
  const isDangerousWarmDuration =
    isWarmWater && duration > MAX_SAFE_DURATION_WARM;

  // Hot water (>40°C)
  const isHotWater = temperature > MAX_SAFE_WATER_TEMPERATURE;
  const isDangerousHotDuration = isHotWater && duration > MAX_SAFE_DURATION_HOT;

  return (
    <>
      {isExtremelyColdWater && (
        <>
          <p className="text-red-500">
            <strong>{t('extremelyColdWaterDanger')}:</strong>{' '}
            {t('extremelyColdWaterDangerDescription', { temperature })}
          </p>
          {isDangerousExtremeColdDuration ? (
            <p className="text-red-500">
              <strong>{t('extremelyColdWaterDangerousDuration')}:</strong>{' '}
              {t('extremelyColdWaterDangerousDurationDescription', {
                duration: formattedTooLongDuration
              })}
            </p>
          ) : (
            <p className="text-amber-500">
              {t('extremelyColdWaterForTrainedSpecialists', {
                duration: formattedSafeExtremeColdDuration
              })}
            </p>
          )}
        </>
      )}

      {isVeryColdWater && (
        <>
          <p className="text-red-500">
            <strong>{t('veryColdWaterWarning')}:</strong>{' '}
            {t('veryColdWaterWarningDescription', { temperature })}
          </p>
          {isDangerousVeryColdDuration ? (
            <p className="text-red-500">
              <strong>{t('veryColdWaterDangerousDuration')}:</strong>{' '}
              {t('veryColdWaterDangerousDurationDescription', {
                duration: formattedTooLongDuration
              })}
            </p>
          ) : (
            <p className="text-amber-500">
              {t('veryColdWaterTrainedIndividuals', {
                duration: formattedSafeVeryColdDuration
              })}
            </p>
          )}
        </>
      )}

      {isColdWater && (
        <>
          <p className="text-amber-500">
            <strong>{t('coldWaterCaution')}:</strong>{' '}
            {t('coldWaterCautionDescription', { temperature })}
          </p>
          {isDangerousColdDuration ? (
            <p className="text-red-500">
              {t('coldWaterDangerousDuration', {
                duration: formattedTooLongDuration
              })}
            </p>
          ) : (
            <p className="text-emerald-500">
              {t('coldWaterTrainedIndividuals', {
                duration: formattedSafeColdDuration
              })}
            </p>
          )}
        </>
      )}

      {isNormalWater && (
        <>
          <p className="text-emerald-500">
            {t('normalWaterDescription', { temperature })}
          </p>
          {isLongNormalDuration ? (
            <p className="text-amber-500">
              {t('normalWaterLongDuration', {
                duration: formattedTooLongDuration
              })}
            </p>
          ) : (
            <p className="text-emerald-500">
              {t('normalWaterSafeForExposure', {
                duration: formattedSafeNormalDuration
              })}
            </p>
          )}
        </>
      )}

      {isWarmWater && (
        <>
          <p className="text-amber-500">
            <strong>{t('warmWaterNotice')}:</strong>{' '}
            {t('warmWaterNoticeDescription', { temperature })}
          </p>
          {isDangerousWarmDuration ? (
            <p className="text-red-500">
              {t('warmWaterDangerousDuration', {
                duration: formattedTooLongDuration
              })}
            </p>
          ) : (
            <p className="text-emerald-500">
              {t('warmWaterLimitExposure', {
                duration: formattedSafeWarmDuration
              })}
            </p>
          )}
        </>
      )}

      {isHotWater && (
        <>
          <p className="text-red-500">
            <strong>{t('hotWaterDanger')}:</strong>{' '}
            {t('hotWaterDangerDescription', { temperature })}
          </p>
          {isDangerousHotDuration ? (
            <p className="text-red-500">
              <strong>{t('hotWaterDangerousDuration')}:</strong>{' '}
              {t('hotWaterDangerousDurationDescription', {
                duration: formattedTooLongDuration
              })}
            </p>
          ) : (
            <p className="text-red-500">
              {t('hotWaterNotSuitableForExercising', {
                duration: formattedSafeHotDuration
              })}
            </p>
          )}
        </>
      )}
    </>
  );
};
