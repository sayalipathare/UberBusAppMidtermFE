import * as React from 'react';
import { ColumnModel } from 'tubular-common';
export interface TbMobileRowProps {
    columns: ColumnModel[];
    onRowClick(row: any): void;
    row: any;
}
export declare const TbMobileRow: React.FunctionComponent<TbMobileRowProps>;
