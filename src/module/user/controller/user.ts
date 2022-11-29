import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from 'inversify-express-utils';

import { inject, interfaces } from 'inversify';
import { Request, Response } from 'express';


import { UserDTO } from './UserDto';

import { IUser, UserService } from '@user-module/service/user';
import TYPES from '@ioc/constant/types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import validationMw from '@shared-infra/http/middleware/validateMw';

@controller('/user')
export abstract class UserController extends BaseController {
  final: any;
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  @httpGet('/')
  public async getUsers(request: Request, response: Response): Promise<any> {
    const result = await this.userService.getUsers();
    if (result.isRight()) {
      this.final = result.value.getValue();
    }
    return this.ok<any>(response, result.value.getValue());
  }

  @httpPost('/', validationMw(UserDTO))
  public async newUser(request: Request, response: Response): Promise<any> {
    return await this.userService.newUser(request.body);
  }

  @httpPut('/:id')
  public updateUser(request: Request): IUser {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): string {
    return this.userService.deleteUser(request.params.id);
  }
}
