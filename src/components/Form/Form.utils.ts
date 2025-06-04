/**
 * Preprocesses form input values for numeric validation
 * Converts empty string, null, or undefined to NaN
 * Otherwise converts value to number
 */
export const preprocessNumericValue = (value: unknown): number => {
  if (value === '' || value === null || value === undefined) {
    return NaN;
  }

  return Number(value);
};
