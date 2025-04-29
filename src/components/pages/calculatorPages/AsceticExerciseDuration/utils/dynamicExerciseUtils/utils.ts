import { RUNNING_SPEED } from '../../constants/DynamicExercise.constants';

export const getIsWalking = (speed: number) => {
  return speed < RUNNING_SPEED;
};
