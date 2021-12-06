import React from 'react';
import { Sort } from './models/Sort';
import './TableGrid.css';
interface ContainerProps {
    rows: any[];
    headers?: any[];
    rowClick?: Function;
    sort?: Sort;
    changeSortCallback?: Function;
    sortableColumns?: (string | null)[];
    headerStyle?: object;
    rowStyle?: object;
}
export declare const TableGrid: React.FC<ContainerProps>;
export {};
