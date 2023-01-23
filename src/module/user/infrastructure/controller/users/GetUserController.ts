import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { BaseController } from '@shared-infra/http/controller/BaseController';

import { UserDTO } from '@user-module/application/dtos/UserDto';

@injectable()
export class GetUserController extends BaseController {
  constructor() {
    super();
  }

  public async executeImpl(request: Request, response: Response): Promise<any> {
    return this.ok<UserDTO>(response);
  }
}
