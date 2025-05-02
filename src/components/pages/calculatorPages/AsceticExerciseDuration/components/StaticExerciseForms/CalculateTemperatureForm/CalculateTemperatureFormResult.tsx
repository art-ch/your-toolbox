import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formatTime } from '@/utils/timeUtils';
import { WaterExposureWarning } from '../../WaterExposureWarning/WaterExposureWarning';

export type CalculateTemperatureFormResultProps = {
  result: number;
  form: UseFormReturn<{
    mentalLayers: number;
    duration: number;
  }>;
};

export const CalculateTemperatureFormResult = ({
  result,
  form
}: CalculateTemperatureFormResultProps) => {
  const durationValue = form.getValues().duration;
  const time = formatTime(durationValue);

  return (
    <div data-testid="calculate-temperature-form-result">
      <p>
        To clean {form.getValues().mentalLayers} mental layers in {time}
      </p>
      <p>You will require a water with temperature of {result} °C</p>

      <WaterExposureWarning temperature={result} duration={durationValue} />
    </div>
  );
};
