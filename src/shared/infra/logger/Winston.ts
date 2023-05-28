import { createLogger, format, transports, Logger } from 'winston';
const { combine, timestamp, printf } = format;
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';
import { LoggingWinston } from '@google-cloud/logging-winston';

const logDir = 'log';

const alignColorsAndTime = format.combine(
  format.colorize({
    all: true
  }),
  format.label({
    label: '[LOGGER]'
  }),
  format.timestamp({
    format: 'YY-MM-DD HH:mm:ss'
  }),
  format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
);
export class WinstonLogger {
  private logger: Logger;

  constructor() {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'preproduction'
    ) {
      //Google App Engine
      //Imports the Google Cloud client library for Winston
      const loggingWinston = new LoggingWinston({
        projectId: 'feisty-audio-278013',
        // to handle errors which were not handled
        defaultCallback: (err: any) => {
          if (err) {
            console.log('[Handle] Error occured: ' + err);
          }
        }
      });

      this.logger = createLogger({
        level: 'info',
        transports: [
          new transports.Console({
            level: 'debug'
          }),
          // Add Stackdriver Logging
          loggingWinston
        ],
        format: combine(
          this.errorStackFormat(),
          /* errors({ stack: true }), // <-- use errors format */
          format.json(),
          /* json(), */
          timestamp({ format: 'DD-MM-YYYY HH:mm:ss.SSSZZ' }),
          this.myFormat
        )
      });
    } else {
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
      }
      this.logger = createLogger({
        level: 'info',
        transports: [
          new transports.Console({
            level: 'debug',
            format: format.combine(format.colorize(), alignColorsAndTime),
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
          this.errorStackFormat(),
          format.json(),
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSZZ' }),
          this.myFormat
        ),
        exitOnError: false
      });
    }
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
