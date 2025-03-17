import { render } from '@testing-library/react';

import { Footer } from './Footer';

describe('Footer component', () => {
  it('should render correctly', () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
