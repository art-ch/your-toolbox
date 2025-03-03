import { render } from '@testing-library/react';

import { SpecializedTools } from './SpecializedTools';

describe('SpecializedTools component', () => {
  it('should render correctly', () => {
    const { container } = render(<SpecializedTools />);

    expect(container).toMatchSnapshot();
  });
});
