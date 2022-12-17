import TYPES from '@ioc/constant/types';
import DtoRouteValidationMiddleware from '@shared-infra/http/middleware/DtoRouteValidationMiddleware';
import { UserDTO } from '@user-module/application/dtos/UserDto';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpPost, httpPut } from 'inversify-express-utils';
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { CreateUserController } from '../controller/CreateUserController';
import { UpdateUserController } from '../controller/UpdateUserController';

@ApiPath({
  name: 'Users',
  path: '/user'
})
@controller('/user')
export abstract class UserRouters {
  constructor(
    @inject(TYPES.CreateUserController)
    private readonly _createUserController: CreateUserController,

    @inject(TYPES.UpdateUserController)
    private readonly _updateUserController: UpdateUserController
  ) {}

  @ApiOperationPost({
    description: 'Create New User',
    summary: 'Creating the new user for todo application ',
    parameters: {
      body: { description: 'Create New User', required: true, model: 'User' }
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Something fails' }
    }
  })
  @httpPost('/', DtoRouteValidationMiddleware(UserDTO))
  public async createUser(request: Request, response: Response): Promise<any> {
    return this._createUserController.execute(request, response);
  }

  @httpPut('/:id')
  public async updateUser(request: Request, response: Response): Promise<any> {
    return this._updateUserController.execute(request, response);
  }
}
