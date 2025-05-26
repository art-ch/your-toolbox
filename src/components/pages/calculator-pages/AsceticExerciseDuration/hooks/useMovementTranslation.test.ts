import { RUNNING_SPEED } from '../constants/DynamicExercise.constants';
import { getIsWalking } from './useMovementTranslation';

describe('getIsWalking', () => {
  it('returns true when speed is below running threshold', () => {
    expect(getIsWalking(RUNNING_SPEED - 1)).toBe(true);
  });

  it('returns false when speed is above running threshold', () => {
    expect(getIsWalking(RUNNING_SPEED + 1)).toBe(false);
  });

  it('returns false when speed is exactly at running threshold', () => {
    expect(getIsWalking(RUNNING_SPEED)).toBe(false);
  });
});
