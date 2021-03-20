import { ColumnModel } from './Models';
export declare const parsePayload: (row: Record<string, unknown>, columns: ColumnModel[]) => Record<string, unknown>;
export declare const getColumnAlign: (column: ColumnModel) => 'inherit' | 'left' | 'center' | 'right' | 'justify';
export declare const getCsv: (gridResult: [], columns: ColumnModel[]) => string;
export declare const getHtml: (gridResult: [], columns: ColumnModel[]) => string;
export declare const getPages: (currentPage: number, totalRows: number, rowsPerPage: number) => any[];
