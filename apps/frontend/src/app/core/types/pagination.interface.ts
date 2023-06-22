export interface Pagination<T> {
    count: number;
    page: number;
    pageSize: number;
    data: T;
}