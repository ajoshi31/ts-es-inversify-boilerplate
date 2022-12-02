import UserModel from '@shared-infra/persistence/mongo/models/user';
import { IUser } from '@user-module/model/IUser';
import { IUserRepository } from '@user-module/repository/iuser.repository.interaface';
import { Types } from 'mongoose';

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
    const myObjectId = new Types.ObjectId(id);
    return await UserModel.findOne({ _id: myObjectId });
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

  async updateUser(id: string, user: IUser): Promise<any> {
    const myObjectId = new Types.ObjectId(id);
    const result = await UserModel.findOneAndUpdate(myObjectId, user);
    return Promise.resolve(result);
  }

  deleteUser(id: string): string {
    this.userStorage = this.userStorage.filter((user) => user.name !== id);
    return id;
  }
}
