import { errorHandler } from '@core/error/ErrorHandler';
import { IBaseErrorObject } from '@core/error/IBaseErrorObject';
import express, { Request, Response, NextFunction } from 'express';
import { BaseController } from '../controller/BaseController';

const errorMiddleware = function(app: express.Application) {
  app.use(
    async (
      errObj: IBaseErrorObject,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      let myErr, status, errorRef;
      let message: string | any;
      if (errObj.err === undefined) {
        myErr = errObj;
        status = 500;
        message = 'Unexpected Error';
      } else {
        myErr = errObj.err.errorValue().error;
        status = errObj.status;
        message = errObj.message;
        errorRef = errObj.err.errorValue().error?.code || null;
      }
      await errorHandler.handleError(message, myErr);
      if (!errorHandler.isTrustedError(errObj.err)) {
        process.exit(1);
      }

      return BaseController.errorResponse(res, status, message, errorRef);
    }
  );
};

export default errorMiddleware;
