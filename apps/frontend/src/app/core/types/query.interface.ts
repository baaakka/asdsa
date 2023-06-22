export interface Query {
    page?: number;
    pageSize?: number;
    select?: string;
    sort?: string;
    search?: string;
    where?: string;
    isConfectionary?: boolean;
    owner?: boolean;
}