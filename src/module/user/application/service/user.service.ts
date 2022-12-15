import { AppError } from '@core/error/AppError';
import { left, Result, right } from '@core/result/result';
import TYPES from '@ioc/constant/types';
import { UserDTO } from '@user-module/application/dtos/UserDto';
import { UserMap } from '@user-module/mapper/user.mapper';
import { IUser } from '@user-module/domain/model/IUser';
import { IUserRepository } from '@user-module/domain/repository/iuser.repository.interaface';
import { inject, injectable } from 'inversify';
import { UserErrors } from '../user-errors/user.error';
import { UserResponseDTO } from '../dtos/UserResponseDTO';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  public async createUser(user: UserDTO): Promise<UserResponseDTO> {
    const newUser: IUser = UserMap.fromDTOToModel(user);
    let result: any;
    try {
      try {
        result = await this._userRepository.create(newUser);
      } catch (err) {
        return left(new UserErrors.UserNotCreatedError(newUser));
      }
      return right(Result.ok<any>(result));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  public async updateUser(id: string, user: IUser) {
    try {
      const result = await this._userRepository.update(id, user);
      const userDTO = UserMap.fromPersistenceToDTO(result);
      return right(userDTO);
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
