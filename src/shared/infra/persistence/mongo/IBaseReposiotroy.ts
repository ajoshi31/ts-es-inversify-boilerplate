export interface IBaseRepository<T> {
  insert(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
  update(doc: T): Promise<T>;
  findById(id: string): Promise<T>;
  insertMany(entities: T[]): Promise<void>;
  deleteById(id: string): Promise<boolean>;
}
