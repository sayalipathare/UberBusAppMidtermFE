import { GridRequest, GridResponse } from './Models';
export declare class Transformer {
    static getResponse(request: GridRequest, dataSource: any[]): GridResponse;
    private static applyFreeTextSearch;
    private static applyFiltering;
    private static applySorting;
    private static getAggregatePayload;
}
