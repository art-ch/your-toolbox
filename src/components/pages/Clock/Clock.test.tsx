import { render } from '@testing-library/react';

import { Clock } from './Clock';

describe('Calculators component', () => {
  it('should render correctly', () => {
    const { container } = render(<Clock />);

    expect(container).toMatchSnapshot();
  });
});
