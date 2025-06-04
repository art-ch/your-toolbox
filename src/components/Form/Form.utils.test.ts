import { preprocessNumericValue } from './Form.utils';

describe('Form utils', () => {
  describe('preprocessNumericValue', () => {
    it.each([
      { input: '', expected: NaN },
      { input: null, expected: NaN },
      { input: undefined, expected: NaN },
      { input: 0, expected: 0 },
      { input: 42, expected: 42 },
      { input: '42', expected: 42 },
      { input: '3.14', expected: 3.14 },
      { input: '-10', expected: -10 },
      { input: true, expected: 1 },
      { input: false, expected: 0 },
      { input: 'abc', expected: NaN },
      { input: {}, expected: NaN },
      { input: [], expected: 0 }
    ])(
      'should correctly process $input to $expected',
      ({ input, expected }) => {
        const result = preprocessNumericValue(input);

        if (Number.isNaN(expected)) {
          expect(Number.isNaN(result)).toBe(true);
        } else {
          expect(result).toBe(expected);
        }
      }
    );
  });
});
