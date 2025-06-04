import { useTranslation } from 'react-i18next';

import { getIsWalking } from '../utils/dynamicExerciseUtils';

type MovementTranslations = {
  baseMovementTranslation: string;
  gerundMovementTranslation: string;
};

export function useMovementTranslation(speed: number): MovementTranslations {
  const { t } = useTranslation('asceticExerciseDuration');

  const isWalking = getIsWalking(speed);

  return {
    baseMovementTranslation: isWalking ? t('walk') : t('run'),
    gerundMovementTranslation: isWalking ? t('walking') : t('running')
  };
}
