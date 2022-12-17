import { AppError } from '@core/error/AppError';
import { left } from '@core/result/Result';
import { injectable, unmanaged } from 'inversify';
import { Model, model, Schema, UpdateQuery } from 'mongoose';
import { IBaseRepository } from './IBaseRepository';

@injectable()
export abstract class BaseRepository<IModelEntity>
  implements IBaseRepository<IModelEntity>
{
  private model: Model<IModelEntity>;

  constructor(@unmanaged() modelName: string, @unmanaged() schema: Schema) {
    this.model = model<IModelEntity>(modelName, schema);
  }

  async create(entity: IModelEntity): Promise<any> {
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
    return Promise.resolve(result);
  }
}
