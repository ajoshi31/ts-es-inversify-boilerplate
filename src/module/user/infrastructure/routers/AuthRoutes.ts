import TYPES from '@ioc/constant/Types';
import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { AuthController } from '../controller/AuthController';

@controller('/auth')
export abstract class AuthRouters {
  constructor(
    @inject(TYPES.AuthController)
    private readonly _authController: AuthController
  ) {}

  @httpPost('/')
  public async login(request: Request, response: Response, next: NextFunction) {
    return this._authController.execute(request, response, next);
  }

  @httpPost('/refresh')
  public async refresh(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._authController.refreshToken(request, response, next);
  }
}
