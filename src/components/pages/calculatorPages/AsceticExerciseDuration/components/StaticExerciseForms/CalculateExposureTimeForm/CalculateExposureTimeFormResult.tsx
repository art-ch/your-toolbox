import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formatTime } from '@/utils/timeUtils';
import { WaterExposureWarning } from '../../WaterExposureWarning/WaterExposureWarning';

export type CalculateExposureTimeFormResultProps = {
  result: number;
  form: UseFormReturn<{
    mentalLayers: number;
    temperature: number;
  }>;
};

export const CalculateExposureTimeFormResult = ({
  result,
  form
}: CalculateExposureTimeFormResultProps) => {
  const time = formatTime(result);

  return (
    <div data-testid="calculate-exposure-time-form-result">
      <p>
        To clean {form.getValues().mentalLayers} mental layers in{' '}
        {form.getValues().temperature} °C water
      </p>
      <p>You will have to sit still in it for {time}</p>

      <WaterExposureWarning
        temperature={form.getValues().temperature}
        duration={result}
      />
    </div>
  );
};
