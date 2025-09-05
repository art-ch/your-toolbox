import { render } from '@testing-library/react';
import { Tabs } from '@/components/ui/tabs';
import { FormTab } from './FormTab';

describe('FormTab', () => {
  it('should render', () => {
    const { container } = render(
      <Tabs value="test">
        <FormTab value="test">
          <div>Child</div>
        </FormTab>
      </Tabs>
    );

    expect(container).toMatchSnapshot();
  });
});
