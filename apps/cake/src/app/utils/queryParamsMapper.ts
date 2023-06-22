import {
  paginationOptions,
  sortDirection,
  sortParams,
} from '@cake/lib-api-interface';

interface Result {
  orderBy?: { [k: string]: sortDirection };
  select?: any;
  take?: number;
  skip?: number;
  where?: { [K: string]: any };
}
export const queryParamsMapper = <T, K>(
  queryParams: T,
  filterParams?: K
): Result => {
  const query = queryParams as any;
  const dataQueryParams: Array<any> = [];
  const filter = {};
  const pagination: paginationOptions = {
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 20,
  };

  const sortParam: sortParams = {
    sort: query.sort ?? 'followers',
    sortDirection: query.sortDirection ?? 'asc',
  };

  Object.keys(filterParams).forEach((param) => {
    if (queryParams['search'])
    dataQueryParams.push({ [param]: { contains: queryParams['search'], mode: 'insensitive' } });
  });

  const result: Result = {
    where: {},
    orderBy: { [sortParam.sort]: sortParam.sortDirection },
    take: Number(pagination.pageSize),
    skip: (Number(pagination.page) - 1) * Number(pagination.pageSize),
  };

  if (query.select) {
    const select = query.select.split(';');
    select.forEach((filterParams: string) => (filter[filterParams] = true));
    result.select = filter;
  }
  if (query.start && query.end) {
    result.where = { createdAt: { gte: query.start, lte: query.end } };
  }

  if (query.search) {
    result.where.OR = dataQueryParams;
  }

  return result;
};
