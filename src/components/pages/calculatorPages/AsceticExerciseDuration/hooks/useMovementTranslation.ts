import { RUNNING_SPEED } from '../constants/DynamicExercise.constants';

export const getIsWalking = (speed: number) => {
  return speed < RUNNING_SPEED;
};

import { useTranslation } from 'react-i18next';

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
