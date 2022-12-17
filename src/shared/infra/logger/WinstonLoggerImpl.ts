import { Logger } from 'winston';
import ILogger from '@core/logger/ILogger';

import { WinstonLogger } from './Winston';

class WinstonLoggerImpl implements ILogger {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  log(msg: string, meta?: unknown): void {
    this.logger.log('log', msg, meta);
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

// Exporting as singelton
export const winstonLoggerInstance = new WinstonLoggerImpl(
  new WinstonLogger().getWinstonLogger()
);
