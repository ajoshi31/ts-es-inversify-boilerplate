import { UpdateQuery } from 'mongoose';

export interface IBaseRepository<IModelEntity> {
  create(entity: IModelEntity): Promise<void>;
  update(_id: string, model: UpdateQuery<IModelEntity>): Promise<void>;
}
