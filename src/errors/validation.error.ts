import { ValidationErrorField } from '../types/validation-error-field.type.js';

export default class ValidationError extends Error {
  constructor(
    public message: string,
    public errors: ValidationErrorField[],
  ) {
    super(message);
  }
}
