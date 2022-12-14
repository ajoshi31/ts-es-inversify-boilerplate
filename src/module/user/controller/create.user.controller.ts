import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '@ioc/constant/types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import { UserService } from '@user-module/service/user';
import { AppError } from '@core/error/AppError';

@injectable()
export class CreateUserController extends BaseController {
  final: any;
  user: any;

  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }
  public async executeImpl(request: Request, response: Response): Promise<any> {
    try {
      const userCreatedOrError = await this.userService.newUser(request.body);
      if (userCreatedOrError.isRight()) {
        this.user = userCreatedOrError.value.getValue();
      }
      if (userCreatedOrError.isLeft()) {
        const error: any = userCreatedOrError.value;
        switch (error.constructor) {
          case AppError.UnexpectedError:
            return this.fail(response, error.errorValue().message);
          default:
            return this.fail(response, error.errorValue());
        }
      } else {
        return this.ok<any>(response, this.user);
      }
    } catch (err: any) {
      return this.fail(response, err);
    }
  }
}