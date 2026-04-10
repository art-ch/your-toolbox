import { fireEvent, render } from '@testing-library/react';

import { Controls } from './Controls';

describe('Controls', () => {
  const zoneIndex = '3';
  const selectZone = jest.fn();

  it('should render correctly without active time zone', () => {
    const { container } = render(
      // non-existing zone index in WORLD_TIME_ZONES array means that user has not selected any time zone yet
      // and is presented with the local time
      <Controls zoneIndex={'0'} selectZone={selectZone} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with active time zone', () => {
    const { container } = render(
      <Controls zoneIndex={zoneIndex} selectZone={selectZone} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should call selectZone when a button is clicked', () => {
    const { getByText } = render(
      <Controls zoneIndex={zoneIndex} selectZone={selectZone} />
    );

    fireEvent.click(getByText('Kyiv'));

    // 3 is the index of Europe/Kyiv in the WORLD_TIME_ZONES array
    expect(selectZone).toHaveBeenCalledWith('3');
  });
});
