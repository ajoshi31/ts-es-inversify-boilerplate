import { IModelUser } from '@shared-infra/persistence/mongo/models/user';
import { UserDTO } from '@user-module/application/dtos/UserDTO';
import { IUser } from '@user-module/domain/model/IUser';
import { User } from '@user-module/domain/model/User';

export class UserMap {
  public static fromDTOToDomain(user: UserDTO): User {
    return User.create({
      email: user.email,
      name: user.name
    });
  }

  public static fromPersistenceToDTO(user: any): UserDTO {
    return {
      _id: user?._id,
      name: user.name,
      email: user.email
    };
  }

  public static fromDomainToPersistence(user: User): IModelUser {
    return {
      name: user.getName,
      email: user.getEmail
    };
  }
}
