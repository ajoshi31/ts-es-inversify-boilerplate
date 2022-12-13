import { IUser } from '@user-module/model/IUser';
import { injectable } from 'inversify';

import userSchema from '@shared-infra/persistence/mongo/models/user';
import { IUserRepository } from '@user-module/repository/iuser.repository.interaface';
import { BaseRepository } from '@shared-infra/persistence/mongo/BaseRepository';

@injectable()
export class UserRepository
  extends BaseRepository<IUser>
  implements IUserRepository
{
  constructor() {
    super('user', userSchema);
  }
}
