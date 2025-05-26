import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateLayersFromDurationFormData,
  createCalculateLayersFromDurationFormModel
} from './CalculateLayersFromDurationForm.model';

import { CalculateLayersFromDurationFormResult } from './CalculateLayersFromDurationFormResult';
import { DurationField } from '../../../form-fields/FormFields';
import { staticExerciseDurationCalculator } from '../../../../services/StaticExerciseDuration/StaticExerciseDurationService';
import { useTranslation } from 'react-i18next';

export const CalculateLayersFromDurationForm = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  const handleSubmit = (data: CalculateLayersFromDurationFormData): number => {
    return staticExerciseDurationCalculator.calculateLayersFromDuration(
      data.duration
    );
  };

  return (
    <CalculatorForm
      title={t('calculateCleanedMentalLayersTitle')}
      subtitle={t('calculateLayersFromDurationSubtitle')}
      formModel={createCalculateLayersFromDurationFormModel(t)}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <DurationField
            form={form}
            name="duration"
            description={t('calculateLayersFromDurationDescription')}
          />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateLayersFromDurationFormResult result={result} form={form} />
      )}
    />
  );
};
