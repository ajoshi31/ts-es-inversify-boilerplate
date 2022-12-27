import { BaseError } from '@core/error/BaseError';
import { User } from '@user-module/domain/entity/User';

export namespace UserErrors {
  export class UserNotCreatedError extends BaseError {
    constructor(err: Error, user: User) {
      super(err, `User not created : ${user}`, true);
    }
  }
}
