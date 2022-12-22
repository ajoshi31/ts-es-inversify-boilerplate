import { errorHandler } from '@core/error/ErrorHandler';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../controller/BaseController';

const errorMiddleware = function (app: express.Application) {
  app.use(
    async (errObj: any, req: Request, res: Response, next: NextFunction) => {
      const errorPass: Error = new Error(errObj.err.errorValue().error);
      await errorHandler.handleError(errorPass);
      const errorStatus = await errorHandler.isTrustedError(errObj);
      if (!errorStatus) {
        return BaseController.jsonResponse(
          res,
          errObj.status,
          errObj.err.errorValue().message
        );
      }
    }
  );
};

export default errorMiddleware;
