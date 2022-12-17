import { UseCaseError } from '@core/error/UseCaseError';
import { Result } from '@core/result/result';
import { IUser } from '@user-module/domain/model/IUser';
import { User } from '@user-module/domain/model/User';

export namespace UserErrors {
  export class UserNotCreatedError extends Result<UseCaseError> {
    constructor(user: User) {
      super(false, {
        message: `UserCannot be created for data ${user}`
      } as UseCaseError);
    }
  }
}
