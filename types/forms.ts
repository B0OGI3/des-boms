/**
 * Generic form types and validation utilities
 */

// Form field types
export interface FormField<T = any> {
  name: string;
  value: T;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// Form validation types
export interface ValidationRule<T = any> {
  validate: (value: T) => boolean;
  message: string;
}

export interface FormValidation<T = Record<string, any>> {
  [key: string]: ValidationRule<any>[];
}

// Generic form state
export interface FormState<T = Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

// Common validation rules
export const validationRules = {
  required: <T>(message = 'This field is required'): ValidationRule<T> => ({
    validate: (value: T) => value !== null && value !== undefined && value !== '',
    message,
  }),
  
  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value: string) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),
  
  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value: string) => value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),
  
  email: (message = 'Please enter a valid email address'): ValidationRule<string> => ({
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),
  
  phone: (message = 'Please enter a valid phone number'): ValidationRule<string> => ({
    validate: (value: string) => /^[+]?[1-9]\d{0,15}$/.test(value.replace(/\s/g, '')),
    message,
  }),
  
  number: (message = 'Please enter a valid number'): ValidationRule<string> => ({
    validate: (value: string) => !isNaN(Number(value)),
    message,
  }),
  
  positiveNumber: (message = 'Please enter a positive number'): ValidationRule<number> => ({
    validate: (value: number) => value > 0,
    message,
  }),
  
  date: (message = 'Please enter a valid date'): ValidationRule<string> => ({
    validate: (value: string) => !isNaN(Date.parse(value)),
    message,
  }),
  
  futureDate: (message = 'Date must be in the future'): ValidationRule<string> => ({
    validate: (value: string) => new Date(value) > new Date(),
    message,
  }),
};
