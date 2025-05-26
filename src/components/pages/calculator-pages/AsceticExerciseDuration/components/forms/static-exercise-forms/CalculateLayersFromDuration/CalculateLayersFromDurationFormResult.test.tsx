import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateLayersFromDurationFormResult,
  CalculateLayersFromDurationFormResultProps
} from './CalculateLayersFromDurationFormResult';

describe('CalculateLayersFromDurationFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    duration: 30
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateLayersFromDurationFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with correct duration', () => {
    const result = 3;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByTestId('calculate-layers-from-duration-form-result')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'After you have sit in a seated asana pose or have standed still uninteruptedly for 30 minutes'
      )
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(1);
  });

  it('displays the correct number of mental layers cleaned', () => {
    const result = 3;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText('You will have 3 mental layers cleaned')
    ).toBeInTheDocument();
  });

  it('updates correctly when different duration is provided', () => {
    getValues.mockImplementation(() => ({
      duration: 60
    }));
    const result = 5;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(
        'After you have sit in a seated asana pose or have standed still uninteruptedly for 60 minutes'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('You will have 5 mental layers cleaned')
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(1);
  });

  it('handles single mental layer case', () => {
    const result = 1;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText('You will have 1 mental layers cleaned')
    ).toBeInTheDocument();
  });

  it('handles short duration', () => {
    getValues.mockImplementation(() => ({
      duration: 5
    }));
    const result = 0.5;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(
        'After you have sit in a seated asana pose or have standed still uninteruptedly for 5 minutes'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('You will have 0.5 mental layers cleaned')
    ).toBeInTheDocument();
  });

  it('handles long duration', () => {
    getValues.mockImplementation(() => ({
      duration: 120
    }));
    const result = 10;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(
        'After you have sit in a seated asana pose or have standed still uninteruptedly for 120 minutes'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('You will have 10 mental layers cleaned')
    ).toBeInTheDocument();
  });
});
