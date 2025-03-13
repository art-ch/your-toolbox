import { render, screen } from '@testing-library/react';
import { Container } from './Container';
import { useAppContext } from '@/app/context/AppContext/AppContext';

jest.mock('@/app/context/AppContext/AppContext', () => ({
  useAppContext: jest.fn()
}));

describe('Container component', () => {
  const mockUseAppContext = useAppContext as jest.Mock;

  beforeEach(() => {
    mockUseAppContext.mockReturnValue({
      drawer: { isOpen: false }
    });
  });

  it('should render correctly', () => {
    const { container } = render(<Container>child</Container>);

    expect(container).toMatchSnapshot();
  });

  it('should apply correct class when drawer is open', () => {
    mockUseAppContext.mockReturnValue({
      drawer: { isOpen: true }
    });

    render(<Container>child</Container>);

    expect(screen.getByTestId('container')).toHaveClass('translate-x-0');
  });

  it('should apply correct class when drawer is closed', () => {
    mockUseAppContext.mockReturnValue({
      drawer: { isOpen: false }
    });

    render(<Container>child</Container>);

    expect(screen.getByTestId('container')).toHaveClass('-translate-x-full');
  });
});
