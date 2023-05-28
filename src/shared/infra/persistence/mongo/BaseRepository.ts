/* eslint-disable  @typescript-eslint/no-explicit-any */
import { injectable, unmanaged } from 'inversify';
import { ClientSession, Model, model, Schema, UpdateQuery } from 'mongoose';
import { AppError } from '@core/error/AppError';
import { left, right } from '@core/result/Result';
import { IBaseRepository } from './IBaseRepository';
import { logger } from '@core/logger/Logger';

@injectable()
export abstract class BaseRepository<IModelEntity>
  implements IBaseRepository<IModelEntity>
{
  private model: Model<IModelEntity>;

  constructor(@unmanaged() modelName: string, @unmanaged() schema: Schema) {
    this.model = model<IModelEntity>(modelName, schema);
  }

  async startSession(): Promise<ClientSession> {
    return await this.model.startSession();
  }

  async endSession(session: ClientSession): Promise<void> {
    await session.endSession();
  }

  async abortTransaction(session: ClientSession): Promise<void> {
    await session.abortTransaction();
  }

  async create(entity: IModelEntity, session?: ClientSession): Promise<any> {
    try {
      const dataToSave = new this.model(entity);
      const result = await dataToSave.save({ session: session });
      return right(result);
    } catch (err: unknown) {
      logger.error(
        `Error in create method while trying to create entity ${entity}: ${err}`
      );
      return left(new AppError.DatabaseError(err, 'Database error'));
    }
  }

  async update(
    where = {},
    entity: UpdateQuery<any>,
    session?: ClientSession
  ): Promise<any> {
    try {
      const result = await this.model.findOneAndUpdate(where, entity, {
        new: true,
        session: session
      });
      return right(result);
    } catch (err) {
      logger.error(
        `Error in update method : Failed to update entity ${entity} ${err} `
      );
      return left(new AppError.DatabaseError(err, 'Database error'));
    }
  }

  async findOne(where = {}): Promise<any> {
    try {
      const result = await this.model.findOne(where);
      return right(result);
    } catch (err: unknown) {
      logger.error(`Error in findOne method: ${err}`);
      return left(new AppError.DatabaseError(err, 'Database error'));
    }
  }

  async findAll(
    where = {},
    offset = 0,
    limit = 20,
    sort = {},
    session?: ClientSession
  ): Promise<any> {
    try {
      let result: any;
      if (session) {
        result = result = await this.model
          .find(where)
          .skip(offset)
          .limit(limit > 500 ? 500 : limit)
          .sort(sort)
          .session(session);
      } else {
        result = result = await this.model
          .find(where)
          .skip(offset)
          .limit(limit > 500 ? 500 : limit)
          .sort(sort);
      }

      return right(result);
    } catch (err: unknown) {
      logger.error(`Error in findAll method: ${err}`);
      return left(new AppError.DatabaseError(err, 'Database error'));
    }
  }

  async deleteOne(where = {}, session?: ClientSession): Promise<any> {
    try {
      const result = await this.model.deleteOne(where, { session: session });
      return Promise.resolve(result);
    } catch (err: unknown) {
      logger.error(`Error in deleteOne method: ${err}`);
      return left(new AppError.DatabaseError(err, 'Database error'));
    }
  }

  async deleteAll(where = {}, session?: ClientSession): Promise<any> {
    try {
      const result = await this.model.deleteMany(where, { session: session });
      return Promise.resolve(result);
    } catch (err: unknown) {
      logger.error(`Error in deleteAll method: ${err}`);
      return left(new AppError.DatabaseError(err, 'Database error'));
    }
  }
}
