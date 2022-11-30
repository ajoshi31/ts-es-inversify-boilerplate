import { AppError } from '@core/error/AppError';
import { left, Result, right } from '@core/result/result';
import { UserDTO } from '@user-module/controller/UserDto';
import { UserResponseDTO } from '@user-module/controller/UserResponseDTO';
import { injectable } from 'inversify';

export interface IUser {
  email: string;
  name?: string;
}

@injectable()
export class UserService {
  private userStorage: IUser[] = [
    {
      email: 'lorem@ipsum.com',
      name: 'Lorem Ipsum'
    },
    {
      email: 'doloe@sit.com',
      name: 'Dolor'
    }
  ];

  public getUsers(): UserResponseDTO {
    try {
      return right(Result.ok<any>(this.userStorage));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  public getUser(id: string): IUser | undefined {
    return this.userStorage.find((user) => user.name === id);
  }

  public newUser(user: UserDTO) {
    this.userStorage.push(user);
    return this.userStorage;
  }

  public updateUser(id: string, user: IUser) {
    this.userStorage.forEach((entry, index) => {
      if (entry.name === id) {
        this.userStorage[index] = user;
      }
    });

    return user;
  }

  public deleteUser(id: string): string {
    this.userStorage = this.userStorage.filter((user) => user.name !== id);
    return id;
  }
}
