import { BaseError } from '@core/error/BaseError';

export namespace AuthErrors {
  export class UserNotAuthorised extends BaseError {
    constructor() {
      super(`User not authorized`, true, new Error('User Not Authorised'));
    }
  }
}
