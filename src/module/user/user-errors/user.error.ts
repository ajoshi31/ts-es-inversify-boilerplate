import { UseCaseError } from '@core/error/UseCaseError';
import { Result } from '@core/result/result';

export namespace UserErrors {
  export class UserCreationError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `There is some error while creating the user`
      } as UseCaseError);
    }
  }
}
