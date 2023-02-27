import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const DtoRouteValidationMiddleware = (dtoClass: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const output = plainToInstance(dtoClass, req.body);
    validate(output, { skipMissingProperties: true }).then((errors) => {
      if (errors.length > 0) {
        let errorTexts: Array<unknown> = [];
        for (const errorItem of errors) {
          errorTexts = errorTexts.concat(errorItem.constraints);
        }
        const responseObject = {
          status: 'error',
          data: null,
          message: 'There are some validation error with the API request',
          errors: errorTexts,
          code: 'VAL001',
          errorRef: 'jaksjk'
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
