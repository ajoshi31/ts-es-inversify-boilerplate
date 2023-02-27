import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { AppError } from '@core/error/AppError';
import { Either, left, Result, right } from '@core/result/Result';
import { UserMap } from '@user-module/mapper/UserMapper';
import { IUserRepository } from '@user-module/domain/repository/IUserRepository';
import { UserErrors } from '../errors/UserError';
import { UserDTO } from '../dtos/UserDto';
import { UseCase } from '@core/usecase/UseCase';

type UserResponse = Either<AppError.UnexpectedError, Result<UserDTO>>;

@injectable()
export class CreateUserUseCase
  implements UseCase<UserDTO, Promise<UserResponse>>
{
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  public async execute(userDto: UserDTO): Promise<UserResponse> {
    try {
      // const userEntity = UserMap.fromDTOToDomain(userDto); // Checking with domain is happening in the mapper directly
      const userModelEntity = UserMap.fromDomainToPersistence(
        UserMap.fromDTOToDomain(userDto)
      );
      const resultOrError = await this._userRepository.create(userModelEntity);
      if (resultOrError.isLeft()) {
        return resultOrError;
      }
      console.log('MyUserDetails', resultOrError);

      return right(Result.ok<UserDTO>(resultOrError));
    } catch (err) {
      console.log('Error', err);
      return left(new AppError.UnexpectedError(err));
    }
  }
}
