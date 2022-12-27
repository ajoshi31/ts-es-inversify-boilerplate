import { Result } from '@core/result/Result';
import { UseCaseError } from './UseCaseError';

export class BaseError extends Result<UseCaseError> {
  public constructor(err: Error, message: string, isOperational: boolean) {
    super(false, {
      message: message,
      error: err,
      isOperational: isOperational
    } as UseCaseError);
  }
}
