import { render } from '@testing-library/react';

import { YearDate } from './YearDate';

const datetimeParts = {
  year: 2026,
  month: 4,
  day: 10,
  hour: 12,
  minute: 0,
  second: 0
};

const classNames = { calendarParts: 'text-2xl' };

describe('YearDate', () => {
  it('should render correctly', () => {
    const { container } = render(
      <YearDate datetimeParts={datetimeParts} classNames={classNames} />
    );

    expect(container).toMatchSnapshot();
  });
});
