import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from 'inversify-express-utils';

import { inject } from 'inversify';

import { UserDTO } from './UserDto';

import { UserService } from '@user-module/service/user';
import TYPES from '@ioc/constant/types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import validationMw from '@shared-infra/http/middleware/validateMw';
import { IUser } from '@user-module/model/IUser';
import {
  ApiPath,
  SwaggerDefinitionConstant,
  ApiOperationGet,
  ApiOperationPost
} from 'swagger-express-ts';
import { Request, Response } from 'express';

@ApiPath({
  name: 'Users',
  path: '/user'
})
@controller('/user')
export abstract class UserController extends BaseController {
  final: any;
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  @ApiOperationGet({
    description: 'Get user dto objects list',
    summary: 'Get user list',
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'UserDTO'
      }
    },
    security: {
      apiKeyHeader: []
    }
  })
  @httpGet('/')
  public async getUser(request: Request, response: Response): Promise<any> {
    const result = await this.userService.getUsers();
    if (result.isRight()) {
      this.final = result.value.getValue();
    }
    return this.ok<any>(response, this.final);
  }

  @ApiOperationPost({
    description: 'New User',
    summary: 'USER new ',
    parameters: {
      body: { description: 'New user', required: true, model: 'UserDTO' }
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Parameters fail' }
    }
  })
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
