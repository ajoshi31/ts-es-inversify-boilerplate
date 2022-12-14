export interface IBaseRepository<EntityType> {
  create(entity: EntityType): Promise<void>;
  update(_id: string, model: EntityType): Promise<void>;
  delete(_id: string): Promise<{ n: number }>;
}
