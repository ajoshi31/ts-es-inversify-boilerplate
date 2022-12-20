import { IBaseRepository } from '@shared-infra/persistence/mongo/IBaseRepository';
import { IUserModel } from '@shared-infra/persistence/mongo/models/UserModel';

// Here we are be passing the ORM model entity instead of Entitybeacuse of base repo pattern
export interface IUserRepository extends IBaseRepository<IUserModel> {
  // If any other implementation are happening here we can pass the direct domain entity class
}
