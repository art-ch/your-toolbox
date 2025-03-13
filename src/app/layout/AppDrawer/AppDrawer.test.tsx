import { render } from '@testing-library/react';

import { AppDrawer } from './AppDrawer';
import { AppProvider } from '@/app/context/AppContext/AppContext';

jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: jest.fn()
}));

describe('AppDrawer component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <AppProvider>
        <AppDrawer />
      </AppProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
