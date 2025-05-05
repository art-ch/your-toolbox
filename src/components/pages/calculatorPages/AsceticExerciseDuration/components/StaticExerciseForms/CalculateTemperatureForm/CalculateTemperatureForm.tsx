import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateTemperatureFormData,
  CalculateTemperatureFormModel
} from './CalculateTemperatureForm.model';
import { CalculateTemperatureFormResult } from './CalculateTemperatureFormResult';
import { DurationField, MentalLayersField } from '../../FormFields';
import { waterExposureDurationCalculator } from '../../../services/StaticExerciseDuration/WaterExposureDurationService';
import { WATER_EXPOSURE_DURATION_FORM_FIELD_DESCRIPTION_TRANSLATION_KEY } from '../../../constants/StaticExercise.constants';
import { useTranslation } from 'react-i18next';

export const CalculateTemperatureForm = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  const handleSubmit = (data: CalculateTemperatureFormData) => {
    return waterExposureDurationCalculator.calculateRequiredTemperature(
      data.mentalLayers,
      data.duration
    );
  };

  return (
    <CalculatorForm
      title={t('calculateTemperatureTitle')}
      subtitle={t('calculateTemperatureSubtitle')}
      formModel={CalculateTemperatureFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <MentalLayersField form={form} name="mentalLayers" />
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
        <CalculateTemperatureFormResult result={result} form={form} />
      )}
    />
  );
};
