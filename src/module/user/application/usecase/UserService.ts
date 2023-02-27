import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { AppError } from '@core/error/AppError';
import { Either, left, Result, right } from '@core/result/Result';
import { UserMap } from '@user-module/mapper/UserMapper';
import { IUser } from '@user-module/domain/entity/IUser';
import { IUserRepository } from '@user-module/domain/repository/IUserRepository';
import { UserDTO } from '../dtos/UserDto';
import { UserErrors } from '../errors/UserError';

type UserResponse = Either<
  AppError.UnexpectedError | UserErrors.UserNotCreatedError,
  Result<UserDTO>
>;

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  public async createUser(userDto: UserDTO): Promise<UserResponse> {
    // try {
    //   const userEntity = UserMap.fromDTOToDomain(userDto); // Checking with domain is happening in the mapper directly

    //   /* This part can't work if we have base implementation in repo pattern else this map can be done in the repository */
    //   const userModelEntity = UserMap.fromDomainToPersistence(userEntity);
    //   try {
    //     await this._userRepository.create(userModelEntity);
    //     // THIS HAS TO BE MAPPED TO EITHER RESPONSEDTO OR DOMAIN/DTO FOR THAT PARTICUALR SERVICE IF THIS IS GOIN TO BE USED IN SOME OTHER SERVICE
    //   } catch (err) {
    //     return left(
    //       new UserErrors.UserNotCreatedError(err as Error, userEntity)
    //     );
    //   }
    //   return right(Result.ok<UserDTO>());
    // } catch (err) {
    //   return left(new AppError.UnexpectedError(err));
    // }

    try {
      const userEntity = UserMap.fromDTOToDomain(userDto); // Checking with domain is happening in the mapper directly
      const userModelEntity = UserMap.fromDomainToPersistence(
        UserMap.fromDTOToDomain(userDto)
      );
      const resultOrError = await this._userRepository.create(userModelEntity);

      if (resultOrError.isLeft()) {
        return left(
          new AppError.DatabaseError(
            resultOrError.value.error.error,
            resultOrError.value.error.message + 'User not created'
          )
        );
      }
      return right(Result.ok<UserDTO>(resultOrError.value));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  public async updateUser(id: string, user: IUser) {
    try {
      const result = await this._userRepository.update(id, user);
      const userDTO = UserMap.fromPersistenceToDTO(result);
      return right(userDTO);
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
