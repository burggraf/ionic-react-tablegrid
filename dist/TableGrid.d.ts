import React from 'react';
import { Sort } from './models/Sort';
import './TableGrid.css';
interface ContainerProps {
    rows: any[];
    rowClick: Function;
    sort?: Sort;
    changeSortCallback?: Function;
    sortableColumns?: (string | null)[];
}
declare const TableGrid: React.FC<ContainerProps>;
export default TableGrid;
