import { injectable, unmanaged } from 'inversify';
import mongoose, { Schema, SchemaDefinition } from 'mongoose';
import { MongoDbConnection } from './db';
import { IBaseRepository } from './IBaseRepository';

@injectable()
export abstract class BaseRepository<EntityType>
  implements IBaseRepository<EntityType>
{
  private model: any;
  protected formatter: any = Object;
  constructor(@unmanaged() modelName: string, @unmanaged() schema: Schema) {
    this.model = mongoose.model(modelName, schema);
  }

  async create(entity: EntityType): Promise<void> {
    const userToSave = new this.model(entity);
    const result = await userToSave.save();
    return Promise.resolve(result);
  }

  async update(_id: string, model: EntityType): Promise<void> {
    await this.model.updateOne({ _id }, model);
  }

  async delete(_id: string): Promise<{ n: number }> {
    return this.model.deleteOne({ _id });
  }
}
