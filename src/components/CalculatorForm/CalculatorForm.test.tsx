import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculatorForm } from './CalculatorForm';
import { useCalculatorFormResult } from './hooks/useCalculatorFormResult';
import { z } from 'zod';

jest.mock('./hooks/useCalculatorFormResult', () => ({
  useCalculatorFormResult: jest.fn()
}));

describe('CalculatorForm', () => {
  const testFormSchema = z.object({
    value1: z.number().min(1),
    value2: z.number().min(1)
  });

  type TestFormValues = z.infer<typeof testFormSchema>;
  type TestResult = { sum: number };

  const mockOnSubmit = jest.fn().mockImplementation((data: TestFormValues) => {
    return { sum: data.value1 + data.value2 };
  });

  const mockRenderFields = jest.fn().mockImplementation((form) => (
    <>
      <div>
        <label htmlFor="value1">Value 1</label>
        <input
          id="value1"
          type="number"
          {...form.register('value1', { valueAsNumber: true })}
          data-testid="value1-input"
        />
      </div>
      <div>
        <label htmlFor="value2">Value 2</label>
        <input
          id="value2"
          type="number"
          {...form.register('value2', { valueAsNumber: true })}
          data-testid="value2-input"
        />
      </div>
    </>
  ));

  const mockRenderResult = jest
    .fn()
    .mockImplementation((result: TestResult) => (
      <div data-testid="result">Sum: {result.sum}</div>
    ));

  beforeEach(() => {
    jest.clearAllMocks();
    (useCalculatorFormResult as jest.Mock).mockImplementation(
      (formData, onSubmit) => {
        if (!formData) return null;
        return onSubmit(formData);
      }
    );
  });

  it('renders the form with title and subtitle', () => {
    render(
      <CalculatorForm
        title="Test Calculator"
        subtitle="Calculate the sum of two numbers"
        formModel={testFormSchema}
        onSubmit={mockOnSubmit}
        renderFields={mockRenderFields}
        renderResult={mockRenderResult}
      />
    );

    expect(screen.getByText('Test Calculator')).toBeInTheDocument();
    expect(
      screen.getByText('Calculate the sum of two numbers')
    ).toBeInTheDocument();
    expect(mockRenderFields).toHaveBeenCalled();
  });

  it('submits the form and displays the result', async () => {
    render(
      <CalculatorForm
        title="Test Calculator"
        formModel={testFormSchema}
        onSubmit={mockOnSubmit}
        renderFields={mockRenderFields}
        renderResult={mockRenderResult}
      />
    );

    const value1Input = screen.getByTestId('value1-input');
    const value2Input = screen.getByTestId('value2-input');

    await userEvent.type(value1Input, '5');
    await userEvent.type(value2Input, '10');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({ value1: 5, value2: 10 });

    await waitFor(() => {
      expect(mockRenderResult).toHaveBeenCalledWith(
        { sum: 15 },
        expect.anything()
      );
      expect(screen.getByText('Result:')).toBeInTheDocument();
      expect(screen.getByTestId('result')).toBeInTheDocument();
    });
  });

  it('does not display result before form submission', () => {
    render(
      <CalculatorForm
        title="Test Calculator"
        formModel={testFormSchema}
        onSubmit={mockOnSubmit}
        renderFields={mockRenderFields}
        renderResult={mockRenderResult}
      />
    );

    expect(screen.queryByText('Result:')).not.toBeInTheDocument();
  });

  it('handles form validation errors', async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(
      <CalculatorForm
        title="Test Calculator"
        formModel={testFormSchema}
        onSubmit={mockOnSubmit}
        renderFields={mockRenderFields}
        renderResult={mockRenderResult}
      />
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();

    expect(screen.queryByText('Result:')).not.toBeInTheDocument();

    console.error = originalConsoleError;
  });

  it('renders without subtitle when not provided', () => {
    render(
      <CalculatorForm
        title="Test Calculator"
        formModel={testFormSchema}
        onSubmit={mockOnSubmit}
        renderFields={mockRenderFields}
        renderResult={mockRenderResult}
      />
    );

    expect(screen.getByText('Test Calculator')).toBeInTheDocument();
    expect(
      screen.queryByText('Calculate the sum of two numbers')
    ).not.toBeInTheDocument();
  });
});
