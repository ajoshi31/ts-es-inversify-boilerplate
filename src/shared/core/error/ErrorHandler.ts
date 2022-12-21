import { logger } from '@core/logger/Logger';
import { UseCaseError } from './UseCaseError';

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await logger.error(
      'Error message from the centralized error-handling component',
      err
    );
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }

  public isTrustedError(error: Error) {
    if (error instanceof UseCaseError) {
      //   return error.isOperationalError;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
