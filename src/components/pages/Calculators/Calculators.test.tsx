import { render } from '@testing-library/react';

import { Calculators } from './Calculators';

describe('Calculators component', () => {
  it('should render correctly', () => {
    const { container } = render(<Calculators />);

    expect(container).toMatchSnapshot();
  });
});
