import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguagePreference } from '@/hooks/useLanguagePreference/useLanguagePreference';
import { languageSwitcherConfig } from './LanguageSwitcher.config';
import { languages } from '@/lib/i18n/settings';

// Mock the useLanguagePreference hook
jest.mock('@/hooks/useLanguagePreference/useLanguagePreference', () => ({
  useLanguagePreference: jest.fn()
}));

// Mock the UI dropdown components
jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu">{children}</div>
  ),
  DropdownMenuTrigger: ({
    children,
    className
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <button data-testid="dropdown-trigger" className={className}>
      {children}
    </button>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    className,
    onClick
  }: {
    children: React.ReactNode;
    className: string;
    onClick: () => void;
  }) => (
    <div
      data-testid="dropdown-item"
      role="menuitem"
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  )
}));

describe('LanguageSwitcher Component', () => {
  const mockChangeLanguage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLanguagePreference as jest.Mock).mockReturnValue({
      changeLanguage: mockChangeLanguage
    });
  });

  it('should render with the current language label', () => {
    render(<LanguageSwitcher currentLanguage="en" />);

    expect(
      within(screen.getByTestId('dropdown-trigger')).getByText(
        languageSwitcherConfig.en.label
      )
    ).toBeInTheDocument();
  });

  it('should show dropdown menu with all available languages when clicked', () => {
    render(<LanguageSwitcher currentLanguage="en" />);

    fireEvent.click(
      within(screen.getByTestId('dropdown-trigger')).getByText(
        languageSwitcherConfig.en.label
      )
    );

    languages.forEach((language) => {
      expect(
        within(screen.getByTestId('dropdown-content')).getByText(
          languageSwitcherConfig[language].label
        )
      ).toBeInTheDocument();
    });
  });

  it('should call changeLanguage when a language is selected', () => {
    render(<LanguageSwitcher currentLanguage="en" />);

    fireEvent.click(
      within(screen.getByTestId('dropdown-trigger')).getByText(
        languageSwitcherConfig.en.label
      )
    );

    fireEvent.click(
      within(screen.getByTestId('dropdown-content')).getByText(
        languageSwitcherConfig.ru.label
      )
    );

    expect(mockChangeLanguage).toHaveBeenCalledWith('ru');
  });

  it('should apply bold styling to current language in dropdown', () => {
    render(<LanguageSwitcher currentLanguage="en" />);

    // Open the dropdown
    fireEvent.click(
      within(screen.getByTestId('dropdown-trigger')).getByText(
        languageSwitcherConfig.en.label
      )
    );

    // Get all dropdown items
    const dropdownItems = screen.getAllByTestId('dropdown-item');

    // Find the current language item
    const currentLanguageItem = dropdownItems.find(
      (item) => item.textContent === languageSwitcherConfig.en.label
    );

    // Check if it has the font-bold class
    expect(currentLanguageItem).toHaveClass('font-bold');

    // Check that other language items don't have font-bold
    const otherLanguageItems = dropdownItems.filter(
      (item) => item.textContent !== languageSwitcherConfig.en.label
    );

    otherLanguageItems.forEach((item) => {
      expect(item).not.toHaveClass('font-bold');
    });
  });

  it('should render with a different current language', () => {
    render(<LanguageSwitcher currentLanguage="uk" />);

    expect(
      within(screen.getByTestId('dropdown-trigger')).getByText(
        languageSwitcherConfig.uk.label
      )
    ).toBeInTheDocument();
  });

  it('should allow switching to each available language', () => {
    render(<LanguageSwitcher currentLanguage="en" />);

    // Test switching to each language
    languages.forEach((language) => {
      if (language === 'en') return; // Skip current language

      // Find all dropdown items
      const menuItems = screen.getAllByTestId('dropdown-item');

      // Find and click the language item
      const langItem = menuItems.find(
        (item) => item.textContent === languageSwitcherConfig[language].label
      );

      fireEvent.click(langItem!);

      // Verify the changeLanguage function was called with the correct language
      expect(mockChangeLanguage).toHaveBeenCalledWith(language);

      // Reset for next iteration
      jest.clearAllMocks();
    });
  });

  it('should match a snapshot', () => {
    const { container } = render(<LanguageSwitcher currentLanguage="en" />);

    expect(container).toMatchSnapshot();
  });
});
