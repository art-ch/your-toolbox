import { render } from '@testing-library/react';

import { Header } from './Header';
import { AppProvider } from '@/app/context/AppContext/AppContext';

describe('Header component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <AppProvider>
        <Header />
      </AppProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
