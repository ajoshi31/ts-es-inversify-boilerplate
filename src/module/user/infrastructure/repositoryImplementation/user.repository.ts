import { injectable } from 'inversify';
import userSchema, {
  IUserModel
} from '@shared-infra/persistence/mongo/models/user.model';
import { IUserRepository } from '@user-module/domain/repository/iuser.repository';
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
