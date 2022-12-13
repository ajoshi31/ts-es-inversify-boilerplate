export interface IBaseRepository<EntityType> {
  create(entity: EntityType): Promise<void>;
}
