import { logger } from '@core/logger/logger';
import { Result } from '@core/result/result';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err
      } as UseCaseError);
      logger.info(`[AppError]: An unexpected error occurred`);
      logger.error(err);
    }

    public static create(err: UnexpectedError): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class DatabaseError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        message: `A database error occurred.`,
        error: err
      } as UseCaseError);
      logger.error(`[Database Error]: A database error occurred`);
      logger.error(err);
    }

    public static create(err: DatabaseError): DatabaseError {
      return new DatabaseError(err);
    }
  }
}
