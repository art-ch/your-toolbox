import { render } from '@testing-library/react';

import { Header } from './Header';
import { AppProvider } from '@/context/AppContext/AppContext';

describe('Header component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <AppProvider>
        <Header lng="en" />
      </AppProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
