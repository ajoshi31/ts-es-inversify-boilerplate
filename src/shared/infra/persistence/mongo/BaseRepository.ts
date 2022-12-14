import { injectable, unmanaged } from 'inversify';
import { Model, model, Schema, UpdateQuery } from 'mongoose';
import { IBaseRepository } from './IBaseRepository';

@injectable()
export abstract class BaseRepository<EntityType>
  implements IBaseRepository<EntityType>
{
  // private model: Model<EntityType>;
  private model: Model<EntityType>;

  constructor(@unmanaged() modelName: string, @unmanaged() schema: Schema) {
    this.model = model<EntityType>(modelName, schema);
  }

  async create(entity: EntityType): Promise<any> {
    const userToSave = new this.model(entity);
    const result = await userToSave.save();
    return Promise.resolve(result);
  }

  async update(_id: string, entity: UpdateQuery<any>): Promise<any> {
    console.log(_id, entity);
    const result = await this.model.findOneAndUpdate({ _id }, entity, {
      new: true
    });
    console.log(result);
    return Promise.resolve(result);
  }
}
