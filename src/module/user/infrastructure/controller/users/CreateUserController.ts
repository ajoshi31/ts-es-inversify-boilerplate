import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import { AppError } from '@core/error/AppError';
import { UserService } from '@user-module/application/usecase/UserService';
import { UserDTO } from '@user-module/application/dtos/UserDto';

@injectable()
export class CreateUserController extends BaseController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }
  public async executeImpl(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    // TODO : 1
    /*
     Check if we can find any case where request can cause issue as 
     we have already checked the validation class conversion in middleware, 
     if no issue can be found we can remove this this
    */
    const dto: UserDTO = {
      email: request.body.email,
      name: request.body.name
    };
    try {
      const result = await this.userService.createUser(dto);
      if (result.isLeft()) {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const error: any = result.value;
        switch (error.constructor) {
          case AppError.UnexpectedError:
            return this.fail(response, error, next);
          default:
            return this.fail(response, error, next);
        }
      } else {
        const userDetails = result.value.getValue();
        return this.ok<UserDTO>(response, userDetails);
      }
    } catch (err) {
      return this.fail(response, new AppError.UnexpectedError(err), next);
    }
  }
}
