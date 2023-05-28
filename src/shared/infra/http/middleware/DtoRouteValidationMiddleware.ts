import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IResponseData } from '@core/utils/IResponseData';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const DtoRouteValidationMiddleware = (dtoClass: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const output = plainToInstance(dtoClass, req.body);
    // skipMissingProperties: true  -> while updating(PUT request)
    // skipMissingProperties: false  -> while creating(POST request)
    const skipProps = req.method === 'POST' ? false : true;
    validate(output, { skipMissingProperties: skipProps }).then((errors) => {
      if (errors.length > 0) {
        let errorTexts: any[] = [];
        for (const errorItem of errors) {
          errorTexts = errorTexts.concat(errorItem.constraints);
        }
        const responseObject: IResponseData<any> = {
          status: 'error',
          data: null,
          message: 'There are some validation error with the API request',
          errors: errorTexts,
          code: '400',
          errorRef: null
        };
        res.status(400).send(responseObject);
        return;
      } else {
        next();
      }
    });
  };
};

export default DtoRouteValidationMiddleware;
