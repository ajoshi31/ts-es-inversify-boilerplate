/* eslint-disable  @typescript-eslint/no-explicit-any */
import { logger } from '@core/logger/Logger';
import { errorHandler } from './ErrorHandler';

const terminate = (
  server: any,
  options = { coredump: false, timeout: 500 }
) => {
  const exit = (code: any) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: any, reason: any) => (err: Error) => {
    if (err && err instanceof Error) {
      logger.error(reason);

      errorHandler.handleError(err);
      if (!errorHandler.isTrustedError(err)) {
        process.exit(code);
      }
    }
    // Attempt a graceful shutdown
    server.close(exit);
    setTimeout(exit, options.timeout).unref();
  };
};

export default terminate;
