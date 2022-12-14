import { IBaseRepository } from '@shared-infra/persistence/mongo/IBaseRepository';
import { IUser } from '@user-module/domain/model/IUser';

export interface IUserRepository extends IBaseRepository<IUser> {}
