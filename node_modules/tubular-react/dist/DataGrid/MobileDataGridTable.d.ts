import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { TbRowProps } from '../BareBones/TbRow';
export interface MobileDataGridTableProps {
    tbTableInstance: ITbTableInstance;
    rowComponent?: React.FunctionComponent<TbRowProps>;
    onRowClick?(row: any): void;
}
export declare const MobileDataGridTable: React.FunctionComponent<MobileDataGridTableProps>;
