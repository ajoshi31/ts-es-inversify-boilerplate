import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../../../module/user/config/config';

const CheckAuthToken = () => {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = <any>req.headers.authorization;
      // check if access token is valid
      const jwtPayload = <any>jwt.verify(token, config.jwtSecret);
      res.locals.jwtPayload = jwtPayload;
      // extract username from payload and place it in response locals
      res.locals.username = jwtPayload['username'];
    } catch (error) {
      console.log('---');
      res.status(401).send();
    }
    next();
  };
};

export default CheckAuthToken;
