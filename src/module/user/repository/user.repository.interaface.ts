import { IUser } from '@user-module/model/IUser';

export interface IUserRepository {
  getSingleUserById(id: string): Promise<any>;
  getUserList(): Promise<IUser[]>;
  createUser(user: IUser): Promise<any>;
  updateUser(id: string, user: IUser): any;
  deleteUser(id: string): string;
}
