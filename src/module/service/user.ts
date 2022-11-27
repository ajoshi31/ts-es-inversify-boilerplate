import { injectable } from 'inversify';
import { UserDTO } from '../controller/UserDto';

export interface IUser {
  email: string;
  name?: string;
}

@injectable()
export class UserService {
  private userStorage: IUser[] = [
    {
      email: 'lorem@ipsum.com',
      name: 'Lorem'
    },
    {
      email: 'doloe@sit.com',
      name: 'Dolor'
    }
  ];

  public getUsers(): IUser[] {
    return this.userStorage;
  }

  public getUser(id: string): IUser | undefined {
    return this.userStorage.find((user) => user.name === id);
  }

  public newUser(user: UserDTO): IUser {
    this.userStorage.push(user);
    return user;
  }

  public updateUser(id: string, user: IUser): IUser {
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
