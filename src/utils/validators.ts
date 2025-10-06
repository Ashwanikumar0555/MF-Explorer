// Validation helpers for forms and inputs

export function isPositiveNumber(value: number) {
  return value > 0;
}

export function isValidEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isNonEmptyString(value: string) {
  return value.trim().length > 0;
}
