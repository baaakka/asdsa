import { ApiErrorModel } from "../model/api-error-model";

export interface IRepository<T = any> {
  create<U>(input: U): Promise<[T | undefined, ApiErrorModel | undefined]>;

  createMany<U>(input: U): Promise<[T[] | undefined, ApiErrorModel | undefined]>;

  upsert<U>(input: U): Promise<[T | undefined, ApiErrorModel | undefined]>;

  findFirst<U>(input: U): Promise<[T | undefined, ApiErrorModel | undefined]>;

  findAll<U>(input?: U): Promise<[T[], ApiErrorModel]>;

  updateOne<U>(input: U): Promise<[T | undefined, ApiErrorModel | undefined]>;

  deleteOne<U>(input: U): Promise<[T | undefined, ApiErrorModel | undefined]>;

  count<U>(input: U): Promise<[T[], ApiErrorModel]>;

  groupBy<U>(input: U): Promise<[T[], ApiErrorModel]>;

  aggregate<U>(input: U): Promise<[T[], ApiErrorModel]>;

  deleteMany<U>(input: U): Promise<[T[], ApiErrorModel]>;
}
