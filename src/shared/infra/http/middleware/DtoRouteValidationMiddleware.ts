import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

const DtoRouteValidationMiddleware = (dtoClass: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const output: any = plainToInstance(dtoClass, req.body);
    validate(output, { skipMissingProperties: true }).then((errors) => {
      if (errors.length > 0) {
        let errorTexts: any = [];
        for (const errorItem of errors) {
          errorTexts = errorTexts.concat(errorItem.constraints);
        }
        res.status(400).send(errorTexts);
        return;
      } else {
        next();
      }
    });
  };
};

export default DtoRouteValidationMiddleware;
