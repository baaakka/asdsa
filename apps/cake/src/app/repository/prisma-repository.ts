import { getPrismaClient } from './prisma';
import { ApiErrorModel } from '../model/api-error-model';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaClient } from '@prisma/client';
import { IRepository } from './repository-interface';

const client = getPrismaClient();

export class PrismaRepository<T = any> implements IRepository<T> {
  constructor(private model: PrismaModels) {
    if (!(model in client)) {
      throw new Error(`The model ${model} does not exist.`);
    }
  }

  private static getErrorCodes(
    err: PrismaClientKnownRequestError
  ): ApiErrorModel {
    const errors = {
      P2003: {
        code: 'P2003',
        message: `The ${err.meta['field_name']} that you provided does not exist`,
      },
      P2025: {
        code: 'P2025',
        message: 'The item that you provided does not exist',
      },
      P2002: {
        code: 'P2002',
        message: `The ${err.meta['target']} that you provided already exist`,
      },
      P2022: {
        code: 'P2022',
        message: `The ${err.meta['column']} does not exist`,
      },
    };
    console.log(`Prisma error: ${JSON.stringify(err)}`);
    return errors[err.code];
  }

  private getDbOperationError = (err: any) => {
    console.error(err);
    if (err instanceof PrismaClientKnownRequestError) {
      return PrismaRepository.getErrorCodes(err);
    } else {
      return {
        code: 'DB0001',
        message: err.message,
      };
    }
  };

  private execute = async <T, U>(
    op: string,
    input: U
  ): Promise<[T | undefined, ApiErrorModel | undefined]> => {
    console.log('DB Operation Input:', input);
    // console.log('DB Operation Name:', op);

    let data;
    let error: ApiErrorModel = null;
    try {
      data = await client[this.model][op](input);
    } catch (err) {
      console.error(err);
      error = this.getDbOperationError(err);
    }
    return [data, error];
  };

  async create<U>(
    input: U
  ): Promise<[T | undefined, ApiErrorModel | undefined]> {
    return await this.execute<T, U>(PrismaAction.create, input);
  }

  async createMany<U>(
    input: U
  ): Promise<[T[] | undefined, ApiErrorModel | undefined]> {
    return await this.execute<T[], U>(PrismaAction.createMany, input);
  }

  async upsert<U>(
    input: U
  ): Promise<[T | undefined, ApiErrorModel | undefined]> {
    return await this.execute<T, U>(PrismaAction.upsert, input);
  }

  async findFirst<U>(
    input: U
  ): Promise<[T | undefined, ApiErrorModel | undefined]> {
    return await this.execute<T, U>(PrismaAction.findFirst, input);
  }

  async findAll<U>(input?: U): Promise<[T[], ApiErrorModel]> {
    return await this.execute<T[], U>(PrismaAction.findMany, input);
  }

  async updateOne<U>(
    input: U
  ): Promise<[T | undefined, ApiErrorModel | undefined]> {
    return await this.execute<T, U>(PrismaAction.update, input);
  }

  async deleteOne<U>(
    input: U
  ): Promise<[T | undefined, ApiErrorModel | undefined]> {
    return await this.execute<T, U>(PrismaAction.delete, input);
  }

  async count<U>(input: U): Promise<[T[], ApiErrorModel]> {
    client.user.count();
    return await this.execute<T[], U>(PrismaAction.count, input);
  }

  async groupBy<U>(input: U): Promise<[T[], ApiErrorModel]> {
    return await this.execute<T[], U>(PrismaAction.groupBy, input);
  }

  async aggregate<U>(input: U): Promise<[T[], ApiErrorModel]> {
    return await this.execute<T[], U>('aggregate', input);
  }

  async deleteMany<U>(input: U): Promise<[T[], ApiErrorModel]> {
    return await this.execute<T[], U>('deleteMany', input);
  }

  async bulkTransactions<U>(
    input: U[],
    action: PrismaAction
  ): Promise<[any[], ApiErrorModel]> {
    let data;
    let error: ApiErrorModel = null;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data = await client.$transaction(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        input.map((item: U) => client[this.model][action](item))
      );
      console.log('Bulk Transaction done:', data);
    } catch (err) {
      error = this.getDbOperationError(err);
      console.log('Bulk Transaction failed:', err);
    }
    return [data, error];
  }
}

export enum PrismaAction {
  groupBy = 'groupBy',
  count = 'count',
  delete = 'delete',
  update = 'update',
  findMany = 'findMany',
  findFirst = 'findFirst',
  upsert = 'upsert',
  createMany = 'createMany',
  create = 'create',
  deleteMany = 'deleteMany',
}

export type PrismaModels = keyof Omit<
  PrismaClient,
  | 'fetcher'
  | 'dmmf'
  | 'connectionPromise'
  | 'disconnectionPromise'
  | 'engineConfig'
  | 'measurePerformance'
  | '$on'
  | '$connect'
  | '$disconnect'
  | '$use'
  | '$executeRaw'
  | '$executeRawUnsafe'
  | '$queryRaw'
  | '$queryRawUnsafe'
  | '$transaction'
>;
