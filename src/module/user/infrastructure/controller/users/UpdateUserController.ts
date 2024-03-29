import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import { UserService } from '@user-module/application/usecase/UserService';
import { UserDTO } from '@user-module/application/dtos/UserDto';

@injectable()
export class UpdateUserController extends BaseController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  public async executeImpl(request: Request, response: Response): Promise<any> {
    const result = await this.userService.updateUser(
      request.params.id,
      request.body
    );

    if (result.isRight()) {
      return this.ok<UserDTO>(response);
    }
  }
}
