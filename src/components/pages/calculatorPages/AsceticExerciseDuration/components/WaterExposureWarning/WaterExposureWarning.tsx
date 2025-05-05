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
import { formatTime } from '@/utils/timeUtils';
import { useTranslation } from 'react-i18next';

export type WaterExposureWarningProps = {
  temperature: number;
  duration: number;
  formattedDuration: string;
};

export const WaterExposureWarning = ({
  temperature,
  duration,
  formattedDuration
}: WaterExposureWarningProps) => {
  const { t } = useTranslation('asceticExerciseDuration');

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
                duration: formattedDuration
              })}
            </p>
          ) : (
            <p className="text-amber-500">
              {t('extremelyColdWaterForTrainedSpecialists', {
                duration: t('common:time.minutes', {
                  count: MAX_SAFE_DURATION_EXTREME_COLD
                })
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
                duration: formattedDuration
              })}
            </p>
          ) : (
            <p className="text-amber-500">
              {t('veryColdWaterTrainedIndividuals', {
                duration: t('common:time.minutes', {
                  count: MAX_SAFE_DURATION_VERY_COLD
                })
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
                duration: formattedDuration
              })}
            </p>
          ) : (
            <p className="text-emerald-500">
              {t('coldWaterTrainedIndividuals', {
                duration: t('common:time.minutes', {
                  count: MAX_SAFE_DURATION_COLD
                })
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
                duration: formattedDuration
              })}
            </p>
          ) : (
            <p className="text-emerald-500">
              {t('normalWaterSafeForExposure', {
                duration: formatTime(MAX_SAFE_DURATION_NORMAL, t)
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
                duration: formattedDuration
              })}
            </p>
          ) : (
            <p className="text-emerald-500">
              {t('warmWaterLimitExposure', {
                duration: formatTime(MAX_SAFE_DURATION_WARM, t)
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
                duration: formattedDuration
              })}
            </p>
          ) : (
            <p className="text-red-500">
              {t('hotWaterNotSuitableForExercising', {
                duration: formatTime(MAX_SAFE_DURATION_HOT, t)
              })}
            </p>
          )}
        </>
      )}
    </>
  );
};
