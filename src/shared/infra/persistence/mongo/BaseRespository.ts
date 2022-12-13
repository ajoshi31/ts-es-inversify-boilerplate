import { injectable, unmanaged } from 'inversify';
import mongoose, { Schema, SchemaDefinition } from 'mongoose';
import { MongoDbConnection } from './db';
import { IBaseRepository } from './IBaseRepository';

@injectable()
export abstract class BaseRepository<EntityType>
  implements IBaseRepository<EntityType>
{
  private model: any;
  constructor(@unmanaged() modelName: string, @unmanaged() schema: Schema) {
    this.model = mongoose.model(modelName, schema);
  }

  async create(entity: EntityType): Promise<void> {
    const userToSave = new this.model(entity);
    const result = await userToSave.save();
    return Promise.resolve(result);
  }
}
