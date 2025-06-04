import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthorMention, AuthorMentionProps } from './AuthorMention';
import { LinkProps } from '../Link/Link';

// Mock the react-i18next module
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => (key === 'byAuthor' ? 'by' : key)
  })
}));

jest.mock('../Link/Link', () => ({
  Link: ({ href, className, children }: LinkProps) => (
    <a
      href={href as unknown as string}
      className={className}
      data-testid="mock-link"
    >
      {children}
    </a>
  )
}));

describe('AuthorMention', () => {
  const defaultProps: AuthorMentionProps = {
    name: 'John Doe',
    href: 'https://example.com/author/john-doe'
  };

  it('renders correctly with required props', () => {
    render(<AuthorMention {...defaultProps} />);

    expect(screen.getByText(/by/i)).toBeInTheDocument();

    const link = screen.getByTestId('mock-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', defaultProps.href);
    expect(link).toHaveTextContent(defaultProps.name);
  });

  it('applies custom className when provided', () => {
    const className = 'custom-author-class';
    render(<AuthorMention {...defaultProps} className={className} />);

    const link = screen.getByTestId('mock-link');
    expect(link).toHaveAttribute('class', className);
  });

  it('renders with different author information', () => {
    const customProps: AuthorMentionProps = {
      name: 'Jane Smith',
      href: 'https://example.com/author/jane-smith'
    };

    render(<AuthorMention {...customProps} />);

    const link = screen.getByTestId('mock-link');
    expect(link).toHaveTextContent(customProps.name);
    expect(link).toHaveAttribute('href', customProps.href);
  });

  it('uses the translated "byAuthor" text', () => {
    const { container } = render(<AuthorMention {...defaultProps} />);

    expect(container.textContent).toMatch(/ by /);
  });
});
