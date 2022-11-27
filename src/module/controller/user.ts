import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUser, UserService } from '../service/user';
import { NextFunction, Request, Response } from 'express';
import TYPES from '../../constant/types';

import { UserDTO } from './UserDto';

import validationMw from '../../middleware/validateMw';

@controller('/user')
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  public getUsers(): IUser[] {
    return this.userService.getUsers();
  }

  @httpPost('/', validationMw(UserDTO))
  public async newUser(request: Request, response: Response): Promise<any> {
    response.json(response.locals.input);
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
