import { useState, useEffect } from 'react';

export const useCalculatorFormResult = <TData, TResult>(
  formData: TData | null,
  onSubmit: (data: TData) => TResult
) => {
  const [calculationResult, setCalculationResult] = useState<TResult | null>(
    null
  );

  useEffect(() => {
    if (formData) {
      const result = onSubmit(formData);
      setCalculationResult(result);
    }
  }, [formData, onSubmit]);

  return calculationResult;
};
