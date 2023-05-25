import { Result } from '@core/result/Result';
import { BaseError } from './BaseError';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: unknown) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err,
        isOperational: false
      } as UseCaseError);
    }
  }

  export class DatabaseError extends BaseError {
    public constructor(err: unknown, message: string) {
      super(message, true, err as Error);
    }
  }

  export class NoRecordFoundError extends BaseError {
    public constructor(message: string) {
      super(message, true);
    }
  }
}
