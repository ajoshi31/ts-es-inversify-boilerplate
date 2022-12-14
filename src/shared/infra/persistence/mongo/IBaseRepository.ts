import { UpdateQuery } from 'mongoose';

export interface IBaseRepository<EntityType> {
  create(entity: EntityType): Promise<any>;
  update(_id: string, model: UpdateQuery<EntityType>): Promise<any>;
}
