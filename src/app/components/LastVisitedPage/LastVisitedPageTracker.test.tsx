import { render } from '@testing-library/react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  useLocalStorage,
  useSessionStorage
} from '@/hooks/useStorage/useStorage';
import { LastVisitedPageTracker } from './LastVisitedPageTracker';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn()
}));

jest.mock('@/hooks/useStorage/useStorage', () => ({
  useLocalStorage: jest.fn(),
  useSessionStorage: jest.fn()
}));

describe('LastVisitedPageTracker', () => {
  // Setup common mocks
  const mockUpdateLastUrl = jest.fn();
  const mockSetActiveThisSession = jest.fn();
  const mockSearchParams = {
    toString: jest.fn().mockReturnValue('')
  };

  const useLocalStorageMock = useLocalStorage as jest.Mock;
  const useSessionStorageMock = useSessionStorage as jest.Mock;
  const usePathnameMock = usePathname as jest.Mock;
  const useSearchParamsMock = useSearchParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    useLocalStorageMock.mockReturnValue(['', mockUpdateLastUrl]);
    useSessionStorageMock.mockReturnValue([false, mockSetActiveThisSession]);
    usePathnameMock.mockReturnValue('/');
    useSearchParamsMock.mockReturnValue(mockSearchParams);
  });

  it('should mark user as active in this session', () => {
    render(<LastVisitedPageTracker />);
    expect(mockSetActiveThisSession).toHaveBeenCalledWith(true);
  });

  it('should not update lastUrl when on homepage', () => {
    usePathnameMock.mockReturnValue('/');

    render(<LastVisitedPageTracker />);

    expect(mockUpdateLastUrl).not.toHaveBeenCalled();
  });

  it('should update lastUrl when on a calculator page', () => {
    usePathnameMock.mockReturnValue('/calculators/some-calculator');

    render(<LastVisitedPageTracker />);

    expect(mockUpdateLastUrl).toHaveBeenCalledWith(
      '/calculators/some-calculator'
    );
  });

  it('should include search params in the lastUrl when present', () => {
    usePathnameMock.mockReturnValue('/calculators/some-calculator');
    (mockSearchParams.toString as jest.Mock).mockReturnValue(
      'param1=value1&param2=value2'
    );

    render(<LastVisitedPageTracker />);

    expect(mockUpdateLastUrl).toHaveBeenCalledWith(
      '/calculators/some-calculator?param1=value1&param2=value2'
    );
  });

  it('should handle null or undefined pathname', () => {
    usePathnameMock.mockReturnValue(null);

    render(<LastVisitedPageTracker />);

    expect(mockUpdateLastUrl).not.toHaveBeenCalled();
  });
});
