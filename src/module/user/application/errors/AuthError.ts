import { BaseError } from '@core/error/BaseError';

export namespace AuthErrors {
  export class UserNotAuthorised extends BaseError {
    constructor() {
      super(new Error('User Not Authorised'), `User not authorized`, true);
    }
  }
}
