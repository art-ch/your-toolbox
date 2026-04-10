import { render } from '@testing-library/react';
import { WorldTimeClock } from './WorldTimeClock';
import { formatWorldTime } from './utils/formatWorldTime';

jest.mock('./utils/formatWorldTime', () => ({
  formatWorldTime: jest.fn()
}));

const mockFormatWorldTime = formatWorldTime as jest.MockedFunction<
  typeof formatWorldTime
>;

describe('WorldTimeClock', () => {
  const datetimeParts = {
    year: 2026,
    month: 4,
    day: 10,
    hour: 12,
    minute: 0,
    second: 0
  };

  const classNames = {
    time: 'text-2xl'
  };

  it('should render correctly', () => {
    mockFormatWorldTime.mockReturnValue('12-00 00');

    const { container } = render(
      <WorldTimeClock datetimeParts={datetimeParts} classNames={classNames} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should call formatWorldTime with correct arguments', () => {
    render(
      <WorldTimeClock datetimeParts={datetimeParts} classNames={classNames} />
    );

    expect(formatWorldTime).toHaveBeenCalledWith(datetimeParts);
  });
});
