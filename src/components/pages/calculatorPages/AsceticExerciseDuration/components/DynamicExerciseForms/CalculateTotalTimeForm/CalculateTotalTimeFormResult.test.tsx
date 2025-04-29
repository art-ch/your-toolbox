import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateTotalTimeFormResult,
  CalculateTotalTimeFormResultProps
} from './CalculateTotalTimeFormResult';
import { getIsWalking } from '../../../utils/dynamicExerciseUtils/utils';
import { MENTAL_LAYER_AMOUNT } from '../../../constants/contants';
import { formatTime } from '@/utils/timeUtils';

jest.mock('../../../utils/dynamicExerciseUtils/utils', () => ({
  getIsWalking: jest.fn()
}));

jest.mock('@/utils/timeUtils', () => ({
  formatTime: jest.fn()
}));

const formatTimeMock = formatTime as jest.Mock;
const getIsWalkingMock = getIsWalking as jest.Mock;

describe('CalculateTotalTimeFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    mentalLayers: 3,
    speed: 5
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateTotalTimeFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation((time) => `${time} minutes`);
  });

  it('renders walking message when speed indicates walking', () => {
    getIsWalkingMock.mockReturnValue(true);
    const result = 45;

    render(<CalculateTotalTimeFormResult result={result} form={mockForm} />);

    expect(getIsWalking).toHaveBeenCalledWith(5);
    expect(formatTime).toHaveBeenCalledWith(45);
    expect(
      screen.getByText(
        /You have to walk for 45 minutes to clean 3 mental layers at a speed of 5 km\/h/i
      )
    ).toBeInTheDocument();
  });

  it('renders running message when speed indicates running', () => {
    getIsWalkingMock.mockReturnValue(false);
    const result = 30;

    render(<CalculateTotalTimeFormResult result={result} form={mockForm} />);

    expect(getIsWalking).toHaveBeenCalledWith(5);
    expect(formatTime).toHaveBeenCalledWith(30);
    expect(
      screen.getByText(
        /You have to run for 30 minutes to clean 3 mental layers at a speed of 5 km\/h/i
      )
    ).toBeInTheDocument();
  });

  it('uses values from form correctly', () => {
    getIsWalkingMock.mockReturnValue(true);
    const result = 60;
    getValues.mockImplementation(() => ({
      mentalLayers: MENTAL_LAYER_AMOUNT,
      speed: 7
    }));

    render(<CalculateTotalTimeFormResult result={result} form={mockForm} />);

    expect(getIsWalking).toHaveBeenCalledWith(7);
    expect(formatTime).toHaveBeenCalledWith(60);
    expect(
      screen.getByText(
        /You have to walk for 60 minutes to clean 5 mental layers at a speed of 7 km\/h/i
      )
    ).toBeInTheDocument();

    expect(mockForm.getValues).toHaveBeenCalledTimes(3);
  });
});
