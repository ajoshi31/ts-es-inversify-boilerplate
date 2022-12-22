import { Result } from '@core/result/Result';
import { BaseError } from './BaseError';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err,
        isOperational: false
      } as UseCaseError);
    }
  }

  export class DatabaseError extends BaseError {
    public constructor(err: any) {
      super(err, 'A data base error occoured', true);
    }
  }
}
