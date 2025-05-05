import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageTitle, PageHeading, ToolPageHeading } from './PageHeading';
import {
  AuthorMention,
  AuthorMentionProps
} from '../AuthorMention/AuthorMention';

jest.mock('../AuthorMention/AuthorMention', () => ({
  AuthorMention: jest.fn(() => (
    <span data-testid="author-mention">Author Mention</span>
  ))
}));

describe('PageTitle Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<PageTitle title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <PageTitle title="Test Title" className="custom-class" />
    );
    const heading = container.querySelector('h1');
    expect(heading).toHaveClass('custom-class');
    expect(heading).toHaveClass('text-2xl');
    expect(heading).toHaveClass('md:text-4xl');
  });

  it('renders AuthorMention when authorMention prop is provided', () => {
    const authorMention = {
      name: 'John Doe',
      href: 'https://example.com' as AuthorMentionProps['href']
    };
    render(<PageTitle title="Test Title" authorMention={authorMention} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('author-mention')).toBeInTheDocument();
    expect(AuthorMention).toHaveBeenCalledWith(authorMention, undefined);
  });

  it('does not render AuthorMention when authorMention prop is not provided', () => {
    render(<PageTitle title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByTestId('author-mention')).not.toBeInTheDocument();
    expect(AuthorMention).not.toHaveBeenCalled();
  });
});

describe('PageHeading Component', () => {
  it('renders the title correctly', () => {
    render(<PageHeading title="Page Heading" />);
    expect(screen.getByText('Page Heading')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<PageHeading title="Page Heading" subtitle="This is a subtitle" />);

    expect(screen.getByText('Page Heading')).toBeInTheDocument();
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<PageHeading title="Page Heading" />);

    const headingElement = screen.getByText('Page Heading');
    expect(headingElement).toBeInTheDocument();

    const paragraphs = screen.queryAllByRole('paragraph');
    expect(paragraphs.length).toBe(0);
  });

  it('passes authorMention to PageTitle when provided', () => {
    const authorMention = {
      name: 'John Doe',
      href: 'https://example.com' as AuthorMentionProps['href']
    };
    render(<PageHeading title="Page Heading" authorMention={authorMention} />);

    expect(screen.getByTestId('author-mention')).toBeInTheDocument();
    expect(AuthorMention).toHaveBeenCalledWith(authorMention, undefined);
  });
});

describe('ToolPageHeading Component', () => {
  it('renders the title correctly', () => {
    render(<ToolPageHeading title="Tool Heading" />);
    expect(screen.getByText('Tool Heading')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const testIcon = <div data-testid="test-icon">🔧</div>;
    render(<ToolPageHeading title="Tool Heading" icon={testIcon} />);

    expect(screen.getByText('Tool Heading')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<ToolPageHeading title="Tool Heading" subtitle="Tool subtitle" />);

    expect(screen.getByText('Tool Heading')).toBeInTheDocument();
    expect(screen.getByText('Tool subtitle')).toBeInTheDocument();
  });

  it('passes authorMention to PageTitle when provided', () => {
    const authorMention = {
      name: 'John Doe',
      href: 'https://example.com' as AuthorMentionProps['href']
    };
    render(
      <ToolPageHeading title="Tool Heading" authorMention={authorMention} />
    );

    expect(screen.getByTestId('author-mention')).toBeInTheDocument();
    expect(AuthorMention).toHaveBeenCalledWith(authorMention, undefined);
  });

  it('renders all elements together correctly', () => {
    const testIcon = <div data-testid="test-icon">🔧</div>;
    const authorMention = {
      name: 'John Doe',
      href: 'https://example.com' as AuthorMentionProps['href']
    };

    render(
      <ToolPageHeading
        title="Tool Heading"
        icon={testIcon}
        subtitle="Tool subtitle"
        authorMention={authorMention}
      />
    );

    expect(screen.getByText('Tool Heading')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Tool subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('author-mention')).toBeInTheDocument();
  });
});
