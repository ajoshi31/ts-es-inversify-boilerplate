import { UserDTO } from '@user-module/controller/UserDto';
import { IUser } from '@user-module/model/IUser';

export class UserMap {
  public static fromDTOToModel(user: UserDTO): IUser {
    return {
      email: user.email,
      name: user.name
    };
  }
}
