import { render } from '@testing-library/react';

import { Footer } from './Footer';
import { useAppContext } from '@/context/AppContext/AppContext';

jest.mock('@/context/AppContext/AppContext', () => ({
  useAppContext: jest.fn()
}));

const useAppContextMock = useAppContext as jest.Mock;

describe('Footer component', () => {
  beforeEach(() => {
    useAppContextMock.mockImplementation(() => ({
      fullScreenMode: { isFullScreen: false, toggleFullScreen: jest.fn() }
    }));
  });

  it('should render correctly', () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });

  it('should not render when full screen mode is enabled', () => {
    useAppContextMock.mockImplementation(() => ({
      fullScreenMode: { isFullScreen: true, toggleFullScreen: jest.fn() }
    }));

    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
