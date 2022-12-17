import { UpdateQuery } from 'mongoose';

export interface IBaseRepository<IModelEntity> {
  create(entity: IModelEntity): Promise<any>;
  update(_id: string, model: UpdateQuery<IModelEntity>): Promise<any>;
}
