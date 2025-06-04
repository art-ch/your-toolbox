import { render } from '@testing-library/react';
import { PageLoading } from './PageLoading';

describe('PageLoading', () => {
  it('should render the page loading component', () => {
    const { container } = render(<PageLoading />);

    expect(container).toMatchSnapshot();
  });
});
