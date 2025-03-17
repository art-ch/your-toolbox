import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hero, HeroProps } from './Hero'; // Adjust import path as needed
import '@testing-library/jest-dom';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };

  MockLink.displayName = 'Link';
  return MockLink;
});

describe('Hero Component', () => {
  const defaultProps: HeroProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle'
  };

  it('renders the title and subtitle correctly', () => {
    render(<Hero {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders the default button text when not provided', () => {
    render(<Hero {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: 'Check available tools' })
    ).toBeInTheDocument();
  });

  it('renders custom button text when provided', () => {
    const customProps = {
      ...defaultProps,
      buttonText: 'Custom Button Text'
    };

    render(<Hero {...customProps} />);

    expect(
      screen.getByRole('button', { name: 'Custom Button Text' })
    ).toBeInTheDocument();
  });

  it('uses the default link when not provided', () => {
    render(<Hero {...defaultProps} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/navigation');
  });

  it('uses custom link when provided', () => {
    const customProps = {
      ...defaultProps,
      link: '/custom-path'
    } as HeroProps;

    render(<Hero {...customProps} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/custom-path');
  });

  it('has the correct styling classes', () => {
    const { container } = render(<Hero {...defaultProps} />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass(
      'my-0',
      'mx-auto',
      'py-40',
      'text-center',
      'max-w-lg'
    );

    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toHaveClass(
      'text-4xl',
      'sm:text-6xl',
      'font-semibold',
      'leading-none',
      'tracking-tight'
    );
  });
});
