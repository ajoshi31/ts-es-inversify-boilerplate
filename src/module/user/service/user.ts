import { AppError } from '@core/error/AppError';
import { left, Result, right } from '@core/result/result';
import TYPES from '@ioc/constant/types';
import { UserDTO } from '@user-module/controller/UserDto';
import { UserResponseDTO } from '@user-module/controller/UserResponseDTO';
import { UserMap } from '@user-module/mapper/user.mapper';
import { IUser } from '@user-module/model/IUser';
import { IUserRepository } from '@user-module/repository/user.repository.interaface';
import { inject, injectable } from 'inversify';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  public getUsers(): UserResponseDTO {
    try {
      return right(Result.ok<any>(this._userRepository.getUserList()));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  public getUser(id: string): IUser | undefined {
    return this._userRepository.getSingleUserById(id);
  }

  public newUser(user: UserDTO) {
    const newUser: IUser = UserMap.fromDTOToModel(user);
    return this._userRepository.createUser(newUser);
  }

  public updateUser(id: string, user: IUser) {
    return this._userRepository.updateUser(id, user);
  }

  public deleteUser(id: string): string {
    return this._userRepository.deleteUser(id);
  }
}
