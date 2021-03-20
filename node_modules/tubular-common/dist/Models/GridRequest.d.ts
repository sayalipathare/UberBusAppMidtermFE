import { ColumnModel } from './ColumnModel';
export declare class GridRequest {
    protected static counter: number;
    columns: ColumnModel[];
    counter: number;
    searchText: string;
    skip: number;
    take: number;
    timezoneOffset: number;
    constructor(columns: ColumnModel[], itemsPerPage: number, page: number, searchText?: string);
}
