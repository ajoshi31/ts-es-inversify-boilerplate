import { UseCaseError } from '@core/error/UseCaseError';
import { Result } from '@core/result/result';
import { IUser } from '@user-module/domain/model/IUser';

export namespace UserErrors {
  export class UserNotCreatedError extends Result<UseCaseError> {
    constructor(user: IUser) {
      super(false, {
        message: `UserCannot be created for data ${user}`
      } as UseCaseError);
    }
  }
}
