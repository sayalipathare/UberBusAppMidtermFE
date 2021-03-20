import dayjs = require('dayjs');
import { ColumnModel } from './Models';
export declare const areDatesEqual: (column: ColumnModel, date1: string, date2: string) => boolean;
export declare const isDateAfter: (column: ColumnModel, date1: string, date2: string, inclusive?: boolean) => boolean;
export declare const isDateBefore: (column: ColumnModel, date1: string, date2: string, inclusive?: boolean) => boolean;
export declare const dateIsBetween: (column: ColumnModel, from: string, to: string, value: string) => boolean;
export default dayjs;
