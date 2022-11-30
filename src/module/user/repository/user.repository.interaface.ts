import { IUser } from '@user-module/model/IUser';

export interface IUserRepository {
  getSingleUserById(id: string): IUser | undefined;
  getUserList(): IUser[];
  createUser(user: IUser): IUser[];
  updateUser(id: string, user: IUser): any;
  deleteUser(id: string): string;
}
