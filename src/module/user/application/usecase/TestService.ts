import { AppError } from '@core/error/AppError';
import { left, Result, right } from '@core/result/Result';

import { TestError } from '../errors/TestError';

export class TestService {
  public async testMethod(num: number): Promise<any> {
    // try {
    //   // This test service can be very big and may call multiple services and trigger multiple error
    //   if (num === 2) {
    //     return left(
    //       new TestError.SomeTestError(
    //         new Error('Payment should not'),
    //         'Payment should not be greater than 500'
    //       )
    //     );
    //   }
    //   throw new Error('Unexpected error 123');
    //   return right(Result.ok<any>(1));
    // } catch (err) {
    //   return left(new AppError.UnexpectedError(err));
    // }
    if (num === 2) {
      return left(
        new TestError.SomeTestError(
          new Error('Payment should not'),
          'Payment should not be greater than 500'
        )
      );
    }
    throw new Error('Unexpected error 123');
    return right(Result.ok<any>(1));
  }
}
