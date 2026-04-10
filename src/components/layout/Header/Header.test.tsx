import { render } from '@testing-library/react';
import { Header } from './Header';
import { useAppContext } from '@/context/AppContext/AppContext';
import { ReactNode } from 'react';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}));

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...rest
  }: {
    children: ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
  MockLink.displayName = 'Link';
  return MockLink;
});

// Mock useLanguagePreference hook
jest.mock('@/hooks/useLanguagePreference/useLanguagePreference', () => ({
  useLanguagePreference: () => ({
    changeLanguage: jest.fn()
  })
}));

jest.mock('@/context/AppContext/AppContext', () => ({
  useAppContext: jest.fn()
}));

const useAppContextMock = useAppContext as jest.Mock;

describe('Header component', () => {
  const toggleFullScreen = jest.fn();

  const drawer = {
    open: jest.fn(),
    close: jest.fn()
  };

  beforeEach(() => {
    useAppContextMock.mockImplementation(() => ({
      fullScreenMode: {
        isFullScreen: false,
        toggleFullScreen: toggleFullScreen
      },
      drawer
    }));
  });

  it('should render correctly', () => {
    const { container } = render(<Header language="en" />);

    expect(container).toMatchSnapshot();
  });

  it('should not render when full screen mode is enabled', () => {
    useAppContextMock.mockImplementation(() => ({
      fullScreenMode: {
        isFullScreen: true,
        toggleFullScreen: toggleFullScreen
      }
    }));

    const { container } = render(<Header language="en" />);

    expect(container).toMatchSnapshot();
  });
});
