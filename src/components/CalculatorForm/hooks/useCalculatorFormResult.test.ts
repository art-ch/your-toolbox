import { renderHook } from '@testing-library/react';
import { useCalculatorFormResult } from './useCalculatorFormResult';

describe('useCalculatorFormResult', () => {
  test('should return null initially when formData is null', () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() =>
      useCalculatorFormResult(null, onSubmit)
    );

    expect(result.current).toBeNull();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('should calculate result when initial formData is provided', () => {
    const mockData = { value: 5 };
    const onSubmit = jest.fn().mockReturnValue(10);

    const { result } = renderHook(() =>
      useCalculatorFormResult(mockData, onSubmit)
    );

    expect(onSubmit).toHaveBeenCalledWith(mockData);
    expect(result.current).toBe(10);
  });

  test('should recalculate when formData changes', () => {
    const initialData = { value: 5 };
    const newData = { value: 10 };
    const onSubmit = jest
      .fn()
      .mockImplementationOnce(() => 10)
      .mockImplementationOnce(() => 20);

    const { result, rerender } = renderHook(
      ({ data }) => useCalculatorFormResult(data, onSubmit),
      { initialProps: { data: initialData } }
    );

    expect(onSubmit).toHaveBeenCalledWith(initialData);
    expect(result.current).toBe(10);

    rerender({ data: newData });

    expect(onSubmit).toHaveBeenCalledWith(newData);
    expect(onSubmit).toHaveBeenCalledTimes(2);
    expect(result.current).toBe(20);
  });

  test('should not recalculate when formData changes to null', () => {
    const initialData = { value: 5 } as { value: number } | null;
    const onSubmit = jest.fn().mockReturnValue(10);

    const { result, rerender } = renderHook(
      ({ data }) => useCalculatorFormResult(data, onSubmit),
      { initialProps: { data: initialData } }
    );

    expect(result.current).toBe(10);
    expect(onSubmit).toHaveBeenCalledTimes(1);

    rerender({ data: null });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(10);
  });

  test('should recalculate when onSubmit function changes', () => {
    const mockData = { value: 5 };
    const firstOnSubmit = jest.fn().mockReturnValue(10);
    const secondOnSubmit = jest.fn().mockReturnValue(15);

    const { result, rerender } = renderHook(
      ({ data, submitFn }) => useCalculatorFormResult(data, submitFn),
      { initialProps: { data: mockData, submitFn: firstOnSubmit } }
    );

    expect(result.current).toBe(10);
    expect(firstOnSubmit).toHaveBeenCalledTimes(1);

    rerender({ data: mockData, submitFn: secondOnSubmit });

    expect(secondOnSubmit).toHaveBeenCalledWith(mockData);
    expect(result.current).toBe(15);
  });

  test('should handle complex data types', () => {
    const complexData = {
      numbers: [1, 2, 3],
      nested: { value: 'test' }
    } as const;

    const onSubmit = jest.fn().mockImplementation((data) => ({
      sum: (data as typeof complexData).numbers.reduce((a, b) => a + b, 0),
      text: data.nested.value
    }));

    const { result } = renderHook(() =>
      useCalculatorFormResult(complexData, onSubmit)
    );

    expect(result.current).toEqual({ sum: 6, text: 'test' });
  });
});
