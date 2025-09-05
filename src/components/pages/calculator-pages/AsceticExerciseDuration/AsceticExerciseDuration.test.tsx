import { render } from '@testing-library/react';
import { AsceticExerciseDuration } from './AsceticExerciseDuration';

jest.mock(
  './components/ExerciseTypeTabs/hooks/useExerciseTypeUrlState',
  () => ({
    useExerciseTypeUrlState: jest.fn(() => ({
      exerciseTypePath: ['dynamic'],
      handleTabChange: jest.fn()
    }))
  })
);

describe('AsceticExerciseDuration component', () => {
  it('should render correctly', () => {
    const { container } = render(<AsceticExerciseDuration />);

    expect(container).toMatchSnapshot();
  });
});
