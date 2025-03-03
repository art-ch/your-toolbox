import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link } from './Link';
import '@testing-library/jest-dom';

describe('Link Component', () => {
  it('renders correctly with default props', () => {
    render(<Link href="/test">Test Link</Link>);

    const link = screen.getByText('Test Link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('text-blue-500');
  });

  it('applies default variant styles', () => {
    render(<Link href="/test">Default Link</Link>);

    const link = screen.getByText('Default Link');
    expect(link).toHaveClass('text-blue-500');
    expect(link).toHaveClass('hover:text-blue-400');
    expect(link).toHaveClass('focus:text-blue-600');
  });

  it('applies light variant styles', () => {
    render(
      <Link href="/test" variant="light">
        Light Link
      </Link>
    );

    const link = screen.getByText('Light Link');
    expect(link).toHaveClass('text-blue-400');
    expect(link).toHaveClass('hover:text-blue-300');
    expect(link).toHaveClass('focus:text-blue-500');
  });

  it('combines custom className with variant styles', () => {
    render(
      <Link href="/test" className="font-bold underline">
        Custom Link
      </Link>
    );

    const link = screen.getByText('Custom Link');
    expect(link).toHaveClass('text-blue-500');
    expect(link).toHaveClass('font-bold');
    expect(link).toHaveClass('underline');
  });

  it('renders children correctly', () => {
    render(
      <Link href="/test">
        <span data-testid="child-element">Child Element</span>
      </Link>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });
});
