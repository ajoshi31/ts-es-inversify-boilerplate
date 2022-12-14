import { AppError } from '@core/error/AppError';
import { Either, Result } from '@core/result/result';
import { UserDTO } from './UserDto';

export type UserResponseDTO = Either<
  AppError.UnexpectedError | Result<UserDTO>,
  Result<void>
>;
