import { render } from '@testing-library/react';
import { Main } from './Main';
import { useAppContext } from '@/context/AppContext/AppContext';

jest.mock('@/context/AppContext/AppContext', () => ({
  useAppContext: jest.fn()
}));

const useAppContextMock = useAppContext as jest.Mock;

describe('Main component', () => {
  const toggleFullScreen = jest.fn();

  beforeEach(() => {
    useAppContextMock.mockImplementation(() => ({
      fullScreenMode: { isFullScreen: false, toggleFullScreen }
    }));
  });

  it('should render correctly', () => {
    const { container } = render(<Main>Test</Main>);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when full screen mode is enabled', () => {
    useAppContextMock.mockImplementation(() => ({
      fullScreenMode: { isFullScreen: true, toggleFullScreen }
    }));

    const { container } = render(<Main>Test</Main>);

    expect(container).toMatchSnapshot();
  });
});
