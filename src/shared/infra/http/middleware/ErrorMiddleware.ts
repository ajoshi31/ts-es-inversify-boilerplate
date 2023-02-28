import { errorHandler } from '@core/error/ErrorHandler';
import { IBaseErrorObject } from '@core/error/IBaseErrorObject';
import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { BaseController } from '../controller/BaseController';

const errorMiddleware = function (app: express.Application) {
  app.use(
    async (
      errObj: IBaseErrorObject,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      let myErr, status;
      let message: string | any;
      if (errObj.err === undefined) {
        myErr = errObj;
        status = 500;
        message = 'Phat gaya';
      } else {
        myErr = errObj.err.errorValue().error;
        status = errObj.status;
        message = errObj.message;
      }
      await errorHandler.handleError(message.message, myErr);
      if (!errorHandler.isTrustedError(errObj.err)) {
        process.exit(1);
        // SERVICE SHULD TERMINATE BUT THIS REQUEST SHOULD COMPLETE
        // GRACEFULLY RESTART -> PM2, EC2 INSTANCE -> not possible in dev but it will work in server
      }

      return BaseController.errorResponse(res, status, message.message);
    }
  );
};

export default errorMiddleware;
