import { logger } from '@core/logger/Logger';
import { BaseError } from './BaseError';

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    logger.error(
      'Error message from the centralized error-handling component',
      err
    );
  }
  public isTrustedError(error: unknown) {
    if (error instanceof BaseError) {
      return error.errorValue().isOperational;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
