import express from 'express';
import { logger } from '@core/logger/logger';
import morgan from 'morgan';

const winstonStream = {
  write: (message: string) => {
    logger.info(message);
  }
};
const morganMiddleware = (app: express.Application) => {
  app.use(morgan('combined', { stream: winstonStream }));
};

export default morganMiddleware;
