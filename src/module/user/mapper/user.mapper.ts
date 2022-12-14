import { UserDTO } from '@user-module/dtos/UserDto';
import { UserResponseDTO } from '@user-module/dtos/UserResponseDTO';
import { IUser } from '@user-module/model/IUser';

export class UserMap {
  public static fromDTOToModel(user: UserDTO): IUser {
    return {
      email: user.email,
      name: user.name
    };
  }

  public static dtoToPersistence(user: UserDTO): any {
    return {
      emailId: user.email,
      user_name: user.name
    };
  }

  public static fromPersistenceToDTO(user: any): UserDTO {
    return {
      _id: user?._id,
      name: user.name,
      email: user.email
    };
  }
}
