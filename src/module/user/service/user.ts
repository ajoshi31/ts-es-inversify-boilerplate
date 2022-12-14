import { AppError } from '@core/error/AppError';
import { left, Result, right } from '@core/result/result';
import TYPES from '@ioc/constant/types';
import { UserDTO } from '@user-module/dtos/UserDto';
import { UserResponseDTO } from '@user-module/dtos/UserResponseDTO';

import { UserMap } from '@user-module/mapper/user.mapper';
import { IUser } from '@user-module/model/IUser';
import { IUserRepository } from '@user-module/repository/iuser.repository.interaface';
import { ok } from 'assert';
import { inject, injectable } from 'inversify';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  public newUser(user: UserDTO) {
    const newUser: IUser = UserMap.fromDTOToModel(user);
    return this._userRepository.create(newUser);
  }

  public async updateUser(id: string, user: IUser) {
    const result = await this._userRepository.update(id, user);
    const userDTO = UserMap.fromPersistenceToDTO(result);
    try {
      return right(userDTO);
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  // public async getUsers(): Promise<UserResponseDTO> {
  //   try {
  //     return right(Result.ok<any>(await this._userRepository.getUserList()));
  //   } catch (err: any) {
  //     return left(new AppError.UnexpectedError(err));
  //   }
  // }

  // public async getUser(id: string): Promise<any> {
  //   const result = await this._userRepository.getSingleUserById(id);
  //   try {
  //     return right(Result.ok<any>(result));
  //   } catch (err: any) {
  //     return left(new AppError.UnexpectedError(err));
  //   }
  // }

  // public async updateUser(id: string, user: IUser) {
  //   const result = await this._userRepository.updateUser(id, user);
  //   try {
  //     return right(Result.ok<IUser>(result));
  //   } catch (err: any) {
  //     return left(new AppError.UnexpectedError(err));
  //   }
  // }

  // public deleteUser(id: string): string {
  //   return this._userRepository.deleteUser(id);
  // }
}
