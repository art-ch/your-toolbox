import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';
import { useForm } from 'react-hook-form';
import { FormField as ShadCnFormField } from '@/components/ui/form';

jest.mock('@/components/ui/form', () => ({
  FormField: jest.fn(({ render, ...props }) => (
    <div data-testid="shadcn-form-field" {...props}>
      {render({ field: { value: 'test-value', onChange: jest.fn() } })}
    </div>
  ))
}));

describe('FormField', () => {
  type TestFormValues = {
    testField: string;
  };

  const useSetupForm = () => {
    return useForm<TestFormValues>({
      defaultValues: {
        testField: ''
      }
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the FormField component correctly', () => {
    const TestComponent = () => {
      const form = useSetupForm();
      return (
        <FormField
          form={form}
          name="testField"
          fieldRenderer={({ field }) => (
            <input data-testid="test-input" {...field} />
          )}
        />
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId('shadcn-form-field')).toBeInTheDocument();
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('passes the correct props to ShadCnFormField', () => {
    const TestComponent = () => {
      const form = useSetupForm();
      return (
        <FormField
          form={form}
          name="testField"
          fieldRenderer={({ field }) => (
            <input data-testid="test-input" {...field} />
          )}
        />
      );
    };

    render(<TestComponent />);

    expect(ShadCnFormField).toHaveBeenCalledWith(
      expect.objectContaining({
        control: expect.any(Object),
        name: 'testField',
        render: expect.any(Function)
      }),
      expect.anything()
    );
  });

  it('renders the field using the provided fieldRenderer', () => {
    const mockFieldRenderer = jest.fn(({ field }) => (
      <div data-testid="custom-field">{field.value}</div>
    ));

    const TestComponent = () => {
      const form = useSetupForm();
      return (
        <FormField
          form={form}
          name="testField"
          fieldRenderer={mockFieldRenderer}
        />
      );
    };

    render(<TestComponent />);

    expect(mockFieldRenderer).toHaveBeenCalled();
    expect(screen.getByTestId('custom-field')).toBeInTheDocument();
    expect(screen.getByTestId('custom-field')).toHaveTextContent('test-value');
  });

  it('works with different field types', () => {
    type ComplexFormValues = {
      name: string;
      age: number;
      isActive: boolean;
    };

    const TestComponent = () => {
      const form = useForm<ComplexFormValues>({
        defaultValues: {
          name: '',
          age: 0
        }
      });

      return (
        <>
          <FormField
            form={form}
            name="name"
            fieldRenderer={({ field }) => (
              <input
                data-testid="name-input"
                type="text"
                {...field}
                value={field.value as string}
              />
            )}
          />
          <FormField
            form={form}
            name="age"
            fieldRenderer={({ field }) => (
              <input
                data-testid="age-input"
                type="number"
                {...field}
                value={field.value as number}
              />
            )}
          />
        </>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('age-input')).toBeInTheDocument();
    expect(ShadCnFormField).toHaveBeenCalledTimes(2);
  });
});
