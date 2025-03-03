import { render } from '@testing-library/react';

import { AppDrawer } from './AppDrawer';

describe('AppDrawer component', () => {
  it('should render correctly', () => {
    const { container } = render(<AppDrawer />);

    expect(container).toMatchSnapshot();
  });
});
