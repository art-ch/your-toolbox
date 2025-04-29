import React from 'react';
import { UseFormReturn } from 'react-hook-form';

export type CalculateDurationFromLayersFormResultProps = {
  result: number;
  form: UseFormReturn<{
    mentalLayers: number;
  }>;
};

export const CalculateDurationFromLayersFormResult = ({
  result,
  form
}: CalculateDurationFromLayersFormResultProps) => {
  return (
    <div data-testid="calculate-duration-from-layers-form-result">
      <p>To clean {form.getValues().mentalLayers} mental layers</p>
      <p>
        You have to sit in a seated asana pose or stand still uninteruptedly for{' '}
        {result} minutes
      </p>
    </div>
  );
};
