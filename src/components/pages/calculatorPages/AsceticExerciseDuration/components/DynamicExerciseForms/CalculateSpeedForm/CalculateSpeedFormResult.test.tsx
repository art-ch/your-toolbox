import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateSpeedFormResult,
  CalculateSpeedFormResultProps
} from './CalculateSpeedFormResult';
import { getIsWalking } from '../../../utils/dynamicExerciseUtils/utils';
import { formatTime } from '@/utils/timeUtils';
import { MENTAL_LAYER_AMOUNT } from '../../../constants/contants';

jest.mock('../../../utils/dynamicExerciseUtils/utils', () => ({
  getIsWalking: jest.fn()
}));

jest.mock('@/utils/timeUtils', () => ({
  formatTime: jest.fn()
}));

const formatTimeMock = formatTime as jest.Mock;
const getIsWalkingMock = getIsWalking as jest.Mock;

describe('CalculateSpeedFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    mentalLayers: 3,
    duration: 1800 // 30 minutes in seconds
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateSpeedFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockReturnValue('30 minutes');
  });

  test('renders walking message when speed indicates walking', () => {
    getIsWalkingMock.mockReturnValue(true);
    const result = 5; // 5 km/h (walking speed)

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText(
        /You need to walk with the speed of 5 km\/h to clean 3 mental layers in 30 minutes./i
      )
    ).toBeInTheDocument();
    expect(getIsWalking).toHaveBeenCalledWith(result);
    expect(formatTime).toHaveBeenCalledWith(1800);
  });

  test('renders running message when speed indicates running', () => {
    getIsWalkingMock.mockReturnValue(false);
    const result = 10; // 10 km/h (running speed)

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText(
        /You need to run with the speed of 10 km\/h to clean 3 mental layers in 30 minutes./i
      )
    ).toBeInTheDocument();
    expect(getIsWalking).toHaveBeenCalledWith(result);
  });

  test('does not show warning for achievable speeds', () => {
    getIsWalkingMock.mockReturnValue(false);
    const result = 15; // 15 km/h (achievable running speed)

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(
      screen.queryByText(/That's lightning fast!/i)
    ).not.toBeInTheDocument();
  });

  test('shows warning for speeds that are hard to achieve', () => {
    getIsWalkingMock.mockReturnValue(false);
    const result = 50; // 50 km/h (unrealistic speed)

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/That's lightning fast!/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /The current world record for sprint speed is about 45 km\/h/i
      )
    ).toBeInTheDocument();
  });

  test('uses correct form values in the message', () => {
    getIsWalkingMock.mockReturnValue(false);
    getValues.mockImplementation(() => ({
      mentalLayers: MENTAL_LAYER_AMOUNT,
      duration: 3600 // 1 hour in seconds
    }));
    formatTimeMock.mockReturnValue('1 hour');
    const result = 12;

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText(
        /You need to run with the speed of 12 km\/h to clean 5 mental layers in 1 hour./i
      )
    ).toBeInTheDocument();
  });
});
