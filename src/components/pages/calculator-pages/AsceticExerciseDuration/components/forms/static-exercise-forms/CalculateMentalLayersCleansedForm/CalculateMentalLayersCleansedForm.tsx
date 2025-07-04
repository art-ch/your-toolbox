import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateMentalLayersCleansedFormData,
  createCalculateMentalLayersCleansedFormModel
} from './CalculateMentalLayersCleansedForm.model';
import { CalculateMentalLayersCleansedFormResult } from './CalculateMentalLayersCleansedFormResult';
import { DurationField } from '../../../form-fields/FormFields';

import { waterExposureDurationCalculator } from '../../../../services/StaticExerciseDuration/WaterExposureDurationService';
import { TemperatureField } from '../../../form-fields/StaticExerciseDurationFormFields';
import { useTranslation } from 'react-i18next';
import { WATER_EXPOSURE_DURATION_FORM_FIELD_DESCRIPTION_TRANSLATION_KEY } from '../../../../constants/StaticExercise.constants';

export const CalculateMentalLayersCleansedForm = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  const handleSubmit = (
    data: CalculateMentalLayersCleansedFormData
  ): number => {
    return waterExposureDurationCalculator.calculateMentalLayersCleansed(
      data.temperature,
      data.duration
    );
  };

  return (
    <CalculatorForm
      title={t('calculateCleanedMentalLayersTitle')}
      subtitle={t('calculateMentalLayersCleansedSubtitle')}
      formModel={createCalculateMentalLayersCleansedFormModel(t)}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <TemperatureField form={form} name="temperature" />
          <DurationField
            form={form}
            name="duration"
            description={t(
              WATER_EXPOSURE_DURATION_FORM_FIELD_DESCRIPTION_TRANSLATION_KEY
            )}
          />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateMentalLayersCleansedFormResult result={result} form={form} />
      )}
    />
  );
};
