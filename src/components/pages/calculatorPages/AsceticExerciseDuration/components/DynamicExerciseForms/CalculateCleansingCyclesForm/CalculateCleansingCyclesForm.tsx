import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  SpeedField,
  DurationField
} from '../DynamicExerciseDurationFormFields';
import {
  CalculateCleansingCyclesFormData,
  CalculateCleansingCyclesFormModel
} from './CalculateCleansingCyclesForm.model';
import {
  CalculateCleansingCyclesReturnType,
  dynamicExerciseDurationCalculator
} from '../../../services/DynamicExerciseDuration';

export const CalculateCleansingCyclesForm = () => {
  const handleSubmit = (
    data: CalculateCleansingCyclesFormData
  ): CalculateCleansingCyclesReturnType => {
    return dynamicExerciseDurationCalculator.calculateCleansingCycles(
      data.speed,
      data.duration
    );
  };

  return (
    <CalculatorForm
      title="Calculate Mental Layers"
      formModel={CalculateCleansingCyclesFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <SpeedField form={form} name="speed" />
          <DurationField form={form} name="duration" />
        </>
      )}
      renderResult={(result) => (
        <div>
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Result:
          </h3>
          <div>You cleaned {result.completedCycles} mental layers</div>
          <div>
            You have to walk {result.remainingMinutes} more minutes to clean 1
            more mental layer
          </div>
        </div>
      )}
    />
  );
};
