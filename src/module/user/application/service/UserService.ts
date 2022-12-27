import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { AppError } from '@core/error/AppError';
import { Either, left, Result, right } from '@core/result/Result';
import { UserMap } from '@user-module/mapper/UserMapper';
import { IUser } from '@user-module/domain/entity/IUser';
import { IUserRepository } from '@user-module/domain/repository/IUserRepository';
import { UserErrors } from '../errors/UserError';
import { UserDTO } from '../dtos/UserDto';

type UserResponse = Either<AppError.UnexpectedError, Result<UserDTO>>;

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  public async createUser(userDto: UserDTO): Promise<UserResponse> {
    try {
      let result: void;
      const userEntity = UserMap.fromDTOToDomain(userDto); // Checking with domain is happening in the mapper directly
      /* This part can't work if we have base implementation in repo pattern else this map can be done in the repository */
      const userModelEntity = UserMap.fromDomainToPersistence(userEntity);
      try {
        result = await this._userRepository.create(userModelEntity);
      } catch (err) {
        return left(
          new UserErrors.UserNotCreatedError(err as Error, userEntity)
        );
      }
      return right(Result.ok<UserDTO>());
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
