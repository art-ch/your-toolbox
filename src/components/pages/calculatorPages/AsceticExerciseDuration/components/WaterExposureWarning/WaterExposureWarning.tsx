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

export type WaterExposureWarningProps = {
  temperature: number;
  duration: number;
};

export const WaterExposureWarning = ({
  temperature,
  duration
}: WaterExposureWarningProps) => {
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
            <strong>EXTREME DANGER:</strong> Water at {temperature}°C is below
            the minimum safe temperature even for trained individuals.
          </p>
          {isDangerousExtremeColdDuration ? (
            <p className="text-red-500">
              <strong>URGENT:</strong> {duration} minutes exceeds safe limits.
              Choose a warmer water source.
            </p>
          ) : (
            <p className="text-amber-500">
              Only trained cold water specialists should exercise in this water.
              Limit exposure to less than {MAX_SAFE_DURATION_EXTREME_COLD}{' '}
              minutes.
            </p>
          )}
        </>
      )}

      {isVeryColdWater && (
        <>
          <p className="text-red-500">
            <strong>WARNING:</strong> Water at {temperature}°C is only safe for
            trained cold water individuals.
          </p>
          {isDangerousVeryColdDuration ? (
            <p className="text-red-500">
              <strong>DANGER:</strong> {duration} minutes exceeds safe limits
              even for trained individuals. Consider a warmer water source.
            </p>
          ) : (
            <p className="text-amber-500">
              Trained individuals should limit exposure to less than{' '}
              {MAX_SAFE_DURATION_VERY_COLD} minutes. Not safe for untrained
              individuals.
            </p>
          )}
        </>
      )}

      {isColdWater && (
        <>
          <p className="text-amber-500">
            <strong>CAUTION:</strong> Water at {temperature}°C is below the
            minimum safe temperature for untrained individuals.
          </p>
          {isDangerousColdDuration ? (
            <p className="text-red-500">
              {duration} minutes exceeds recommended duration for trained
              individuals. Risk of hypothermia increases.
            </p>
          ) : (
            <p className="text-emerald-500">
              Only trained individuals should exercise in this water. Limit
              exposure to less than {MAX_SAFE_DURATION_COLD} minutes.
            </p>
          )}
        </>
      )}

      {isNormalWater && (
        <>
          <p className="text-emerald-500">
            Water at {temperature}°C is within safe range for untrained
            individuals.
          </p>
          {isLongNormalDuration ? (
            <p className="text-amber-500">
              {duration} minutes is an extended session. Consider taking
              periodic breaks to rest.
            </p>
          ) : (
            <p className="text-emerald-500">
              Safe for exposure for up to {formatTime(MAX_SAFE_DURATION_NORMAL)}
              .
            </p>
          )}
        </>
      )}

      {isWarmWater && (
        <>
          <p className="text-amber-500">
            <strong>NOTICE:</strong> Water at {temperature}°C is warm and
            approaching maximum safe temperature.
          </p>
          {isDangerousWarmDuration ? (
            <p className="text-red-500">
              {duration} minutes exceeds recommended duration. Risk of
              overheating increases.
            </p>
          ) : (
            <p className="text-emerald-500">
              Limit continuous exposure to {formatTime(MAX_SAFE_DURATION_WARM)}{' '}
              and stay hydrated.
            </p>
          )}
        </>
      )}

      {isHotWater && (
        <>
          <p className="text-red-500">
            <strong>DANGER:</strong> Water at {temperature}°C exceeds maximum
            safe water temperature.
          </p>
          {isDangerousHotDuration ? (
            <p className="text-red-500">
              <strong>URGENT:</strong> {duration} minutes is excessive. Choose a
              cooler water source.
            </p>
          ) : (
            <p className="text-red-500">
              Not recommended for exercising. If necessary, limit exposure to
              less than {MAX_SAFE_DURATION_HOT} minutes or cool the water.
            </p>
          )}
        </>
      )}
    </>
  );
};
