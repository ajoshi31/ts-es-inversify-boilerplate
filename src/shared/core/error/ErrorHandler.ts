import { logger } from '@core/logger/Logger';
import { BaseError } from './BaseError';

class ErrorHandler {
  public async handleError(message: string, err: Error): Promise<void> {
    //ASDASDADS
    // const errPayload = {
    //   error: err,
    //   type: 'OPRATIONAL'
    // };
    logger.error('EV Logger: ' + message, err);
  }
  public isTrustedError(error: unknown) {
    if (error instanceof BaseError) {
      return error.errorValue().isOperational;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
