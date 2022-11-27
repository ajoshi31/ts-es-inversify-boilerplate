import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUser, UserService } from '../service/user';
import { Request, Response } from 'express';
import TYPES from '../../constant/types';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserDTO } from './UserDto';
import { logger } from '../../core/logger/logger';

class ValidationResult {
  data: any;
  error: any;
}

@controller('/user')
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  public getUsers(): IUser[] {
    return this.userService.getUsers();
  }

  // @httpGet('/:id')
  // public getUser(request: Request): IUser {
  //   return this.userService.getUser(request.params.id);
  // }

  // @httpPost('/')
  // public newUser(request: Request): IUser {
  //   return this.userService.newUser(request.body);
  // }

  @httpPost('/')
  public async newUser(request: Request, response: Response): Promise<any> {
    const conversionResult = await this.validateAndConvert(
      UserDTO,
      request.body
    );
    if (conversionResult.error) {
      response.status(400).send(conversionResult.error);
    } else {
      response.json(conversionResult.data);
    }
    const a = this.userService.newUser(request.body);
    return a;
  }

  @httpPut('/:id')
  public updateUser(request: Request): IUser {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): string {
    return this.userService.deleteUser(request.params.id);
  }

  validateAndConvert = async function (classToConvert: any, body: string) {
    const result = new ValidationResult();
    result.data = plainToClass(classToConvert, body);
    await validate(result.data, { skipMissingProperties: true }).then(
      (errors) => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          let errorTexts: any = [];
          for (const errorItem of errors) {
            errorTexts = errorTexts.concat(errorItem.constraints);
          }
          result.error = errorTexts;
          return result;
        }
      }
    );
    return result;
  };
}
