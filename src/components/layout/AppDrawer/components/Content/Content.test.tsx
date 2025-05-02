import { render } from '@testing-library/react';
import { Content } from './Content';

jest.mock('./Content.fixture', () => ({
  APP_DRAWER_CONTENT: [
    {
      title: 'Item 1',
      url: '/item1',
      icon: null,
      items: []
    },
    {
      title: 'Item 2',
      url: '/item2',
      icon: null,
      items: [
        { title: 'Subitem 1', url: '/subitem1' },
        { title: 'Subitem 2', url: '/subitem2' }
      ]
    }
  ]
}));

jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: jest.fn()
}));

describe('Content component', () => {
  it('should render correctly', () => {
    const { container } = render(<Content />);

    expect(container).toMatchSnapshot();
  });
});
