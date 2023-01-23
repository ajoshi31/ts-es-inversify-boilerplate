import { createLogger, format, transports, Logger } from 'winston';
const { combine, timestamp, printf, errors } = format;
import fs = require('fs');
import DailyRotateFile = require('winston-daily-rotate-file');

const logDir = 'log';

export class WinstonLogger {
  private logger: Logger;

  constructor() {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    this.logger = createLogger({
      level: 'info',
      transports: [
        new transports.Console({
          level: 'debug',
          handleExceptions: false
        }),
        new DailyRotateFile({
          level: 'info',
          filename: `${logDir}/info-logs/-results.log`,
          datePattern: 'DD-MM-YYYY',
          json: true,
          eol: '\n\n'
        }),
        new DailyRotateFile({
          level: 'error',
          filename: `${logDir}/error-logs/-results.log`,
          datePattern: 'DD-MM-YYYY',
          json: true,
          handleExceptions: true,
          eol: '\n\n\n'
        })
      ],
      format: combine(
        errors({ stack: true }),
        this.errorStackFormat(),
        format.json(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSZZ' }),
        this.myFormat
      ),
      exitOnError: false
    });
  }

  getWinstonLogger(): Logger {
    return this.logger;
  }

  errorStackFormat = format((error) => {
    if (error instanceof Error) {
      return Object.assign({}, error, {
        stack: error.stack,
        message: error.message
      });
    }
    return error;
  });

  myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : "----${message}-----" `;
    if (metadata) {
      msg += JSON.stringify(metadata);
    }
    return msg;
  });
}
