import { injectable } from 'inversify';
import userSchema, {
  IUserModel
} from '@shared-infra/persistence/mongo/models/UserModel';
import { BaseRepository } from '@shared-infra/persistence/mongo/BaseRepository';
import { IUserRepository } from '@user-module/domain/repository/IUserRepository';

@injectable()
export class UserRepository
  extends BaseRepository<IUserModel>
  implements IUserRepository
{
  constructor() {
    super('user', userSchema);
  }
}
