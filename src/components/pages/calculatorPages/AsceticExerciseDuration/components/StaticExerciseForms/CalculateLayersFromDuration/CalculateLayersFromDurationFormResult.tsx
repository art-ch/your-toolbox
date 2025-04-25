import React from 'react';
import { UseFormReturn } from 'react-hook-form';

export type CalculateLayersFromDurationFormResultProps = {
  result: number;
  form: UseFormReturn<{
    duration: number;
  }>;
};

export const CalculateLayersFromDurationFormResult = ({
  result,
  form
}: CalculateLayersFromDurationFormResultProps) => {
  return (
    <div data-testid="calculate-layers-from-duration-form-result">
      <p>
        After you have sit in a seated asana pose or have standed still
        uninteruptedly for {form.getValues().duration} minutes
      </p>
      <p>You will have {result} mental layers cleaned</p>
    </div>
  );
};
