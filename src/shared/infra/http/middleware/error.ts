import { errorHandler } from '@core/error/ErrorHandler';
import express from 'express';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = function (app: express.Application) {
  app.use(
    async (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (!errorHandler.isTrustedError(err)) {
        // it is serious
        // res.json({ success: false, message: err.message, error: err });
        next(err);
      }
      await errorHandler.handleError(err);
    }
  );
};

export default errorMiddleware;
