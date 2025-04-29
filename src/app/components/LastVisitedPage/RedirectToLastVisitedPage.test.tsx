import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import {
  useLocalStorage,
  useSessionStorage
} from '@/hooks/useStorage/useStorage';
import { RedirectToLastVisitedPage } from './RedirectToLastVisitedPage';

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock our storage hooks
jest.mock('@/hooks/useStorage/useStorage', () => ({
  useLocalStorage: jest.fn(),
  useSessionStorage: jest.fn()
}));

describe('RedirectToLastVisitedPage', () => {
  // Setup common mocks
  const mockRouter = { push: jest.fn() };
  const mockSetHasVisitedHomepage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Default mock implementations
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Mock storage hooks with default values
    (useLocalStorage as jest.Mock).mockReturnValue(['', jest.fn()]);
    (useSessionStorage as jest.Mock).mockImplementation((key) => {
      if (key === 'hasVisitedHomepage')
        return [false, mockSetHasVisitedHomepage];
      if (key === 'userActiveThisSession') return [false, jest.fn()];
      return [null, jest.fn()];
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should always mark homepage as visited', () => {
    render(<RedirectToLastVisitedPage />);
    expect(mockSetHasVisitedHomepage).toHaveBeenCalledWith(true);
  });

  it('should not redirect if no lastUrl exists', () => {
    (useLocalStorage as jest.Mock).mockReturnValue(['', jest.fn()]);

    render(<RedirectToLastVisitedPage />);
    jest.runAllTimers();

    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('should not redirect if lastUrl is not a string', () => {
    (useLocalStorage as jest.Mock).mockReturnValue([null, jest.fn()]);

    render(<RedirectToLastVisitedPage />);
    jest.runAllTimers();

    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('should not redirect if user has already visited homepage this session', () => {
    (useLocalStorage as jest.Mock).mockReturnValue([
      '/calculators/some-calculator',
      jest.fn()
    ]);
    (useSessionStorage as jest.Mock).mockImplementation((key) => {
      if (key === 'hasVisitedHomepage')
        return [true, mockSetHasVisitedHomepage];
      if (key === 'userActiveThisSession') return [false, jest.fn()];
      return [null, jest.fn()];
    });

    render(<RedirectToLastVisitedPage />);
    jest.runAllTimers();

    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('should not redirect if user is already active in this session', () => {
    (useLocalStorage as jest.Mock).mockReturnValue([
      '/calculators/some-calculator',
      jest.fn()
    ]);
    (useSessionStorage as jest.Mock).mockImplementation((key) => {
      if (key === 'hasVisitedHomepage')
        return [false, mockSetHasVisitedHomepage];
      if (key === 'userActiveThisSession') return [true, jest.fn()];
      return [null, jest.fn()];
    });

    render(<RedirectToLastVisitedPage />);
    jest.runAllTimers();

    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('should redirect when all conditions are met', () => {
    (useLocalStorage as jest.Mock).mockReturnValue([
      '/calculators/some-calculator',
      jest.fn()
    ]);
    (useSessionStorage as jest.Mock).mockImplementation((key) => {
      if (key === 'hasVisitedHomepage')
        return [false, mockSetHasVisitedHomepage];
      if (key === 'userActiveThisSession') return [false, jest.fn()];
      return [null, jest.fn()];
    });

    render(<RedirectToLastVisitedPage />);

    // Check that loading state is shown
    expect(
      screen.getByText('Returning to the last visited page...')
    ).toBeInTheDocument();

    // Advance timers to trigger the redirect
    jest.runAllTimers();

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/calculators/some-calculator'
    );
  });

  it('should fall back to window.location.href if router.push fails', () => {
    // Save the original window.location
    const originalLocation = window.location;

    // Create a mock location object
    const mockLocation = {
      ...originalLocation,
      assign: jest.fn()
    };

    // @ts-expect-error - Remove window.location to enable mock for navigation testing
    delete window.location;
    window.location = mockLocation as unknown as string & Location;

    // Make router.push throw an error
    (mockRouter.push as jest.Mock).mockImplementation(() => {
      throw new Error('Router push failed');
    });

    (useLocalStorage as jest.Mock).mockReturnValue([
      '/calculators/some-calculator',
      jest.fn()
    ]);
    (useSessionStorage as jest.Mock).mockImplementation((key) => {
      if (key === 'hasVisitedHomepage')
        return [false, mockSetHasVisitedHomepage];
      if (key === 'userActiveThisSession') return [false, jest.fn()];
      return [null, jest.fn()];
    });

    render(<RedirectToLastVisitedPage />);
    jest.runAllTimers();

    // Check that our mock assign was called with the correct URL
    expect(mockLocation.assign).toHaveBeenCalledWith(
      '/calculators/some-calculator'
    );

    // Restore the original location
    window.location = originalLocation as unknown as string & Location;
  });

  it('should only attempt to redirect once', () => {
    (useLocalStorage as jest.Mock).mockReturnValue([
      '/calculators/some-calculator',
      jest.fn()
    ]);
    (useSessionStorage as jest.Mock).mockImplementation((key) => {
      if (key === 'hasVisitedHomepage')
        return [false, mockSetHasVisitedHomepage];
      if (key === 'userActiveThisSession') return [false, jest.fn()];
      return [null, jest.fn()];
    });

    const { rerender } = render(<RedirectToLastVisitedPage />);
    jest.runAllTimers();

    expect(mockRouter.push).toHaveBeenCalledTimes(1);

    // Clear mocks and rerender to simulate a state update
    jest.clearAllMocks();
    rerender(<RedirectToLastVisitedPage />);
    jest.runAllTimers();

    // Should not call router.push again
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
