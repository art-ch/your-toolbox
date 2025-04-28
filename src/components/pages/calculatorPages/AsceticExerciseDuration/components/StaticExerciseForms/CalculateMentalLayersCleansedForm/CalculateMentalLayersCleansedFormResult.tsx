import { formatTime } from '@/utils/timeUtils';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WaterExposureWarning } from '../../WaterExposureWarning/WaterExposureWarning';

export type CalculateMentalLayersCleansedFormResultProps = {
  result: number;
  form: UseFormReturn<{
    duration: number;
    temperature: number;
  }>;
};

export const CalculateMentalLayersCleansedFormResult = ({
  result,
  form
}: CalculateMentalLayersCleansedFormResultProps) => {
  const time = formatTime(form.getValues().duration);

  return (
    <div data-testid="calculate-mental-layers-cleansed-form-result">
      <p>
        After sitting in a water with {form.getValues().temperature} °C{' '}
        temperature for {time}
      </p>
      <p>You will have {result} mental layers cleaned</p>
      <WaterExposureWarning
        temperature={form.getValues().temperature}
        duration={form.getValues().duration}
      />
    </div>
  );
};
