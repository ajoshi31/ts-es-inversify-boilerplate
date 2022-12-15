import { AppError } from '@core/error/AppError';
import { left } from '@core/result/result';
import { UserErrors } from '@user-module/application/user-errors/user.error';
import { injectable, unmanaged } from 'inversify';
import { Model, model, Schema, UpdateQuery } from 'mongoose';
import { IBaseRepository } from './IBaseRepository';

@injectable()
export abstract class BaseRepository<EntityType>
  implements IBaseRepository<EntityType>
{
  private model: Model<EntityType>;

  constructor(@unmanaged() modelName: string, @unmanaged() schema: Schema) {
    this.model = model<EntityType>(modelName, schema);
  }

  async create(entity: EntityType): Promise<any> {
    try {
      const dataToSave = new this.model(entity);
      const result = await dataToSave.save();
      return Promise.resolve(result);
    } catch (err: any) {
      return left(new AppError.DatabaseError(err));
    }
  }

  async update(_id: string, entity: UpdateQuery<any>): Promise<any> {
    const result = await this.model.findOneAndUpdate({ _id }, entity, {
      new: true
    });
    console.log(result);
    return Promise.resolve(result);
  }
}
