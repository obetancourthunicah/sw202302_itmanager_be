export abstract class DaoBase<T> {
  public abstract create(item: T): Promise<T>;
  public abstract update(id: string, item: Partial<T>): Promise<T>;
  public abstract delete(id: string): Promise<boolean>;
  public abstract find(item: Partial<T>): Promise<T[]>;
  public abstract findOne(id: string): Promise<T>;
}
