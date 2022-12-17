import { IBaseRepository } from '@shared-infra/persistence/mongo/IBaseRepository';
import { IUserModel } from '@shared-infra/persistence/mongo/models/UserModel';

// Here we should be passing the ORM model entity
export interface IUserRepository extends IBaseRepository<IUserModel> {
  // If any other implementation are happening here we can pass the direct domain entity class
}
