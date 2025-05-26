import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateDurationFromLayersFormResult,
  CalculateDurationFromLayersFormResultProps
} from './CalculateDurationFromLayersFormResult';

describe('CalculateDurationFromLayersFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    mentalLayers: 3
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateDurationFromLayersFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with correct mental layers count', () => {
    const result = 45;

    render(
      <CalculateDurationFromLayersFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByTestId('calculate-duration-from-layers-form-result')
    ).toBeInTheDocument();
    expect(screen.getByText('To clean 3 mental layers')).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(1);
  });

  it('displays the correct duration in minutes', () => {
    const result = 30;

    render(
      <CalculateDurationFromLayersFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(
        'You have to sit in a seated asana pose or stand still uninteruptedly for 30 minutes'
      )
    ).toBeInTheDocument();
  });

  it('updates correctly when different values are provided', () => {
    getValues.mockImplementation(() => ({
      mentalLayers: 5
    }));
    const result = 60;

    render(
      <CalculateDurationFromLayersFormResult result={result} form={mockForm} />
    );

    expect(screen.getByText('To clean 5 mental layers')).toBeInTheDocument();
    expect(
      screen.getByText(
        'You have to sit in a seated asana pose or stand still uninteruptedly for 60 minutes'
      )
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(1);
  });

  it('handles single mental layer case', () => {
    getValues.mockImplementation(() => ({
      mentalLayers: 1
    }));
    const result = 15;

    render(
      <CalculateDurationFromLayersFormResult result={result} form={mockForm} />
    );

    expect(screen.getByText('To clean 1 mental layers')).toBeInTheDocument();
    expect(
      screen.getByText(
        'You have to sit in a seated asana pose or stand still uninteruptedly for 15 minutes'
      )
    ).toBeInTheDocument();
  });
});
