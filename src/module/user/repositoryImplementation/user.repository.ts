import UserModel from '@shared-infra/persistence/mongo/models/user';
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

  async getSingleUserById(id: string): Promise<any> {
    const result = await UserModel.find({});
    return Promise.resolve({ s: result });
  }
  async getUserList(): Promise<IUser[]> {
    const result = await UserModel.find({});
    return Promise.resolve(result);
  }

  async createUser(user: IUser): Promise<any> {
    const userToSave = new UserModel(user);
    const result = await userToSave.save();

    return Promise.resolve(result);
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
