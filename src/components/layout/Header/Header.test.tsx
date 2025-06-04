import { render } from '@testing-library/react';
import { Header } from './Header';
import { AppProvider } from '@/context/AppContext/AppContext';
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

describe('Header component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <AppProvider>
        <Header language="en" />
      </AppProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
