import { IUser } from '@user-module/model/IUser';
import { IUserRepository } from '@user-module/repository/user.repository.interaface';

import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {
  private userStorage: IUser[] = [
    {
      email: 'lorem@ipsum.com',
      name: 'Lorem Ipsum'
    },
    {
      email: 'doloe@sit.com',
      name: 'Dolor'
    },
    {
      email: 'doloe@sit.com',
      name: 'Dolor'
    }
  ];

  getSingleUserById(id: string): IUser | undefined {
    return this.userStorage.find((user) => user.name === id);
  }
  getUserList(): IUser[] {
    return this.userStorage;
  }

  createUser(user: IUser): IUser[] {
    this.userStorage.push(user);
    return this.userStorage;
  }

  updateUser(id: string, user: IUser) {
    this.userStorage.forEach((entry, index) => {
      if (entry.name === id) {
        this.userStorage[index] = user;
      }
    });

    return user;
  }

  deleteUser(id: string): string {
    this.userStorage = this.userStorage.filter((user) => user.name !== id);
    return id;
  }
}
