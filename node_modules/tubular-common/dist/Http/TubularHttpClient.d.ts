import { TubularHttpClientAbstract } from './TubularHttpClientAbstract';
import { GridRequest } from '../Models/GridRequest';
import { GridResponse } from '../Models/GridResponse';
export declare class TubularHttpClient implements TubularHttpClientAbstract {
    static resolveRequest(request: string | Request | TubularHttpClientAbstract): string | Request;
    static getRequest(objRequest: string | Request, gridRequest: GridRequest): Request;
    static isValidResponse(data: Record<string, unknown>): boolean;
    static fixResponse(responseObject: GridResponse): void;
    request: string | Request;
    constructor(request: string | Request | TubularHttpClientAbstract);
    fetch(gridRequest: GridRequest): Promise<GridResponse>;
}
