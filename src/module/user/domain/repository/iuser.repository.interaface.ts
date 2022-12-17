import { IBaseRepository } from '@shared-infra/persistence/mongo/IBaseRepository';
import { IModelUser } from '@shared-infra/persistence/mongo/models/user';

// Here we should be passing the ORM model entity
export interface IUserRepository extends IBaseRepository<IModelUser> {}
