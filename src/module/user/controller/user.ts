import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from 'inversify-express-utils';
import {
  ApiPath,
  SwaggerDefinitionConstant,
  ApiOperationGet,
  ApiOperationPost
} from 'swagger-express-ts';

import TYPES from '@ioc/constant/types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import dtoRouteValidationMiddleware from '@shared-infra/http/middleware/dtoRouteValidationMiddleware';

import { UserDTO } from '../dtos/UserDto';
import { UserService } from '@user-module/service/user';

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
        model: 'User'
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

  @ApiOperationGet({
    description: 'Get user dto objects list',
    summary: 'Get user list',
    responses: {
      200: {
        description: 'Success',
        model: 'User'
      }
    },
    security: {
      apiKeyHeader: []
    }
  })
  @httpGet('/:id')
  public async getUserById(request: Request, response: Response): Promise<any> {
    const result = await this.userService.getUser(request.params['id']);
    if (result.isRight()) {
      this.final = result.value.getValue();
    }
    return this.ok<any>(response, this.final);
  }

  @ApiOperationPost({
    description: 'New User',
    summary: 'USER new ',
    parameters: {
      body: { description: 'New user', required: true, model: 'User' }
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Parameters fail' }
    }
  })
  @httpPost('/', dtoRouteValidationMiddleware(UserDTO))
  public async newUser(request: Request, response: Response): Promise<any> {
    return await this.userService.newUser(request.body);
  }

  @httpPut('/:id')
  public async updateUser(request: Request, response: Response): Promise<any> {
    const result = await this.userService.updateUser(
      request.params.id,
      request.body
    );

    if (result.isRight()) {
      return this.ok<any>(response, result.value);
    }
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): string {
    return this.userService.deleteUser(request.params.id);
  }
}
