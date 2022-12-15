import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '@ioc/constant/types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import { UserService } from '@user-module/application/service/user.service';
import { AppError } from '@core/error/AppError';

@injectable()
export class CreateUserController extends BaseController {
  user: any;
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }
  public async executeImpl(request: Request, response: Response): Promise<any> {
    try {
      const result = await this.userService.createUser(request.body);
      if (result.isLeft()) {
        const error: any = result.value;
        switch (error.constructor) {
          case AppError.UnexpectedError:
            return this.fail(response, error.errorValue().message);
          default:
            return this.fail(response, error.errorValue());
        }
      } else {
        const userDetails = result.value.getValue();
        return this.ok<any>(response, userDetails);
      }
    } catch (err: any) {
      return this.fail(response, err);
    }
  }
}
