import TYPES from '@ioc/constant/types';
import dtoRouteValidationMiddleware from '@shared-infra/http/middleware/dtoRouteValidationMiddleware';
import { CreateUserController } from '@user-module/controller/create.user.controller';
import { UpdateUserController } from '@user-module/controller/update.user.controller';
import { UserDTO } from '@user-module/dtos/UserDto';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpPost, httpPut } from 'inversify-express-utils';
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';

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
  ) {
    console.log('hello');
  }

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
  @httpPost('/', dtoRouteValidationMiddleware(UserDTO))
  public async newUser(request: Request, response: Response): Promise<any> {
    return this._createUserController.execute(request, response);
  }

  @httpPut('/:id')
  public async updateUser(request: Request, response: Response): Promise<any> {
    return this._updateUserController.execute(request, response);
  }
}