import { render } from '@testing-library/react';

import { Navigation } from './Navigation';

describe('Navigation component', () => {
  it('should render correctly', () => {
    const { container } = render(<Navigation />);

    expect(container).toMatchSnapshot();
  });
});
