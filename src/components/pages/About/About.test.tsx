import { render } from '@testing-library/react';

import { About } from './About';

describe('About component', () => {
  it('should render correctly', () => {
    const { container } = render(<About />);

    expect(container).toMatchSnapshot();
  });
});
