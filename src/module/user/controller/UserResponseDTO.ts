import { AppError } from '@core/error/AppError';
import { Either, Result } from '@core/result/result';

export type UserResponseDTO = Either<
  AppError.UnexpectedError | Result<any>,
  Result<void>
>;
