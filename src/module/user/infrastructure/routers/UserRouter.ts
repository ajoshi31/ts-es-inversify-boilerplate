import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  httpPut
} from 'inversify-express-utils';
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';
import TYPES from '@ioc/constant/Types';
import DtoRouteValidationMiddleware from '@shared-infra/http/middleware/DtoRouteValidationMiddleware';
import { UserDTO } from '@user-module/application/dtos/UserDto';
import { CreateUserController } from '../controller/CreateUserController';
import { UpdateUserController } from '../controller/UpdateUserController';
import { GetUserController } from '../controller/GetUserController';
import CheckAuthToken from '@shared-infra/http/middleware/CheckAuthToken';

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
    private readonly _updateUserController: UpdateUserController,

    @inject(TYPES.GetUserController)
    private readonly _getUserController: GetUserController
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
  public async createUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._createUserController.execute(request, response, next);
  }

  @httpPut('/:id')
  public async updateUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._updateUserController.execute(request, response, next);
  }

  @httpGet('/', CheckAuthToken())
  public async getUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._getUserController.execute(request, response, next);
  }
}
