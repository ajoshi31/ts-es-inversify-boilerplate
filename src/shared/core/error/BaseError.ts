import { Result } from '@core/result/Result';
import { UseCaseError } from './UseCaseError';

export class BaseError extends Result<UseCaseError> {
  public constructor(message: string, isOperational: boolean, err?: Error) {
    let useCaseError;
    if (err) {
      useCaseError = {
        message: message,
        error: err,
        isOperational: isOperational
      };
    } else {
      useCaseError = {
        message: message,
        isOperational: isOperational
      };
    }
    super(false, useCaseError as UseCaseError);
  }
}
