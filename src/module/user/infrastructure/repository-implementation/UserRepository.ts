import { injectable } from 'inversify';
import userSchema, {
  IUserModel
} from '@shared-infra/persistence/mongo/models/UserModel';
import { IUserRepository } from '@user-module/domain/repository/IUserRepository';
import { BaseRepository } from '@shared-infra/persistence/mongo/BaseRepository';

@injectable()
export class UserRepository
  extends BaseRepository<IUserModel>
  implements IUserRepository
{
  constructor() {
    super('user', userSchema);
  }
}
