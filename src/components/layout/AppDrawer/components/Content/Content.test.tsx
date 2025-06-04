import { render } from '@testing-library/react';
import { Content } from './Content';

// Mock the sidebar components
jest.mock('@/components/ui/sidebar', () => ({
  SidebarContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-content">{children}</div>
  ),
  SidebarGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group">{children}</div>
  ),
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu">{children}</div>
  ),
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-item">{children}</div>
  ),
  SidebarMenuButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-button">{children}</div>
  ),
  SidebarMenuSub: ({
    children,
    className
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="sidebar-menu-sub" className={className}>
      {children}
    </div>
  ),
  SidebarMenuSubItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-sub-item">{children}</div>
  ),
  SidebarMenuSubButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-sub-button">{children}</div>
  ),
  SidebarProvider: ({
    children,
    className
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="sidebar-provider" className={className}>
      {children}
    </div>
  )
}));

// Mock the Content.config with updated structure
jest.mock('./Content.config', () => ({
  APP_DRAWER_CONTENT: [
    {
      translationKey: 'common:calculators',
      url: '/calculators',
      icon: null,
      menuOptions: []
    },
    {
      translationKey: 'common:specializedTools',
      url: '/specialized-tools',
      icon: null,
      menuOptions: [
        { translationKey: 'tool1:title', url: '/tool1' },
        { title: 'Tool 2', url: '/tool2' }
      ]
    }
  ]
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));

describe('Content component', () => {
  it('should render correctly', () => {
    const { container } = render(<Content />);

    expect(container).toMatchSnapshot();
  });
});
