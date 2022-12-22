import { winstonLoggerInstance } from '@shared-infra/logger/WinstonLoggerImpl';
import ILogger from './ILogger';

// File name
class AppLogger {
  logger: ILogger;
  constructor(logger: ILogger) {
    this.logger = logger;
  }

  silly(msg: string, meta?: unknown): void {
    this.logger.log('silly', msg, meta);
  }

  trace(msg: string, meta?: unknown) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: string, meta?: unknown) {
    this.logger.debug(msg, meta);
  }

  info(msg: string, meta?: unknown) {
    this.logger.info(msg, meta);
  }

  warn(msg: string, meta?: unknown) {
    this.logger.warn(msg, meta);
  }

  error(msg: string, meta?: unknown) {
    this.logger.error(msg, meta);
  }

  fatal(msg: string, meta?: unknown) {
    this.logger.log('fatal', msg, meta);
  }
}

const logger = new AppLogger(winstonLoggerInstance);
export { logger };
