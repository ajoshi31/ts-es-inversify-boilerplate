import { BaseError } from '@core/error/BaseError';

export namespace TestError {
  export class SomeTestError extends BaseError {
    constructor(err: Error, message: string) {
      super(err, message + ': Some Test Error Created ', true);
    }
  }

  export class PaymentShouldNotBeMoreThan500 extends BaseError {
    constructor(err: Error, message: string) {
      super(err, message + ':Payment Should Not Be More Than 500', true);
    }
  }
}
