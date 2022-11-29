import { AppError } from '../../../shared/core/error/AppError';
import { Either, Result } from '../../../shared/core/result/result';
export type UserResponseDTO = Either<
  AppError.UnexpectedError | Result<any>,
  Result<void>
>;
