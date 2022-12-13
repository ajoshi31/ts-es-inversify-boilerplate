import { IUser } from '@user-module/model/IUser';
import { BaseRepository } from './BaseRespository';
import testSchema from './testmodel';

export class TestRepo extends BaseRepository<IUser> {
  constructor() {
    super('user', testSchema);
  }
}
