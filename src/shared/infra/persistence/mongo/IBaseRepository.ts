import { UpdateQuery } from 'mongoose';
import { IUserModel } from './models/UserModel';

export interface IBaseRepository<IModelEntity> {
  create(entity: IModelEntity): Promise<void>;
  update(_id: string, model: UpdateQuery<IModelEntity>): Promise<IUserModel>;
}
