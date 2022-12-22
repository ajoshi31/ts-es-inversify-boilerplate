import express from 'express';
import morgan from 'morgan';
import { logger } from '@core/logger/LoggerV1';

const winstonStream = {
  write: (message: string) => {
    logger.info(message);
  }
};
const morganMiddleware = (app: express.Application) => {
  app.use(morgan('combined', { stream: winstonStream }));
};

export default morganMiddleware;
