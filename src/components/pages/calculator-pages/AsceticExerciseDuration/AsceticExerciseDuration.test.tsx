import { render } from '@testing-library/react';
import { AsceticExerciseDuration } from './AsceticExerciseDuration';

describe('AsceticExerciseDuration component', () => {
  it('should render correctly', () => {
    const { container } = render(<AsceticExerciseDuration />);

    expect(container).toMatchSnapshot();
  });
});
