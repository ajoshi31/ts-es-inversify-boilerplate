import { errorHandler } from '@core/error/ErrorHandler';
import express from 'express';
import { Request, Response } from 'express';
import { BaseController } from '../controller/BaseController';

const errorMiddleware = function (app: express.Application) {
  app.use(async (errObj: any, req: Request, res: Response) => {
    await errorHandler.handleError(errObj.err.errorValue().error);
    if (!errorHandler.isTrustedError(errObj.err)) {
      process.exit(1);
    }

    return BaseController.jsonResponse(res, errObj.status, errObj.message);
  });
};

export default errorMiddleware;
