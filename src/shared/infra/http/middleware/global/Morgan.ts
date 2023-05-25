import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { logger } from '@core/logger/Logger';
import { AppUtils } from '@core/utils/AppUtils';
import config from '@config/config';
import * as dotenv from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';
dotenv.config();

const MORGAN_TEXT =
  ':remote-addr <-> :method <-> :url <-> :user <-> :res[content-length] <-> :response-time ms';

const winstonStream = {
  write: (message: string) => {
    logger.info(message);
  }
};

morgan.token('user', (req: Request, res: Response): any => {
  const token = req.header('accessToken') as string;
  const user = new AppUtils().verifyToken(
    token,
    config.ACCESS_TOKEN_KEY as string
  ) as JwtPayload;
  return user.isRight() ? user.value.userId : '';
});

const morganMiddleware = (app: express.Application) => {
  app.use(morgan(MORGAN_TEXT, { stream: winstonStream }));
};

export default morganMiddleware;
