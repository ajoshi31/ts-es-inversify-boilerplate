import { BaseError } from '@core/error/BaseError';

export namespace UserErrors {
  export class UserNotCreatedError extends BaseError {
    constructor(err: Error, message: string) {
      super(err, message + ': User Not Created Error 123 ', true);
    }
  }
}
